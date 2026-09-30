import { config } from 'dotenv';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, sql } from 'drizzle-orm';
import { submissions, activities, feedback, schools } from '../src/db/schema';
config({ path: '.env.local', quiet: true });
async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!));
  const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const origin = new URL(base).origin;
  const email = 'qa-' + randomUUID() + '@example.org';
  let activityId: string | undefined;
  try {
    const [count] = await db.select({ count: sql<number>`count(*)::int` }).from(schools);
    assert.equal(count.count, 39);
    const response = await fetch(base + '/api/contact', {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'QA descartável',
        organization: 'Teste automatizado descartável',
        email,
        message: 'Mensagem sintética para verificar persistência. Remover ao concluir o teste.',
        consent: true,
        website: '',
      }),
    });
    assert.equal(response.status, 201);
    const messages = await db.select().from(submissions).where(eq(submissions.email, email));
    assert.equal(messages.length, 1);
    console.log('Contato válido persistido e encontrado no banco.');
    const access = await readFile('admin-access.txt', 'utf8');
    const password = access.match(/^Senha: (.+)$/m)?.[1];
    assert.ok(password);
    const login = await fetch(base + '/api/admin/login', {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie')?.split(';')[0];
    assert.ok(cookie);
    const admin = await fetch(base + '/admin', { headers: { Cookie: cookie! } });
    assert.equal(admin.status, 200);
    assert.ok((await admin.text()).includes('Mensagens recebidas'));
    console.log('Autenticação, sessão e painel administrativo verificados.');
    const first = await db.select().from(schools).limit(1);
    const [activity] = await db
      .insert(activities)
      .values({
        schoolId: first[0].id,
        title: 'QA descartável - teste de integração',
        description: 'Dado sintético temporário; não é uma atividade do projeto.',
        status: 'completed',
        completedAt: new Date(),
        studentsReached: 1,
        classesReached: 1,
      })
      .returning();
    activityId = activity.id;
    await assert.rejects(() =>
      db
        .insert(activities)
        .values({
          schoolId: first[0].id,
          title: 'QA inválido',
          status: 'completed',
          completedAt: new Date(),
          studentsReached: -1,
        }),
    );
    const feedbackResponse = await fetch(base + '/api/feedback', {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activityId,
        rating: 5,
        response: 'Resposta sintética descartável.',
        website: '',
      }),
    });
    assert.equal(feedbackResponse.status, 201);
    assert.equal(
      (await db.select().from(feedback).where(eq(feedback.activityId, activityId))).length,
      1,
    );
    console.log('Feedback anônimo e restrições de alcance verificados.');
  } finally {
    await db.delete(submissions).where(eq(submissions.email, email));
    if (activityId) {
      await db.delete(feedback).where(eq(feedback.activityId, activityId));
      await db.delete(activities).where(eq(activities.id, activityId));
    }
    console.log('Registros sintéticos removidos.');
  }
}
main().catch((e) => {
  console.error('Teste de integração falhou: ' + e.message);
  process.exitCode = 1;
});
