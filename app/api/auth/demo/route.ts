import { NextResponse } from 'next/server';
import { findUserByEmail, DEMO_CREDENTIALS } from '@/lib/db';
import { createSession } from '@/lib/session';

// One-click demo access: logs the visitor into the seeded demo account.
export async function POST() {
  const user = findUserByEmail(DEMO_CREDENTIALS.email);
  if (!user) {
    return NextResponse.json({ error: 'Demo account unavailable.' }, { status: 500 });
  }
  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true, redirect: '/dashboard' });
}
