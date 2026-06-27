'use client';

import { useState } from 'react';

export default function Hero() {
  const [entering, setEntering] = useState(false);

  async function enterDemo() {
    setEntering(true);
    try {
      const res = await fetch('/api/auth/demo', { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        window.location.href = data.redirect || '/dashboard';
      } else {
        window.location.href = '/signin';
      }
    } catch {
      window.location.href = '/signin';
    } finally {
      setEntering(false);
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background field */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
        <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-flame/20 blur-[140px]" />
        <div className="absolute -right-40 top-40 h-[34rem] w-[34rem] rounded-full bg-magenta/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-acid/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <header className="container-narrow flex items-center justify-between py-6">
        <a href="/" className="display text-2xl tracking-tightest">
          GOON<span className="text-flame">.</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-bone/70 sm:flex">
          <a href="#manifesto" className="transition-colors hover:text-acid">Manifesto</a>
          <a href="#venue" className="transition-colors hover:text-acid">Venue</a>
          <a href="#interest" className="transition-colors hover:text-acid">Membership</a>
          <a href="#faq" className="transition-colors hover:text-acid">FAQ</a>
        </nav>
        <a href="/signin" className="btn-ghost hidden sm:inline-flex">Sign in</a>
      </header>

      <div className="container-narrow flex flex-col items-start gap-8 py-24 sm:py-32 lg:py-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-acid/40 bg-acid/10 px-4 py-1.5 text-acid">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          <span className="eyebrow text-acid">Coming Soon — Applications Open</span>
        </span>

        <h1 className="display max-w-5xl text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
          The Salon
          <br />
          <span className="text-flame">Returns.</span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-bone/80 sm:text-xl">
          A private members club for high-net-worth queer society — an old European
          aristocratic salon, restored to its proper decadence. Velvet rooms,
          curated company, the discretion of a closed door. West Hollywood and
          Beverly Heights. By invitation, and by application.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#interest" className="btn-primary">
            Request an Invitation
          </a>
          <button onClick={enterDemo} disabled={entering} className="btn-ghost disabled:opacity-60">
            {entering ? 'Entering…' : 'View Live Demo'}
          </button>
        </div>

        <dl className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-bone/10 pt-10 sm:grid-cols-4">
          <div>
            <dt className="eyebrow text-bone/50">Founded</dt>
            <dd className="mt-2 display text-2xl">MMXXVI</dd>
          </div>
          <div>
            <dt className="eyebrow text-bone/50">Locale</dt>
            <dd className="mt-2 display text-2xl">WeHo</dd>
          </div>
          <div>
            <dt className="eyebrow text-bone/50">Access</dt>
            <dd className="mt-2 display text-2xl">Private</dd>
          </div>
          <div>
            <dt className="eyebrow text-bone/50">Society</dt>
            <dd className="mt-2 display text-2xl">Queer</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
