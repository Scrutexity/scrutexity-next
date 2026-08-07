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

export function MakroTestimonials() {
  return (
    <section className="border-t border-white/[0.07] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-[640px]">
            <Kicker>Customer spotlight</Kicker>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#ebedfa] sm:text-5xl">
              How teams use the record.
            </h2>
            <p className="mt-4 text-[13px] italic text-[#9391b8]">
              Illustrative profiles for layout — no client identities or live
              metrics are fabricated.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SPOTLIGHTS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.08} className="h-full">
              <GlassCard className="flex h-full flex-col p-7">
                <p className="text-[15px] leading-relaxed text-[#ebedfa]">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="text-[13px] font-semibold text-[#ebedfa]">{s.role}</p>
                  <p className="text-[12px] text-[#9391b8]">{s.name}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold text-[#d9ff5c]">{s.metric}</p>
                    <p className="text-[11px] uppercase tracking-wide text-[#9391b8]">
                      {s.metricLabel}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {s.uses.map((u) => (
                      <span
                        key={u}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#9391b8]"
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
