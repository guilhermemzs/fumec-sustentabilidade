import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { submissions } from '@/db/schema';
import { contactSchema } from '@/lib/validation';
import { sameOrigin, consumeRateLimit, clientIp } from '@/lib/security';
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ message: 'Origem da requisição inválida.' }, { status: 403 });
  const db = getDb();
  if (!db)
    return NextResponse.json(
      { message: 'O recebimento está temporariamente indisponível. Tente mais tarde.' },
      { status: 503 },
    );
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 10000)
      return NextResponse.json({ message: 'Mensagem muito longa.' }, { status: 413 });
    let input: unknown;
    try {
      input = JSON.parse(raw);
    } catch {
      return NextResponse.json({ message: 'Formato inválido.' }, { status: 400 });
    }
    const parsed = contactSchema.safeParse(input);
    if (!parsed.success)
      return NextResponse.json(
        { message: 'Revise os campos e a autorização de contato.' },
        { status: 400 },
      );
    if (!(await consumeRateLimit(clientIp(request), 'contact', 5)))
      return NextResponse.json(
        { message: 'Limite de mensagens atingido. Tente novamente em uma hora.' },
        { status: 429 },
      );
    await db
      .insert(submissions)
      .values({
        name: parsed.data.name,
        organization: parsed.data.organization,
        email: parsed.data.email.toLowerCase(),
        message: parsed.data.message,
      });
    return NextResponse.json(
      { message: 'Mensagem recebida. O grupo poderá responder pelo e-mail informado.' },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        message:
          'Não foi possível enviar agora. Sua mensagem não foi confirmada; tente novamente mais tarde.',
      },
      { status: 503 },
    );
  }
}
