import { config } from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { schools, teamMembers } from '../src/db/schema';
import { portraits } from '../src/lib/team';

config({ path: '.env.local', quiet: true });
async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Banco não configurado.');
  const db = drizzle(neon(process.env.DATABASE_URL));
  const [members, locations] = await Promise.all([
    db.select().from(teamMembers),
    db
      .select({ latitude: schools.latitude, longitude: schools.longitude })
      .from(schools)
      .where(eq(schools.publicVisibility, true)),
  ]);
  console.log(
    `Mapa: ${locations.length} escolas públicas; ${locations.filter((s) => s.latitude !== null && s.longitude !== null).length} com coordenadas.`,
  );
  const updates = [
    { name: 'Frederico Maders', aliases: ['Frederico Mader', 'Frederico Maders'] },
    { name: 'Caio Augusto', aliases: ['Caio Augusto'] },
  ].map((target) => {
    const matches = members.filter((m) => target.aliases.includes(m.name));
    if (matches.length !== 1) throw new Error(`Cadastro de ${target.name} precisa de revisão.`);
    return { member: matches[0], name: target.name, photoUrl: portraits[target.name].src };
  });
  if (!process.argv.includes('--apply')) {
    console.log(
      'Prévia: atualização do nome de Frederico Maders e das duas fotos; sem novos integrantes.',
    );
    return;
  }
  const changes = updates.filter(
    (u) => u.member.name !== u.name || u.member.photoUrl !== u.photoUrl,
  );
  if (!changes.length) {
    console.log('Fotos e nomes já atualizados.');
    return;
  }
  await mkdir('../../work/backups', { recursive: true });
  await writeFile(
    `../../work/backups/team-photos-before-${Date.now()}.json`,
    JSON.stringify(
      changes.map((u) => u.member),
      null,
      2,
    ),
  );
  const statements = changes.map((u) =>
    db
      .update(teamMembers)
      .set({ name: u.name, photoUrl: u.photoUrl })
      .where(eq(teamMembers.id, u.member.id)),
  );
  await db.batch([statements[0], ...statements.slice(1)]);
  const after = await db.select().from(teamMembers);
  if (
    after.length !== members.length ||
    updates.some(
      (u) =>
        !after.some((m) => m.id === u.member.id && m.name === u.name && m.photoUrl === u.photoUrl),
    )
  )
    throw new Error('Verificação da atualização falhou.');
  console.log('Atualização verificada: dois retratos; quantidade de integrantes preservada.');
}
main().catch(() => {
  console.error('Atualização não concluída. Verifique conexão e cadastros.');
  process.exitCode = 1;
});
