'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Is Goon a real, operating club right now?',
    a: 'Not yet. We are a forthcoming private members club in formation. The house is being secured, the charter names are being gathered, and this page exists to take letters of interest. No memberships are being sold today, and no opening date is promised until the house is ready. If you require certainty, we are not for you.',
  },
  {
    q: 'Who exactly is this for?',
    a: 'High-net-worth gay and lesbian individuals who want a private, prestigious space that is unambiguously queer and unambiguously old-money in feel. It is not a dating app, a nightlife brand, or a networking event. It is a salon for people who can afford to disappear from the public eye.',
  },
  {
    q: 'How is membership decided?',
    a: 'Honestly: by the House Committee, by referral, and by fit. You submit a letter of interest here; if your name is of interest, we arrange a private conversation. There is no public application fee, no published criteria, and no guarantee. We turn people down. That is the point of a private club.',
  },
  {
    q: 'What does it cost?',
    a: 'We are not publishing dues on a coming-soon page. Tiered annual membership is anticipated, with Founding charter seats limited. Concrete figures are shared only in conversation with serious candidates, once the house is open.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-bone/10 bg-ink-800">
      <div className="container-narrow py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="eyebrow text-flame">— Honest Answers</p>
            <h2 className="display mt-6 text-4xl leading-[0.95] sm:text-5xl">
              No mystique
              <br /> where it
              <br /> isn&rsquo;t earned.
            </h2>
          </div>

          <div className="divide-y divide-bone/10 border-y border-bone/10">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`display text-xl transition-colors ${isOpen ? 'text-flame' : 'text-bone'}`}>
                      {item.q}
                    </span>
                    <span className={`display text-2xl transition-transform ${isOpen ? 'rotate-45 text-acid' : 'text-bone/40'}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-6 text-bone/70">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
