'use client';

import { useState } from 'react';
import type { MembershipTier } from '@/lib/db';

const TIERS: MembershipTier[] = ['FOUNDING', 'RESIDENT', 'ASSOCIATE', 'CURIOUS'];

export default function ProfileEditor({
  initial,
}: {
  initial: { name: string; referral: string; tier: MembershipTier };
}) {
  const [name, setName] = useState(initial.name);
  const [referral, setReferral] = useState(initial.referral);
  const [tier, setTier] = useState<MembershipTier>(initial.tier);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, referral, tier }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Could not save.');
        return;
      }
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setError('Network error.');
    }
  }

  return (
    <form onSubmit={save} className="space-y-5 rounded-3xl border border-bone/10 bg-ink-800 p-8">
      <div className="flex items-center justify-between">
        <h3 className="display text-2xl">Your dossier</h3>
        {status === 'saved' && <span className="text-acid text-sm">Saved.</span>}
      </div>

      <label className="block">
        <span className="eyebrow text-bone/60">Name</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="eyebrow text-bone/60">LinkedIn / Referral</span>
        <input
          type="text"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
          className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
        />
      </label>

      <fieldset>
        <legend className="eyebrow text-bone/60">Tier of interest</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TIERS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-xl border px-3 py-3 transition-colors ${
                tier === t ? 'border-flame bg-flame/10 text-bone' : 'border-bone/10 bg-ink-900 text-bone/70 hover:border-bone/40'
              }`}
            >
              <span className="display text-sm">{t}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">{error}</p>
      )}

      <button type="submit" disabled={status === 'saving'} className="btn-primary w-full disabled:opacity-60">
        {status === 'saving' ? 'Saving…' : 'Save dossier'}
      </button>
    </form>
  );
}
