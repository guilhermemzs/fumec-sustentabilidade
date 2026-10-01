import test from 'node:test';
import assert from 'node:assert/strict';
import { initialSchools, institutionKey, summarizeSchools } from '../src/lib/project';
import { activitySchema, contactSchema, schoolUpdateSchema } from '../src/lib/validation';
test('cadastro institucional é único e não converte interesse em parceria', () => {
  assert.equal(new Set(initialSchools.map((s) => s.id)).size, initialSchools.length);
  const stats = summarizeSchools(initialSchools);
  assert.equal(stats.alignment, 3);
  assert.equal(stats.participants, 0);
  assert.equal(stats.registered, 62);
  assert.equal(stats.meetings, 1);
  assert.equal(stats.replies, 62);
  assert.equal(initialSchools.filter((s) => s.status === 'interessada').length, 18);
  assert.equal(initialSchools.filter((s) => s.status === 'possibilidade_futura').length, 32);
  assert.equal(initialSchools.filter((s) => s.status === 'respondeu').length, 5);
  assert.equal(initialSchools.filter((s) => s.status === 'indisponivel').length, 3);
  assert.equal(initialSchools.filter((s) => s.latitude !== null).length, 0);
});
test('chave institucional normaliza acentos e espaços', () => {
  assert.equal(institutionKey('  Escola Árvore  '), 'escola-arvore');
});
test('formulário exige consentimento, valida e-mail e impede honeypot preenchido', () => {
  const input = {
    name: 'Pessoa de teste',
    organization: 'Escola de teste',
    email: 'teste@example.org',
    message: 'Mensagem sintética para testar validação.',
    consent: true,
    website: '',
  };
  assert.equal(contactSchema.safeParse(input).success, true);
  for (const change of [
    { email: 'invalido' },
    { consent: false },
    { website: 'spam' },
    { message: 'curta' },
  ])
    assert.equal(contactSchema.safeParse({ ...input, ...change }).success, false);
});
test('atividade realizada exige data e alcance não aceita negativos', () => {
  const activity = {
    schoolId: initialSchools[0].id,
    title: 'Atividade de teste',
    description: '',
    status: 'completed',
    scheduledAt: null,
    completedAt: null,
    studentsReached: null,
    classesReached: null,
  };
  assert.equal(activitySchema.safeParse(activity).success, false);
  assert.equal(activitySchema.safeParse({ ...activity, completedAt: '2026-09-30' }).success, true);
  assert.equal(
    activitySchema.safeParse({ ...activity, completedAt: '2026-09-30', studentsReached: -1 })
      .success,
    false,
  );
  assert.equal(activitySchema.safeParse({ ...activity, status: 'planned' }).success, true);
});
test('coordenadas devem ser um par dentro dos limites geográficos', () => {
  const input = {
    id: 'escola',
    status: 'em_alinhamento',
    summary: '',
    publicVisibility: true,
    latitude: null,
    longitude: null,
  };
  assert.equal(schoolUpdateSchema.safeParse(input).success, true);
  assert.equal(schoolUpdateSchema.safeParse({ ...input, latitude: 20 }).success, false);
  assert.equal(
    schoolUpdateSchema.safeParse({ ...input, latitude: 120, longitude: -43 }).success,
    false,
  );
});
