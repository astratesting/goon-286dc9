import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/session';
import { getEventsForUser } from '@/lib/db';
import ProfileEditor from '@/components/ProfileEditor';
import SignOutButton from '@/components/SignOutButton';

const TIER_PRIVILEGES: Record<string, string[]> = {
  FOUNDING: [
    'Charter name on the house ledger',
    'Unlimited house access, opening season',
    'One private salon per year, hosted in your name',
    'Right of refusal on a charter key',
  ],
  RESIDENT: [
    'Full house access during open evenings',
    'Member-plus-one entry',
    'Library and cellar privileges',
    'Priority on the seasonal calendar',
  ],
  ASSOCIATE: [
    'Seasonal access (twelve open evenings annually)',
    'Library privileges',
    'Invitation to the annual charter dinner',
  ],
  CURIOUS: [
    'Standing on the interest ledger',
    'Private communiques ahead of opening',
    'Priority when applications formally open',
  ],
};

const CALENDAR = [
  { date: 'Provisional', title: 'The Charter Salon', note: 'Founding members only. Sealed invitations.' },
  { date: 'Provisional', title: 'Late Hours', note: 'Library opens after midnight.' },
  { date: 'Provisional', title: 'Courtyard Evening', note: 'Open-air, members plus one.' },
  { date: 'Provisional', title: 'The Annual Dinner', note: 'Black tie. By RSVP.' },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/signin');

  const events = getEventsForUser(user.id);
  const privileges = TIER_PRIVILEGES[user.tier] ?? TIER_PRIVILEGES.CURIOUS;

  return (
    <main className="min-h-screen bg-ink-900 text-bone">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-flame/15 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-magenta/15 blur-[140px]" />
      </div>

      <header className="border-b border-bone/10">
        <div className="container-narrow flex items-center justify-between py-6">
          <a href="/" className="display text-2xl">GOON<span className="text-flame">.</span></a>
          <div className="flex items-center gap-3">
            <a href="/" className="btn-ghost hidden sm:inline-flex">Back to site</a>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="container-narrow py-16">
        <p className="eyebrow text-acid">— The House</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">
          Good evening,
          <br />
          <span className="text-flame">{user.name.split(' ')[0]}.</span>
        </h1>
        <p className="mt-4 max-w-xl text-bone/60">
          This is your private dossier. The house is being prepared; what follows
          is your standing on the ledger and what the committee has noted about
          your name so far.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-bone/10 bg-ink-800 p-8 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-flame">— Membership Dossier</span>
              <span className="rounded-full border border-acid/40 bg-acid/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-acid">
                {user.status}
              </span>
            </div>
            <h2 className="display mt-6 text-3xl">{user.name}</h2>
            <p className="mt-1 text-bone/50">{user.email}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <dt className="eyebrow text-bone/40">Tier</dt>
                <dd className="display mt-2 text-xl text-bone">{user.tier}</dd>
              </div>
              <div>
                <dt className="eyebrow text-bone/40">Reference</dt>
                <dd className="display mt-2 text-xl text-bone">{user.id.toUpperCase()}</dd>
              </div>
              <div>
                <dt className="eyebrow text-bone/40">On the ledger since</dt>
                <dd className="mt-2 text-bone">{formatDate(user.createdAt)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-bone/40">Referral</dt>
                <dd className="mt-2 text-bone">{user.referral || '—'}</dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-bone/10 pt-8">
              <p className="eyebrow text-bone/40">What your tier carries</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {privileges.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-bone/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-bone/10 bg-ink-800 p-8">
            <span className="eyebrow text-magenta">— Provisional Calendar</span>
            <p className="mt-2 text-xs text-bone/40">
              Illustrative. The house is not yet open; dates confirm closer to launch.
            </p>
            <ul className="mt-6 space-y-5">
              {CALENDAR.map((c) => (
                <li key={c.title} className="border-l-2 border-flame/40 pl-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-acid">{c.date}</p>
                  <p className="display mt-1 text-lg">{c.title}</p>
                  <p className="mt-1 text-sm text-bone/60">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-bone/10 bg-ink-800 p-8">
            <span className="eyebrow text-acid">— House Committee</span>
            <h3 className="display mt-2 text-2xl">Notes on your name</h3>
            {events.length === 0 ? (
              <p className="mt-6 text-bone/50">No correspondence yet.</p>
            ) : (
              <ol className="mt-6 space-y-5">
                {events.map((ev) => (
                  <li key={ev.id} className="flex gap-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-flame" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-bone/40">
                        {formatDate(ev.createdAt)} · {ev.type.replace(/_/g, ' ')}
                      </p>
                      <p className="mt-1 text-bone/80">{ev.message}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <ProfileEditor initial={{ name: user.name, referral: user.referral, tier: user.tier }} />
        </div>
      </div>
    </main>
  );
}
