export default function VenueTeaser() {
  return (
    <section id="venue" className="relative border-t border-bone/10">
      <div className="container-narrow py-24 sm:py-32">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-bone/10">
            <div
              className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900"
              aria-hidden
            />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-magenta/30 blur-[100px]" aria-hidden />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-flame/30 blur-[100px]" aria-hidden />
            <div className="relative flex h-full min-h-[26rem] flex-col justify-between p-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-acid">— The House</span>
                <span className="eyebrow text-bone/40">Established MMXXVI</span>
              </div>
              <div>
                <p className="display text-3xl text-bone sm:text-4xl">
                  A pair of townhouses. One door. No sign above it.
                </p>
                <p className="mt-6 max-w-md text-bone/70">
                  Gold-leaf ceilings that have seen worse. A library that locks
                  from the inside. A courtyard for cigarettes and confessions.
                  The address is shared only with members, the night before.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow text-flame">— Locale</p>
              <h2 className="display mt-4 text-4xl leading-[0.95] sm:text-5xl">
                West Hollywood,
                <br /> Beverly Heights.
              </h2>
              <p className="mt-6 max-w-md text-bone/70">
                Two cities, one society. WeHo for the long evenings; the Heights
                for the short mornings. Between them, a private motor runs the
                members who prefer not to be seen arriving.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-4">
              {[
                ['Salon', 'Members only'],
                ['Library', 'After midnight'],
                ['Courtyard', 'Open-air'],
                ['Cellar', 'By the key'],
              ].map(([label, sub]) => (
                <li key={label} className="rounded-2xl border border-bone/10 bg-ink-800 p-5">
                  <p className="display text-lg text-bone">{label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone/40">{sub}</p>
                </li>
              ))}
            </ul>

            <p className="text-sm leading-relaxed text-bone/50">
              The exact address is disclosed to confirmed members only. Open
              evenings are calendared privately. Discretion is not a feature —
              it is the founding rule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
