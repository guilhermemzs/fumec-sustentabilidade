'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { getDb } from '@/db';
import {
  schools,
  engagements,
  activities,
  materials,
  submissions,
  teamMembers,
  contactEvents,
} from '@/db/schema';
import { requireAdmin } from '@/lib/security';
import { schoolUpdateSchema, activitySchema, materialSchema } from '@/lib/validation';
import { institutionKey, statuses } from '@/lib/project';
import { z } from 'zod';
function optionalNumber(f: FormData, key: string) {
  const v = String(f.get(key) || '');
  return v === '' ? null : Number(v);
}
function invalidate() {
  for (const path of ['/', '/escolas', '/impacto', '/materiais', '/equipe', '/admin'])
    revalidatePath(path);
}
function finish(ok: boolean): never {
  invalidate();
  redirect('/admin?result=' + (ok ? 'saved' : 'error'));
}
export async function logout() {
  await requireAdmin();
  (await cookies()).delete('entre_session');
  redirect('/admin/login');
}
export async function updateSchool(f: FormData) {
  await requireAdmin();
  const db = getDb();
  if (!db) finish(false);
  const parsed = schoolUpdateSchema.safeParse({
    id: f.get('id'),
    status: f.get('status'),
    summary: f.get('summary'),
    publicVisibility: f.get('publicVisibility') === 'on',
    latitude: optionalNumber(f, 'latitude'),
    longitude: optionalNumber(f, 'longitude'),
  });
  if (!parsed.success) finish(false);
  const v = parsed.data;
  let ok = false;
  try {
    await db!.batch([
      db!
        .update(schools)
        .set({
          publicVisibility: v.publicVisibility,
          latitude: v.latitude,
          longitude: v.longitude,
          updatedAt: new Date(),
        })
        .where(eq(schools.id, v.id)),
      db!
        .update(engagements)
        .set({ status: v.status, summary: v.summary, updatedAt: new Date() })
        .where(eq(engagements.schoolId, v.id)),
    ]);
    ok = true;
  } catch {}
  finish(ok);
}
export async function addSchool(f: FormData) {
  await requireAdmin();
  const db = getDb();
  const parsed = z
    .object({
      name: z.string().trim().min(5).max(180),
      city: z.string().trim().max(100),
      status: z.enum(statuses),
    })
    .safeParse({ name: f.get('name'), city: f.get('city'), status: f.get('status') });
  if (!db || !parsed.success) finish(false);
  const id = institutionKey(parsed.data.name);
  let ok = false;
  try {
    await db!.batch([
      db!
        .insert(schools)
        .values({
          id,
          name: parsed.data.name,
          city: parsed.data.city || null,
          publicVisibility: false,
        }),
      db!.insert(engagements).values({ schoolId: id, status: parsed.data.status }),
    ]);
    ok = true;
  } catch {}
  finish(ok);
}
export async function saveActivity(f: FormData) {
  await requireAdmin();
  const db = getDb();
  const parsed = activitySchema.safeParse({
    schoolId: f.get('schoolId'),
    title: f.get('title'),
    description: f.get('description'),
    status: f.get('status'),
    scheduledAt: String(f.get('scheduledAt') || '') || null,
    completedAt: String(f.get('completedAt') || '') || null,
    studentsReached: optionalNumber(f, 'studentsReached'),
    classesReached: optionalNumber(f, 'classesReached'),
  });
  if (!db || !parsed.success) finish(false);
  const v = parsed.data;
  let ok = false;
  try {
    const values = {
      ...v,
      scheduledAt: v.scheduledAt ? new Date(v.scheduledAt + 'T12:00:00-03:00') : null,
      completedAt: v.completedAt ? new Date(v.completedAt + 'T12:00:00-03:00') : null,
    };
    if (f.get('id'))
      await db!
        .update(activities)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(activities.id, String(f.get('id'))));
    else await db!.insert(activities).values(values);
    ok = true;
  } catch {}
  finish(ok);
}
export async function addMaterial(f: FormData) {
  await requireAdmin();
  const db = getDb();
  const parsed = materialSchema.safeParse({
    title: f.get('title'),
    description: f.get('description'),
    type: f.get('type'),
    fileUrl: f.get('fileUrl'),
    published: f.get('published') === 'on',
  });
  if (!db || !parsed.success) finish(false);
  let ok = false;
  try {
    await db!.insert(materials).values(parsed.data);
    ok = true;
  } catch {}
  finish(ok);
}
export async function addMember(f: FormData) {
  await requireAdmin();
  const db = getDb();
  const parsed = z
    .object({ name: z.string().trim().min(3).max(100), role: z.string().trim().max(120) })
    .safeParse({ name: f.get('name'), role: f.get('role') });
  if (!db || !parsed.success) finish(false);
  let ok = false;
  try {
    await db!
      .insert(teamMembers)
      .values({ ...parsed.data, published: f.get('published') === 'on' });
    ok = true;
  } catch {}
  finish(ok);
}
export async function registerContact(f: FormData) {
  await requireAdmin();
  const db = getDb();
  const parsed = z
    .object({
      schoolId: z.string().min(1),
      channel: z.enum(['email', 'reuniao', 'telefone', 'outro']),
      kind: z.enum(['enviado', 'resposta', 'reuniao']),
      date: z.iso.date(),
    })
    .safeParse({
      schoolId: f.get('schoolId'),
      channel: f.get('channel'),
      kind: f.get('kind'),
      date: f.get('date'),
    });
  if (!db || !parsed.success) finish(false);
  let ok = false;
  try {
    await db!
      .insert(contactEvents)
      .values({
        schoolId: parsed.data.schoolId,
        channel: parsed.data.channel,
        kind: parsed.data.kind,
        occurredAt: new Date(parsed.data.date + 'T12:00:00-03:00'),
      });
    ok = true;
  } catch {}
  finish(ok);
}
export async function clearExpiredLimits() {
  await requireAdmin();
  const db = getDb();
  if (db) await db.execute(sql`DELETE FROM rate_limits WHERE expires_at < now()`);
  finish(Boolean(db));
}
export async function removeSubmission(f: FormData) {
  await requireAdmin();
  const id = z.uuid().safeParse(f.get('id'));
  const db = getDb();
  if (!id.success || !db) finish(false);
  await db!.delete(submissions).where(eq(submissions.id, id.data));
  finish(true);
}
