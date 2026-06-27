import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword } from '@/lib/db';
import { createSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user || !verifyPassword(user, password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
}
