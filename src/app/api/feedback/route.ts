import { NextResponse } from 'next/server';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { activities, feedback, schools } from '@/db/schema';
import { sameOrigin, consumeRateLimit, clientIp } from '@/lib/security';
const schema = z.object({
  activityId: z.uuid(),
  rating: z.number().int().min(1).max(5),
  response: z.string().trim().max(1000),
  website: z.string().max(0),
});
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ message: 'Origem inválida.' }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: 'Avaliação indisponível.' }, { status: 503 });
  try {
    const raw = await request.text();
    if (raw.length > 4000)
      return NextResponse.json({ message: 'Resposta muito longa.' }, { status: 413 });
    const p = schema.safeParse(JSON.parse(raw));
    if (!p.success) return NextResponse.json({ message: 'Revise a avaliação.' }, { status: 400 });
    const rows = await db
      .select({ id: activities.id })
      .from(activities)
      .innerJoin(schools, eq(activities.schoolId, schools.id))
      .where(
        and(
          eq(activities.id, p.data.activityId),
          eq(activities.status, 'completed'),
          eq(schools.publicVisibility, true),
        ),
      );
    if (!rows.length)
      return NextResponse.json(
        { message: 'Esta atividade não está disponível para avaliação.' },
        { status: 404 },
      );
    if (!(await consumeRateLimit(clientIp(request), 'feedback', 50)))
      return NextResponse.json({ message: 'Limite temporário atingido.' }, { status: 429 });
    await db.insert(feedback).values({
      activityId: p.data.activityId,
      rating: p.data.rating,
      response: p.data.response,
      anonymous: true,
    });
    return NextResponse.json(
      { message: 'Obrigado. Sua avaliação anônima foi recebida.' },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: 'Não foi possível confirmar o envio.' }, { status: 503 });
  }
}
