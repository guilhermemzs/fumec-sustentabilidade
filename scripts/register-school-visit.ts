import { config } from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq, ilike, isNull, or } from 'drizzle-orm';
import { schools, engagements, activities } from '../src/db/schema';
import { schoolVisit, visitSchool } from '../src/lib/school-visit';

config({ path: '.env.local', quiet: true });

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Banco não configurado.');
  const db = drizzle(neon(process.env.DATABASE_URL));
  const matches = await db
    .select()
    .from(schools)
    .where(
      or(
        eq(schools.id, visitSchool.id),
        ilike(schools.name, '%Florie%'),
        ilike(schools.name, '%Wanderley%'),
      ),
    );
  if (matches.some((s) => s.id !== visitSchool.id)) {
    throw new Error('Revisar identidade da escola antes de cadastrar.');
  }
  const [beforeEngagements, beforeActivities] = await Promise.all([
    db.select().from(engagements).where(eq(engagements.schoolId, visitSchool.id)),
    db.select().from(activities).where(eq(activities.schoolId, visitSchool.id)),
  ]);
  const activityId = '771ffdd5-b329-4c60-bf4d-3d17035d6078';
  if (beforeActivities.some((a) => a.id !== activityId)) {
    throw new Error('Revisar atividades já cadastradas para evitar duplicação.');
  }
  const existingActivity = beforeActivities[0];
  const scheduledAt = new Date(schoolVisit.startsAt);
  const description = `${schoolVisit.description} ${schoolVisit.dateLabel}, ${schoolVisit.timeLabel.toLowerCase()} (horário de Brasília).`;
  if (
    existingActivity &&
    (existingActivity.status !== 'confirmed' || existingActivity.completedAt)
  ) {
    throw new Error('Revisar o estado da atividade antes de reagendar.');
  }
  console.log(
    JSON.stringify({
      school: visitSchool.name,
      status: 'confirmed',
      startsAt: schoolVisit.startsAt,
      previousStartsAt: existingActivity?.scheduledAt ?? null,
      existingSchools: matches.length,
      existingActivities: beforeActivities.length,
    }),
  );
  if (!process.argv.includes('--apply')) return;
  await mkdir('../../work/backups', { recursive: true });
  await writeFile(
    `../../work/backups/school-visit-before-${Date.now()}.json`,
    JSON.stringify(
      {
        schools: matches,
        engagements: beforeEngagements,
        activities: beforeActivities,
      },
      null,
      2,
    ),
  );
  const { status, summary, priority, ...school } = visitSchool;
  await db.batch([
    db.insert(schools).values(school).onConflictDoNothing(),
    db
      .insert(engagements)
      .values({
        schoolId: school.id,
        status,
        summary,
        priority,
        confirmedAt: new Date(),
      })
      .onConflictDoNothing(),
    db
      .insert(activities)
      .values({
        id: activityId,
        schoolId: school.id,
        title: schoolVisit.title,
        description,
        scheduledAt,
        status: 'confirmed',
        completedAt: null,
        studentsReached: null,
        classesReached: null,
      })
      .onConflictDoUpdate({
        target: activities.id,
        set: { scheduledAt, description },
        setWhere: and(
          eq(activities.schoolId, school.id),
          eq(activities.status, 'confirmed'),
          isNull(activities.completedAt),
          existingActivity?.scheduledAt
            ? eq(activities.scheduledAt, existingActivity.scheduledAt)
            : isNull(activities.scheduledAt),
        ),
      }),
  ]);
  const [afterSchools, afterEngagements, afterActivities] = await Promise.all([
    db.select().from(schools).where(eq(schools.id, school.id)),
    db.select().from(engagements).where(eq(engagements.schoolId, school.id)),
    db.select().from(activities).where(eq(activities.schoolId, school.id)),
  ]);
  const activity = afterActivities[0];
  if (
    afterSchools.length !== 1 ||
    afterEngagements[0]?.status !== 'atividade_confirmada' ||
    afterActivities.length !== 1 ||
    activity.status !== 'confirmed' ||
    activity.scheduledAt?.getTime() !== scheduledAt.getTime() ||
    activity.description !== description ||
    activity.completedAt !== null ||
    activity.studentsReached !== null ||
    activity.classesReached !== null
  ) {
    throw new Error(
      'Cadastro requer revisão; nenhum resultado foi marcado como realizado pelo script.',
    );
  }
  console.log(
    'Verificado: uma escola e uma atividade confirmada, sem alcance de estudantes ou turmas.',
  );
}
main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Falha ao cadastrar encontro.');
  process.exitCode = 1;
});
