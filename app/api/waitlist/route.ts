import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistEntry, countWaitlistAhead } from '@/lib/db';
import type { MembershipTier } from '@/lib/db';

const VALID_TIERS: MembershipTier[] = ['FOUNDING', 'RESIDENT', 'ASSOCIATE', 'CURIOUS'];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const referral = String(body.referral || '').trim();
  const tier = (String(body.tier || 'CURIOUS').toUpperCase()) as MembershipTier;

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (!VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier.' }, { status: 400 });
  }

  const entry = addWaitlistEntry({ name, email, referral, tier });
  const ahead = countWaitlistAhead(email);
  return NextResponse.json({
    ok: true,
    reference: entry.id.toUpperCase(),
    position: ahead + 1,
  });
}
