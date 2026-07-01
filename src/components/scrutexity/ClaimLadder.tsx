'use client';

/**
 * ClaimLadder — the canonical buyer path for the AuditGPT wedge.
 *
 * Free Claim Snapshot ($0) → Claim Intelligence Report ($299) → Claim Cleanup Record ($1,997) → Claim Drift Monitoring ($299/mo)
 *
 * Used on the homepage (between hero and services) and on /pricing (above tier grid).
 * Sequence is explicit — arrows between cards, "Start here" badge on Step 1, step numbers.
 *
 * Tracks every CTA via trackEvent + data-source attribute so we can read which step
 * the first paid signal came from.
 */

import Link from 'next/link';
import { ArrowRight, Check, Sparkles, Plus } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type LadderStep = {
  step: number;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  source: string;
  accent: 'sage' | 'clay' | 'espresso';
  highlight?: 'free' | 'recurring';
};

const STEPS: LadderStep[] = [
  {
    step: 1,
    name: 'Free Claim Snapshot',
    price: '$0',
    cadence: 'one-time',
    tagline: 'Find the claims your website cannot prove.',
    includes: [
      'Public claim scan of your homepage and top service pages',
      'Top 3 unsupported claims surfaced',
      '1-page snapshot you keep regardless of next step',
    ],
    ctaLabel: 'Start free',
    ctaHref: '/claim-audit?source=ladder-step1',
    source: 'ladder-step1',
    accent: 'sage',
    highlight: 'free',
  },
  {
    step: 2,
    name: 'Claim Intelligence Report',
    price: '$299',
    cadence: 'one-time',
    tagline: 'A dated Claim Intelligence Receipt your team can keep, share, or attach to a launch.',
    includes: [
      'Evidence map for surfaced claims',
      'Drop-in safer rewrites and citations',
      'Reviewed by AuditGPT badge linked to a static review summary',
      '30-day prioritized action plan for your team',
    ],
    ctaLabel: 'Unlock Report',
    ctaHref: '/pricing?source=ladder-step2#auditgpt',
    source: 'ladder-step2',
    accent: 'sage',
  },
  {
    step: 3,
    name: 'Claim Cleanup Record',
    price: '$1,997',
    cadence: 'one-time',
    tagline: 'A structured record of what changed, why it changed, and what public support now backs each priority claim.',
    includes: [
      'Done-for-you copywriting rewrites across priority pages',
      'Proof-gap table with evidence linked per claim',
      'Final Claim Cleanup Record PDF — what changed and why',
    ],
    ctaLabel: 'Book Claim Cleanup Record',
    ctaHref: '/pricing?source=ladder-step3',
    source: 'ladder-step3',
    accent: 'clay',
  },
  {
    step: 4,
    name: 'Claim Drift Monitoring',
    price: '$299',
    cadence: '/mo',
    tagline: 'Keep claims, content, and visibility under continuous review.',
    includes: [
      'Monthly AuditGPT pass with risk delta',
      'Claim drift alerts as marketing publishes',
      'Ongoing evidence updates and badge status',
    ],
    ctaLabel: 'Start Monitoring',
    ctaHref: '/pricing?source=ladder-step4#auditgpt',
    source: 'ladder-step4',
    accent: 'espresso',
    highlight: 'recurring',
  },
  {
    step: 5,
    name: 'Agency Receipt Beta',
    price: '$499',
    cadence: '/mo',
    tagline: 'A billable claim-review artifact your agency can attach to every high-claim launch.',
    includes: [
      '10 Claim Intelligence Receipts per month',
      'White-labeled PDFs and static reviewed-badge pages',
      'Launch packet language for client approvals',
    ],
    ctaLabel: 'Apply for Partner Beta',
    ctaHref: '/agency',
    source: 'ladder-step5',
    accent: 'clay',
  },
];

export default function ClaimLadder({ variant = 'homepage' }: { variant?: 'homepage' | 'pricing' }) {
  const sectionLabel = variant === 'pricing'
    ? 'The canonical buyer path'
    : 'Start with the free snapshot. Graduate through the system.';
  const headline = variant === 'pricing'
    ? 'A sequence, not a menu.'
    : 'Start with the free snapshot.';
  const subhead = variant === 'pricing'
    ? 'Each step earns the next. You never buy a tier you have not seen the value of first.'
    : 'The snapshot surfaces the gap. The report creates the receipt. The next steps turn that receipt into proof you can publish.';

  return (
    <section
      id="claim-ladder"
      aria-labelledby="claim-ladder-heading"
      className="px-6 py-20 md:py-24 bg-cream border-t border-sand-deep/15"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep mb-4">
            {sectionLabel}
          </p>
          <h2 id="claim-ladder-heading" className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
            {headline}
          </h2>
          <p className="mt-4 text-base md:text-lg text-mist leading-[1.6] max-w-2xl">
            {subhead}
          </p>
              <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="relative flex-1 group cursor-pointer"
            >
              {/* Connector line for desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[44px] left-[50%] right-[-50%] h-px bg-sand-deep/30 z-0 pointer-events-none" />
              )}
              {/* Connector line for mobile */}
              {i < STEPS.length - 1 && (
                <div className="block lg:hidden absolute top-[50px] bottom-[-24px] left-[24px] w-px bg-sand-deep/30 z-0 pointer-events-none" />
              )}

              <motion.div 
                variants={{
                  hover: { scale: 1.02, borderColor: 'var(--color-sage-deep)', y: -4 }
                }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative z-10 w-full h-full flex flex-col rounded-2xl border border-sand-deep/40 bg-bone p-6 shadow-xs transition-colors overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-cream border border-sand-deep/40 flex items-center justify-center font-mono text-[9px] font-bold text-mist group-hover:text-sage-deep group-hover:border-sage-deep transition-colors">
                      {s.step}
                    </div>
                  </div>
                  {s.highlight === 'free' && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-sage-deep bg-sage-soft/10 px-2 py-1 rounded-sm">
                      <Sparkles size={10} /> Start here
                    </span>
                  )}
                  {s.highlight === 'recurring' && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-clay-deep bg-clay/10 px-2 py-1 rounded-sm">
                      Ongoing
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg text-espresso font-semibold leading-tight mb-2">
                  {s.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-2xl text-espresso tracking-tight tabular-nums font-bold">
                    {s.price}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-mist">
                    {s.cadence}
                  </span>
                </div>

                <p className="text-xs text-mist leading-[1.5] mb-5">
                  {s.tagline}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[11px] text-espresso/80 leading-[1.5]">
                      <Plus size={12} className="text-sage-deep mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                {/* Animated CTA Reveal */}
                <div className="mt-auto overflow-hidden">
                  <motion.div
                    variants={{
                      hover: { opacity: 1, height: 'auto', y: 0 },
                      rest: { opacity: 0, height: 0, y: 10 }
                    }}
                    initial="rest"
                    className="pt-2"
                  >
                    <Link
                      href={s.ctaHref}
                      data-source={s.source}
                      onClick={() => {
                        trackEvent('cta_click', {
                          cta_label: s.ctaLabel,
                          destination: s.ctaHref,
                          section: variant === 'pricing' ? 'pricing-ladder' : 'homepage-ladder',
                          source: s.source,
                          step: s.step,
                        });
                      }}
                      className={`w-full group/btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs transition-all duration-300 ${
                        s.step === 1
                          ? 'bg-sage-deep hover:bg-espresso text-cream'
                          : s.step === 5
                            ? 'bg-clay hover:bg-clay-deep text-cream'
                            : 'bg-bone hover:bg-cream border border-sand-deep/45 text-espresso'
                      }`}
                    >
                      {s.ctaLabel}
                      <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-xs text-mist/80 max-w-3xl leading-[1.6]">
          Every reviewed claim strengthens the internal pattern library behind AuditGPT: claim category, proof gap,
          safer rewrite, AI answer distortion, and drift signal. Public outputs stay conservative; the dataset compounds.
        </p>
      </div>
      </div>
    </section>
  );
}
