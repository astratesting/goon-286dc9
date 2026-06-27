import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, verifyPassword } from '@/lib/db';
import { createSession } from '@/lib/session';
import type { MembershipTier } from '@/lib/db';

const VALID_TIERS: MembershipTier[] = ['FOUNDING', 'RESIDENT', 'ASSOCIATE', 'CURIOUS'];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const tier = (String(body.tier || 'CURIOUS').toUpperCase()) as MembershipTier;
  const referral = String(body.referral || '').trim();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
  }
  if (!VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: 'Invalid membership tier.' }, { status: 400 });
  }

  const result = createUser({ name, email, password, tier, referral });
  if (result.error || !result.user) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  await createSession(result.user.id, result.user.email);
  return NextResponse.json({ ok: true, user: { id: result.user.id, email: result.user.email, name: result.user.name } });
}
