'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'demo'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('idle');
        setError(data.error || 'Invalid credentials.');
        return;
      }
      router.push('/dashboard');
    } catch {
      setStatus('idle');
      setError('Network error. Please try again.');
    }
  }

  async function demo() {
    setStatus('demo');
    setError('');
    try {
      const res = await fetch('/api/auth/demo', { method: 'POST' });
      const data = await res.json();
      if (data.ok) router.push(data.redirect || '/dashboard');
      else {
        setStatus('idle');
        setError('Demo unavailable.');
      }
    } catch {
      setStatus('idle');
      setError('Network error.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-900 px-6 py-16">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-flame/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-magenta/20 blur-[140px]" />
      </div>

      <div className="w-full max-w-md">
        <a href="/" className="display text-3xl">GOON<span className="text-flame">.</span></a>
        <h1 className="display mt-8 text-4xl">Welcome back.</h1>
        <p className="mt-3 text-bone/60">The door recognises you. Step inside.</p>

        <form onSubmit={submit} className="mt-10 space-y-5 rounded-3xl border border-bone/10 bg-ink-800 p-8">
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
          <label className="block">
            <span className="eyebrow text-bone/60">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bone/15 bg-ink-900 px-4 py-3 text-bone focus:border-flame focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">{error}</p>
          )}

          <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
            {status === 'submitting' ? 'Entering…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button onClick={demo} disabled={status === 'demo'} className="btn-ghost w-full disabled:opacity-60">
            {status === 'demo' ? 'Entering demo…' : 'View live demo'}
          </button>
          <p className="text-center text-sm text-bone/50">
            No letter on the ledger yet?{' '}
            <a href="/signup" className="text-acid underline-offset-4 hover:underline">Apply for membership</a>
          </p>
        </div>
      </div>
    </main>
  );
}
