'use client';

import { useState } from 'react';
import type { MembershipTier } from '@/lib/db';

const TIERS: { value: MembershipTier; label: string; note: string }[] = [
  { value: 'FOUNDING', label: 'Founding', note: 'Charter names on the ledger' },
  { value: 'RESIDENT', label: 'Resident', note: 'Full house access' },
  { value: 'ASSOCIATE', label: 'Associate', note: 'Seasonal access' },
  { value: 'CURIOUS', label: 'Curious', note: 'Keep me informed' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referral, setReferral] = useState('');
  const [tier, setTier] = useState<MembershipTier>('FOUNDING');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string; position: number } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, referral, tier }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Something went wrong.');
        return;
      }
      setResult({ reference: data.reference, position: data.position });
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Network error. Please try again.');
    }
  }

  if (status === 'success' && result) {
    return (
      <section id="interest" className="relative border-t border-bone/10 bg-ink-800">
        <div className="container-narrow py-24 sm:py-32">
          <div className="mx-auto max-w-2xl rounded-3xl border border-acid/30 bg-ink-700 p-10 text-center">
            <p className="eyebrow text-acid">— Letter Received</p>
            <h3 className="display mt-4 text-3xl sm:text-4xl">
              Your name is on the ledger.
            </h3>
            <p className="mt-4 text-bone/70">
              Reference <span className="text-acid">{result.reference}</span> —
              you are presently number{' '}
              <span className="text-flame">#{result.position}</span> in the order
              of consideration. The House Committee reviews letters weekly.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setResult(null);
                setName('');
                setEmail('');
                setReferral('');
              }}
              className="btn-ghost mt-8"
            >
              Submit another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="interest" className="relative border-t border-bone/10 bg-ink-800">
      <div className="container-narrow py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="eyebrow text-magenta">— Membership Interest</p>
            <h2 className="display mt-6 text-4xl leading-[0.95] sm:text-5xl">
              Place your
              <br /> name on the
              <br /> ledger.
            </h2>
            <p className="mt-6 max-w-md text-bone/70">
              A letter of interest is the first step. Tell us who you are and how
              you were sent; the House Committee will consider your name in turn.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6 rounded-3xl border border-bone/10 bg-ink-700 p-8 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-bone/60">Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="As you wish to be announced"
                  className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-bone/60">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@house.com"
                  className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="eyebrow text-bone/60">LinkedIn / Referral</span>
              <input
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder="A member's name, or your LinkedIn URL"
                className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone placeholder:text-bone/30 focus:border-flame focus:outline-none"
              />
            </label>

            <fieldset>
              <legend className="eyebrow text-bone/60">Membership Tier of Interest</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TIERS.map((t) => {
                  const active = tier === t.value;
                  return (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => setTier(t.value)}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        active
                          ? 'border-flame bg-flame/10 text-bone'
                          : 'border-bone/10 bg-ink-900 text-bone/70 hover:border-bone/40'
                      }`}
                    >
                      <span className="display block text-sm">{t.label}</span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-bone/40">
                        {t.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {status === 'error' && (
              <p className="rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">
                {error}
              </p>
            )}

            <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
              {status === 'submitting' ? 'Submitting…' : 'Submit Letter of Interest'}
            </button>
            <p className="text-center text-xs text-bone/40">
              Your details are kept private. No mailing list — only the ledger.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
