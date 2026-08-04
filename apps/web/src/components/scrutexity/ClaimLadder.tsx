'use client';

import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { motion } from 'framer-motion';

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
  accent?: 'sage' | 'clay' | 'espresso';
};

const STEPS: LadderStep[] = [
  {
    step: 1,
    name: 'Free Claim Snapshot',
    price: '$0',
    cadence: 'one-time',
    tagline: 'See if your page has exposure before committing.',
    includes: [
      'Automated scan of one public page',
      'Top 3 claim risks surfaced',
      'One suggested rewrite',
    ],
    ctaLabel: 'Start free',
    ctaHref: 'https://auditgpt.ai/snapshot?source=ladder-step1',
    source: 'ladder-step1',
  },
  {
    step: 2,
    name: 'Claim Exposure Audit',
    price: '$497',
    cadence: 'one-time · credits toward Guardian',
    tagline: 'Dated review record with enforcement-pattern matches, evidence gaps, and safer rewrites.',
    includes: [
      'One public page — every claim on it extracted and scored',
      'AI Distortion Snapshot across 3+ LLMs',
      'Source references from enforcement library',
      'Safer rewrite language per claim',
      'Dated PDF review receipt',
    ],
    ctaLabel: 'Get the $497 Audit',
    ctaHref: 'https://auditgpt.ai/snapshot?source=ladder-step2&intent=paid',
    source: 'ladder-step2',
  },
  {
    step: 3,
    name: 'Guardian',
    price: 'from $1,497',
    cadence: '/ mo',
    tagline: 'Continuous monitoring with a dated review record that never goes stale.',
    includes: [
      'Monthly claim re-review + updated record',
      'AI distortion alerts across major AI surfaces',
      'Alerts when new enforcement patterns match your pages',
      'S-Mark Review Record',
      'Your $497 audit credits toward month one',
    ],
    ctaLabel: 'Book a Guardian call',
    ctaHref: '/contact?plan=guardian',
    source: 'ladder-step3',
    accent: 'espresso',
  },
  {
    step: 4,
    name: 'Enterprise',
    price: 'from $4,997',
    cadence: '/ mo',
    tagline: 'Multi-location groups, platforms, and agencies operating at scale.',
    includes: [
      'Multi-domain monitoring under one record',
      'API access to the Claim Graph',
      'Claim Foundation setup across brands',
      'Quarterly counsel-ready review summary',
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact?plan=enterprise',
    source: 'ladder-step4',
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
    : 'The snapshot surfaces the gap. The receipt creates the dated record. Monitoring keeps it current.';

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
        </div>
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="relative flex-1 group cursor-pointer"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[44px] left-[50%] right-[-50%] h-px bg-sand-deep/30 z-0 pointer-events-none" />
              )}
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
                  <div className="w-6 h-6 rounded-full bg-cream border border-sand-deep/40 flex items-center justify-center font-mono text-[9px] font-bold text-mist">
                    {s.step}
                  </div>
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

                <div className="mt-auto overflow-hidden">
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
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs transition-all duration-300 ${
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
    </section>
  );
}
