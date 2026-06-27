export default function Manifesto() {
  return (
    <section id="manifesto" className="relative border-t border-bone/10 bg-ink-800">
      <div className="container-narrow py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="eyebrow text-flame">— The Manifesto</p>
            <h2 className="display mt-6 text-4xl leading-[0.95] sm:text-5xl">
              We were promised
              <br /> salons. We were
              <br /> sold apps.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-bone/80 sm:text-lg">
            <p>
              The queer aristocracy has nowhere left to be vulgar in peace. The
              apps flattened us into profiles. The clubs thinned into tourist
              nights. Somewhere between the velvet rope and the algorithm, the
              <span className="text-bone"> room itself</span> disappeared — the
              kind of room where a duchess, a dealer, and a director could argue
              about opera until three in the morning and nobody asked for a selfie.
            </p>
            <p>
              <span className="text-acid">Goon</span> is the return of that room.
              Not a bar. Not a brand. A salon — the old European sort, where
              membership meant a name on a ledger and a key in your pocket, where
              luxury was the silence between conversations, and where being
              <em className="text-magenta"> outré</em> was a minimum requirement,
              not a marketing line.
            </p>
            <p>
              We are building it for those who can afford to disappear: a private
              house, a discrete staff, a calendar of curated intimacies. No
              press. No logos on the wall. No strangers in the photograph. The
              door closes behind you, and the century turns back a hundred years.
            </p>
            <p className="display text-xl text-flame">
              Aristocratic. Queer. Ours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
