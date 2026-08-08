'use client';

import { GlassCard, Kicker, Reveal } from './motion-kit';

/* ------------------------------ Testimonials ------------------------------ */
/* FTC rule: illustrative only. No fabricated named clients, no fake live
   metrics presented as real. Every card is a clearly-labeled illustrative
   profile so the page can never be read as fabricated social proof. */

const SPOTLIGHTS = [
  {
    quote:
      'The gap list paid for itself in one call. We knew exactly which claims to soften before the review meeting.',
    role: 'Founder & CEO',
    name: 'Illustrative profile — med-spa group',
    metric: '$150–250k',
    metricLabel: 'annual claim exposure reviewed',
    uses: ['Snapshot', 'Claim Support Review'],
  },
  {
    quote:
      'We run every vendor marketing page through a snapshot before diligence meetings now. It is our first screen.',
    role: 'Partner, diligence team',
    name: 'Illustrative profile — advisory firm',
    metric: '40+',
    metricLabel: 'vendor pages screened per quarter',
    uses: ['Snapshot', 'Watch'],
  },
  {
    quote:
      'Watch caught a drift in our launch copy within a day of the change. We fixed it before anyone noticed.',
    role: 'Head of Marketing',
    name: 'Illustrative profile — aesthetic clinic',
    metric: '2',
    metricLabel: 'drift events caught in first month',
    uses: ['Watch'],
  },
  {
    quote:
      'The dated record made the conversation with our insurer a conversation, not an argument.',
    role: 'General Counsel',
    name: 'Illustrative profile — franchise group',
    metric: '12',
    metricLabel: 'claim records produced',
    uses: ['Review', 'Enterprise'],
  },
];

export function MakroTestimonials({ isLight = true }: { isLight?: boolean }) {
  return (
    <section className={`transition-colors duration-500 px-5 py-24 sm:px-8 border-t ${
      isLight ? 'bg-paper-light border-black/5 text-ink' : 'bg-ink border-white/10 text-ink'
    }`}>
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-[640px]">
            <Kicker isLight={isLight}>Customer spotlight</Kicker>
            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-5xl ${
              isLight ? 'text-ink' : 'text-ink'
            }`}>
              How teams use the record.
            </h2>
            <p className={`mt-4 text-[13px] italic ${
              isLight ? 'text-muted' : 'text-muted'
            }`}>
              Illustrative profiles for layout — no client identities or live
              metrics are fabricated.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SPOTLIGHTS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.08} className="h-full">
              <GlassCard isLight={isLight} className="flex h-full flex-col p-7">
                <p className={`text-[15px] font-medium leading-relaxed ${
                  isLight ? 'text-ink' : 'text-ink'
                }`}>
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className={`mt-5 border-t pt-4 ${
                  isLight ? 'border-black/10' : 'border-white/10'
                }`}>
                  <p className={`text-[13px] font-bold ${
                    isLight ? 'text-ink' : 'text-ink'
                  }`}>{s.role}</p>
                  <p className={`text-[12px] ${
                    isLight ? 'text-muted' : 'text-muted'
                  }`}>{s.name}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold text-accent-text dark:text-accent-text">{s.metric}</p>
                    <p className={`text-[11px] font-bold uppercase tracking-wide ${
                      isLight ? 'text-muted' : 'text-muted'
                    }`}>
                      {s.metricLabel}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {s.uses.map((u) => (
                      <span
                        key={u}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                          isLight
                            ? 'border-black/10 bg-black/5 text-ink'
                            : 'border-white/10 bg-white/5 text-muted'
                        }`}
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
