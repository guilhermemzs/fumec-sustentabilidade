import { NextResponse } from 'next/server';
import {
  adminConfigured,
  sameOrigin,
  consumeRateLimit,
  clientIp,
  verifyPassword,
  createSession,
} from '@/lib/security';
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ message: 'Origem inválida.' }, { status: 403 });
  if (!adminConfigured())
    return NextResponse.json({ message: 'Gestão ainda não configurada.' }, { status: 503 });
  try {
    const text = await request.text();
    if (text.length > 1500)
      return NextResponse.json({ message: 'Entrada inválida.' }, { status: 400 });
    const body = JSON.parse(text);
    if (typeof body.password !== 'string' || body.password.length > 256)
      return NextResponse.json({ message: 'Entrada inválida.' }, { status: 400 });
    if (!(await consumeRateLimit(clientIp(request), 'login', 8)))
      return NextResponse.json(
        { message: 'Muitas tentativas. Tente em uma hora.' },
        { status: 429 },
      );
    if (!verifyPassword(body.password))
      return NextResponse.json({ message: 'Não foi possível autenticar.' }, { status: 401 });
    const response = NextResponse.json({ message: 'Acesso autorizado.' });
    response.cookies.set('entre_session', await createSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60,
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: 'A autenticação está temporariamente indisponível.' },
      { status: 503 },
    );
  }
}
