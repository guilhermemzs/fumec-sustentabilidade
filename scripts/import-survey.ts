import { config } from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import { schools, engagements, teamMembers } from '../src/db/schema';
import { referenceDate } from '../src/lib/project';
import { initialSchools } from '../src/lib/survey';
import { documentedMembers } from '../src/lib/team';
config({ path: '.env.local', quiet: true });
async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Banco não configurado.');
  const db = drizzle(neon(process.env.DATABASE_URL));
  const [existing, states, members] = await Promise.all([
    db.select().from(schools),
    db.select().from(engagements),
    db.select().from(teamMembers),
  ]);
  const absent = existing.filter((s) => !initialSchools.some((r) => r.id === s.id));
  if (absent.length)
    throw new Error(
      'Há instituições fora do levantamento. Revise o cadastro antes de importar. Nenhum registro foi alterado.',
    );
  const pending = initialSchools.filter(
    (s) =>
      !existing.some((e) => e.id === s.id && e.snapshotDate && e.snapshotDate >= referenceDate),
  );
  const newMembers = documentedMembers.filter((m) => !members.some((e) => e.name === m.name));
  console.log(
    `Levantamento: ${initialSchools.length} instituições; ${pending.length} atualizações; ${newMembers.length} integrantes a publicar.`,
  );
  if (!process.argv.includes('--apply')) {
    console.log('Prévia concluída. Use --apply para importar.');
    return;
  }
  if (!pending.length && !newMembers.length) {
    console.log('Levantamento já aplicado; nenhuma alteração.');
    return;
  }
  await mkdir('../../work/backups', { recursive: true });
  await writeFile(
    `../../work/backups/survey-before-${Date.now()}.json`,
    JSON.stringify({ schools: existing, engagements: states, members }, null, 2),
  );
  const updates: Array<Parameters<typeof db.batch>[0][number]> = pending.length
    ? [
        db
          .insert(schools)
          .values(
            pending.map((s) => ({
              id: s.id,
              name: s.name,
              city: s.city,
              address: s.address,
              neighborhood: s.neighborhood,
              state: s.state,
              postalCode: s.postalCode,
              educationType: s.educationType,
              snapshotDate: s.snapshotDate,
              publicVisibility: s.publicVisibility,
            })),
          )
          .onConflictDoUpdate({
            target: schools.id,
            set: {
              name: sql`excluded.name`,
              city: sql`excluded.city`,
              address: sql`excluded.address`,
              neighborhood: sql`excluded.neighborhood`,
              state: sql`excluded.state`,
              postalCode: sql`excluded.postal_code`,
              educationType: sql`excluded.education_type`,
              snapshotDate: sql`excluded.snapshot_date`,
              updatedAt: new Date(),
            },
          }),
        db
          .insert(engagements)
          .values(
            pending.map((s) => ({
              schoolId: s.id,
              status: s.status,
              summary: s.summary,
              priority: s.priority,
              meetingAt:
                s.status === 'reuniao_realizada' ? new Date('2026-09-30T12:40:00-03:00') : null,
            })),
          )
          .onConflictDoUpdate({
            target: engagements.schoolId,
            set: {
              status: sql`excluded.status`,
              summary: sql`excluded.summary`,
              priority: sql`excluded.priority`,
              meetingAt: sql`COALESCE(excluded.meeting_at, school_engagements.meeting_at)`,
              updatedAt: new Date(),
            },
          }),
      ]
    : [];
  if (newMembers.length)
    updates.push(
      db.insert(teamMembers).values(
        newMembers.map(({ name, course, photoUrl, role, published }) => ({
          name,
          course,
          photoUrl,
          role,
          published,
        })),
      ),
    );
  if (updates.length) await db.batch([updates[0], ...updates.slice(1)]);
  const rows = await db
    .select()
    .from(schools)
    .innerJoin(engagements, sql`${schools.id} = ${engagements.schoolId}`);
  if (
    rows.length !== 62 ||
    rows.filter((r) => r.school_engagements.status === 'reuniao_realizada').length !== 1
  )
    throw new Error('Verificação da importação falhou.');
  console.log(
    'Importação verificada: 62 escolas, 1 reunião realizada. Coordenadas e outros registros preservados.',
  );
}
main().catch((e: Error) => {
  console.error(e.message.replace(/postgres(?:ql)?:\/\/\S+/g, '[conexão omitida]'));
  process.exitCode = 1;
});
