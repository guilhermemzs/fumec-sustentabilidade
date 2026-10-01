import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schools, engagements, metrics, teamMembers } from '../src/db/schema';
import { documentedMembers } from '../src/lib/team';
import { initialSchools, referenceDate } from '../src/lib/project';
config({ path: '.env.local', quiet: true });
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Banco não configurado.');
  const db = drizzle(neon(url));
  for (const school of initialSchools) {
    await db
      .insert(schools)
      .values({
        id: school.id,
        name: school.name,
        city: school.city,
        address: school.address,
        neighborhood: school.neighborhood,
        educationType: school.educationType,
        state: school.state,
        postalCode: school.postalCode,
        snapshotDate: school.snapshotDate,
        publicVisibility: school.publicVisibility,
      })
      .onConflictDoNothing();
    await db
      .insert(engagements)
      .values({
        schoolId: school.id,
        status: school.status,
        summary: school.summary,
        priority: school.priority,
        meetingAt:
          school.status === 'reuniao_realizada' ? new Date('2026-09-30T12:40:00-03:00') : null,
      })
      .onConflictDoNothing();
  }
  const members = await db.select().from(teamMembers);
  for (const member of documentedMembers) {
    if (!members.some((m) => m.name === member.name)) {
      const { name, course, role, photoUrl, published } = member;
      await db.insert(teamMembers).values({ name, course, role, photoUrl, published });
    }
  }
  const existing = await db.select().from(metrics);
  if (!existing.some((m) => m.metric === 'contacted_estimate'))
    await db.insert(metrics).values({
      metric: 'contacted_estimate',
      value: 200,
      referenceDate,
      source: 'Contexto fornecido pelo grupo; estimativa, sem deduplicação completa.',
      verified: false,
    });
  console.log('Seed institucional aplicado; nenhum contato pessoal foi importado.');
}
main().catch(() => {
  console.error('Seed não aplicado. Verifique a conexão e execute as migrations primeiro.');
  process.exitCode = 1;
});
