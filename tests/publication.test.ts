import test from 'node:test';
import assert from 'node:assert/strict';
import { publicSchools, publicResults } from '../src/lib/publication';
import { initialSchools } from '../src/lib/survey';

test('publicação omite notas internas e perspectivas sem alterar a fonte', () => {
  const source = structuredClone(initialSchools);
  const hidden = { ...source[0], id: 'hidden', publicVisibility: false };
  const published = publicSchools([...source, hidden]);
  assert.equal(published.length, 62);
  assert.equal(published.filter((s) => s.status === 'respondeu').length, 37);
  assert.equal(published.filter((s) => s.status === 'em_alinhamento').length, 3);
  assert.ok(published.every((s) => s.summary === '' && !s.priority));
  assert.ok(published.every((s) => s.latitude === null && s.longitude === null));
  assert.deepEqual(source, initialSchools);
  const missing = publicSchools([{ ...source[0], city: null, address: null, postalCode: null }])[0];
  assert.equal(missing.city, null);
  assert.equal(missing.address, null);
  assert.equal(missing.postalCode, null);
});

test('resultados sem execução ou alcance registrado são omitidos, zero informado é preservado', () => {
  const base = {
    id: '1',
    status: 'planned',
    completedAt: null,
    studentsReached: null,
    classesReached: null,
  };
  const completed = { ...base, status: 'completed', completedAt: new Date('2026-09-30') };
  assert.deepEqual(publicResults([base, { ...base, status: 'completed' }]), {
    activities: [],
    completed: null,
    students: null,
    classes: null,
  });
  const known = { ...completed, id: '2', studentsReached: 0, classesReached: 1 };
  assert.equal(publicResults([base, known]).students, 0);
  assert.equal(publicResults([known]).classes, 1);
  assert.equal(publicResults([known, completed]).students, null);
  assert.equal(publicResults([known, completed]).completed, 2);
});
