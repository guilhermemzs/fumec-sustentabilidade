import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schools, engagements, metrics } from '../src/db/schema';
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
      })
      .onConflictDoNothing();
  }
  const existing = await db.select().from(metrics);
  if (!existing.some((m) => m.metric === 'contacted_estimate'))
    await db
      .insert(metrics)
      .values({
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
