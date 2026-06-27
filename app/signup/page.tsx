'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MembershipTier } from '@/lib/db';

const TIERS: { value: MembershipTier; label: string }[] = [
  { value: 'FOUNDING', label: 'Founding' },
  { value: 'RESIDENT', label: 'Resident' },
  { value: 'ASSOCIATE', label: 'Associate' },
  { value: 'CURIOUS', label: 'Curious' },
];

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [tier, setTier] = useState<MembershipTier>('FOUNDING');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, referral, tier }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('idle');
        setError(data.error || 'Could not create account.');
        return;
      }
      router.push('/dashboard');
    } catch {
      setStatus('idle');
      setError('Network error. Please try again.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-900 px-6 py-16">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-magenta/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-acid/15 blur-[140px]" />
      </div>

      <div className="w-full max-w-lg">
        <a href="/" className="display text-3xl">GOON<span className="text-flame">.</span></a>
        <h1 className="display mt-8 text-4xl">Apply for membership.</h1>
        <p className="mt-3 text-bone/60">Your letter of interest begins the dossier.</p>

        <form onSubmit={submit} className="mt-10 space-y-5 rounded-3xl border border-bone/10 bg-ink-800 p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-bone/60">Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
                placeholder="As you wish to be announced"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-bone/60">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
                placeholder="you@house.com"
              />
            </label>
          </div>

          <label className="block">
            <span className="eyebrow text-bone/60">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
              placeholder="At least 6 characters"
            />
          </label>

          <label className="block">
            <span className="eyebrow text-bone/60">LinkedIn / Referral</span>
            <input
              type="text"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
              placeholder="A member's name, or your LinkedIn URL"
            />
          </label>

          <fieldset>
            <legend className="eyebrow text-bone/60">Tier of interest</legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TIERS.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setTier(t.value)}
                  className={`rounded-xl border px-3 py-3 text-sm transition-colors ${
                    tier === t.value
                      ? 'border-flame bg-flame/10 text-bone'
                      : 'border-bone/10 bg-ink-900 text-bone/70 hover:border-bone/40'
                  }`}
                >
                  <span className="display block text-sm">{t.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">{error}</p>
          )}

          <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
            {status === 'submitting' ? 'Submitting…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-bone/50">
          Already on the ledger?{' '}
          <a href="/signin" className="text-acid underline-offset-4 hover:underline">Sign in</a>
        </p>
      </div>
    </main>
  );
}
