const TILES = [
  { hue: 'from-flame/40 via-magenta/20 to-ink-900', caption: 'The threshold' },
  { hue: 'from-magenta/40 via-flame/10 to-ink-900', caption: 'After midnight' },
  { hue: 'from-acid/30 via-ink-800 to-ink-900', caption: 'The courtyard' },
  { hue: 'from-ink-700 via-flame/20 to-ink-900', caption: 'The library' },
  { hue: 'from-magenta/30 via-ink-800 to-ink-900', caption: 'Gold leaf' },
  { hue: 'from-acid/20 via-flame/10 to-ink-900', caption: 'Charter night' },
];

export default function InstagramGallery() {
  return (
    <section id="gallery" className="relative border-t border-bone/10">
      <div className="container-narrow py-24 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-acid">— The Feed</p>
            <h2 className="display mt-4 text-4xl leading-[0.95] sm:text-5xl">
              A mood, not
              <br /> a marketing reel.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-bone/60">
            Our public grid is being curated by the house. Photographs of members
            never appear here — discretion is the founding rule. What you see is
            the room, the light, the hour.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TILES.map((t, i) => (
            <figure
              key={i}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-bone/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.hue}`} />
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 30%, #fff 0, transparent 40%)',
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="eyebrow text-bone/70">{t.caption}</span>
                <span className="display text-bone/40">{String(i + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#interest" className="btn-primary">Join the private list</a>
          <span className="text-sm text-bone/40">
            The members-only feed is shared by invitation.
          </span>
        </div>
      </div>
    </section>
  );
}
