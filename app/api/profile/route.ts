import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/session';
import { updateUserProfile } from '@/lib/db';
import type { MembershipTier } from '@/lib/db';

const VALID_TIERS: MembershipTier[] = ['FOUNDING', 'RESIDENT', 'ASSOCIATE', 'CURIOUS'];

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const patch: Partial<Pick<typeof user, 'name' | 'tier' | 'referral'>> = {};
  if (typeof body.name === 'string' && body.name.trim()) patch.name = body.name.trim();
  if (typeof body.referral === 'string') patch.referral = body.referral.trim();
  if (typeof body.tier === 'string') {
    const t = String(body.tier).toUpperCase() as MembershipTier;
    if (!VALID_TIERS.includes(t)) {
      return NextResponse.json({ error: 'Invalid tier.' }, { status: 400 });
    }
    patch.tier = t;
  }

  const updated = updateUserProfile(user.id, patch);
  if (!updated) return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  return NextResponse.json({
    ok: true,
    user: { id: updated.id, name: updated.name, email: updated.email, tier: updated.tier, referral: updated.referral },
  });
}
