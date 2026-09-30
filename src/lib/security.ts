import 'server-only';
import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from 'drizzle-orm';
import { getDb } from '@/db';
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const allowed = new Set([new URL(request.url).origin]);
  if (process.env.NEXT_PUBLIC_SITE_URL)
    allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
  return origin !== null && allowed.has(origin);
}
export function adminConfigured() {
  return Boolean(
    process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET && process.env.DATABASE_URL,
  );
}
export function verifyPassword(password: string) {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored || password.length > 256) return false;
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  try {
    const expected = Buffer.from(hash, 'hex');
    const actual = scryptSync(password, salt, 64);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
function signingKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('Sessão não configurada');
  return new TextEncoder().encode(secret);
}
export async function createSession() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .setAudience('entre-admin')
    .setIssuer('entre')
    .sign(signingKey());
}
export async function isAdmin() {
  const token = (await cookies()).get('entre_session')?.value;
  if (!token || !adminConfigured()) return false;
  try {
    const { payload } = await jwtVerify(token, signingKey(), {
      algorithms: ['HS256'],
      audience: 'entre-admin',
      issuer: 'entre',
    });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
export async function consumeRateLimit(ip: string, purpose: string, limit: number) {
  const db = getDb();
  const secret = process.env.RATE_LIMIT_SECRET || process.env.SESSION_SECRET;
  if (!db || !secret) throw new Error('Proteção indisponível');
  const key = createHmac('sha256', secret)
    .update(purpose + ':' + ip)
    .digest('hex');
  const result = await db.execute(
    sql`INSERT INTO rate_limits (key, count, expires_at) VALUES (${key}, 1, now() + interval '1 hour') ON CONFLICT (key) DO UPDATE SET count = CASE WHEN rate_limits.expires_at < now() THEN 1 ELSE rate_limits.count + 1 END, expires_at = CASE WHEN rate_limits.expires_at < now() THEN now() + interval '1 hour' ELSE rate_limits.expires_at END RETURNING count`,
  );
  return Number(result.rows[0]?.count ?? limit + 1) <= limit;
}
export function clientIp(request: Request) {
  return process.env.VERCEL
    ? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    : 'local-development';
}
