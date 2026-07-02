"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';
import ClaimLadder from '@/components/scrutexity/ClaimLadder';

const EASE = [0.16, 1, 0.3, 1] as const;

type Tier = {
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  accent?: 'pine' | 'clay' | 'neutral';
};

export default function PricingContent() {
  const reduced = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20 select-none pb-24">
      
      {/* Section 1 — Hero */}
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-cream-deep border-b border-sand-deep/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(94,122,90,0.12),transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
            Flat-fee claim risk reviews
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-espresso tracking-[-0.03em] leading-[1.04]"
          >
            Compare your page against real enforcement patterns. <br />
            <span className="italic text-sage-deep">Get a dated review record with safer rewrites.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 text-sm md:text-base text-mist leading-[1.65] max-w-3xl mx-auto font-sans"
          >
            Start with a free claim snapshot. The $497 Claim Exposure Audit covers one public page — every claim on that page scored against current enforcement patterns, safer rewrites, and a dated review record in 72 hours — and credits toward Guardian. Distortion Watch keeps up to 5 surfaces monitored at $297/month. Guardian keeps the full record current from $1,497/month. Multi-location and platform work starts at $4,997/month.
          </motion.p>

          {/* Principle Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2.5"
          >
            {['Flat fees', 'Documented work', 'No outcome guarantees'].map((pill) => (
              <span key={pill} className="px-3.5 py-1.5 text-[9px] uppercase font-mono tracking-widest bg-bone border border-sand-deep/40 rounded-full text-sage-deep font-semibold shadow-xs">
                {pill}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-pricing"
              className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
            >
              Get Your Free Snapshot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => scrollTo('plans')}
              className="group px-7 py-3.5 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-1.5"
            >
              See all plans
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Small trust/disclaimer line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-10 text-[10px] leading-relaxed text-mist/75 max-w-2xl mx-auto border-t border-sand-deep/20 pt-6 font-mono uppercase tracking-[0.1em]"
          >
            Scrutexity identifies claim-support patterns against public enforcement signals and AI-generated claim distortions. It does not provide legal, clinical, regulatory, or medical advice.
          </motion.p>
        </div>
      </section>

      {/* Section 1.5 — Claim Ladder (the canonical buyer path, surfaced above all tier grids) */}
      <ClaimLadder variant="pricing" />

      {/* Section 2 — Pricing cards */}
      <section id="plans" className="px-6 py-20 bg-cream">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2">Flat-Fee Pricing</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">Claim risk reviews, priced per scope.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
            {/* 1. Free Claim Snapshot */}
            <PricingCard
              tier={{
                name: 'Free Claim Snapshot',
                price: '$0',
                cadence: 'one-time',
                bestFor: 'Testing your exposure before committing.',
                includes: [
                  'One-page automated scan',
                  'Top 3 claim risks flagged',
                  'One suggested rewrite',
                  'No credit card required'
                ],
                ctaLabel: 'Run Free Snapshot',
                ctaHref: 'https://auditgpt.ai/snapshot?source=scrutexity-pricing',
                accent: 'neutral'
              }}
            />

            {/* 2. Claim Exposure Audit */}
            <PricingCard
              tier={{
                name: 'Claim Exposure Audit',
                price: '$497',
                cadence: 'one-time · credits toward Guardian',
                badge: 'Start Here',
                accent: 'pine',
                bestFor: 'Clinics that want their highest-risk page reviewed once, with a dated record.',
                includes: [
                  'One public page — every claim on it extracted and scored',
                  'Comparison against current enforcement patterns',
                  'Evidence gap identified per claim',
                  'Safer rewrite for each flagged claim',
                  'AI Distortion Snapshot across major AI surfaces',
                  'Dated review record, delivered in 72 hours'
                ],
                ctaLabel: 'Get the $497 Audit',
                ctaHref: 'https://auditgpt.ai/snapshot?source=scrutexity-pricing&intent=paid'
              }}
            />

            {/* 3. Distortion Watch */}
            <PricingCard
              tier={{
                name: 'Distortion Watch',
                price: '$297',
                cadence: '/ mo',
                accent: 'neutral',
                bestFor: 'Pages that stay live while enforcement patterns and AI answers keep moving.',
                includes: [
                  'Monthly re-scan of up to 5 public surfaces',
                  'Alerts when a newly cited claim pattern matches your language',
                  'AI answer drift notes by surface',
                  'Prioritized fix list each month'
                ],
                ctaLabel: 'Start Distortion Watch',
                ctaHref: '/contact?plan=distortion-watch'
              }}
            />

            {/* 4. Guardian */}
            <PricingCard
              tier={{
                name: 'Guardian',
                price: 'from $1,497',
                cadence: '/ mo',
                badge: 'Flagship',
                accent: 'clay',
                bestFor: 'Operators who want the record current every month, not once.',
                includes: [
                  'Monthly claim re-review + updated record',
                  'AI distortion alerts when answers about you change',
                  'Alerts when new enforcement patterns match your pages',
                  'S-Mark Review Record',
                  'Your $497 audit credits toward month one'
                ],
                ctaLabel: 'Book a Guardian Call',
                ctaHref: '/contact?plan=guardian'
              }}
            />

            {/* 5. Enterprise */}
            <PricingCard
              tier={{
                name: 'Enterprise',
                price: 'from $4,997',
                cadence: '/ mo',
                accent: 'neutral',
                bestFor: 'Multi-location groups, platforms, and agencies at scale.',
                includes: [
                  'Multi-domain monitoring under one record',
                  'API access to the Claim Graph',
                  'Claim Foundation setup across brands',
                  'Quarterly counsel-ready review summary',
                  'Dedicated review turnaround'
                ],
                ctaLabel: 'Talk to Us',
                ctaHref: '/contact?plan=enterprise'
              }}
            />
          </div>
        </div>
      </section>

      {/* Section 8.5 — Comparison Matrix */}
      <section className="px-6 py-20 bg-cream-deep border-t border-b border-sand-deep/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-display text-2xl md:text-3xl text-espresso tracking-tight mb-8">
            Which Plan Should I Start With?
          </h2>

          <div className="bg-bone border border-sand-deep/35 rounded-2xl overflow-hidden shadow-xs divide-y divide-sand-deep/25">
            {[
              { q: '"I want to know where I stand first"', a: 'Free Claim Snapshot', href: 'https://auditgpt.ai/snapshot' },
              { q: '"I want my highest-risk page reviewed, once, with a record"', a: 'Claim Exposure Audit ($497)', href: 'https://auditgpt.ai/snapshot?intent=paid' },
              { q: '"My pages stay live and keep changing"', a: 'Distortion Watch ($297/mo)', href: '/contact?plan=distortion-watch' },
              { q: '"I want the record current every month"', a: 'Guardian (from $1,497/mo)', href: '/contact?plan=guardian' },
              { q: '"I run multiple locations, a platform, or an agency"', a: 'Enterprise (from $4,997/mo)', href: '/contact?plan=enterprise' }
            ].map((row) => (
              <div key={row.q} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
                <span className="text-sm font-semibold text-espresso">{row.q}</span>
                <Link href={row.href} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-sage-deep hover:text-espresso">
                  {row.a} <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — What Scrutexity Does Not Promise */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-espresso tracking-tight">What we do not sell</h2>
            <p className="text-sm text-mist mt-2">Clear boundaries for structured services.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'No guaranteed rankings',
              'No guaranteed AI answers',
              'No guaranteed compliance',
              'No clinical approval',
              'No legal safety',
              'No revenue guarantees',
              'No unlimited audits',
              'No percentage-of-revenue pricing'
            ].map(item => (
              <div key={item} className="p-4 bg-bone border border-sand-deep/20 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px]">
                <XCircle size={14} className="text-clay mb-2" />
                <span className="font-mono text-xs font-semibold text-espresso">{item}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-mist leading-relaxed max-w-2xl mx-auto font-sans">
            Scrutexity charges for structured work, proof artifacts, governed content, visibility improvements, recovery workflows, and reporting. Outcomes depend on market conditions, client operations, platforms, budget, evidence quality, and implementation.
          </p>
        </div>
      </section>

      {/* Section 11 — Final CTA */}
      <section className="px-6 py-20 bg-cream-deep border-t border-sand-deep/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl text-espresso tracking-tight leading-tight">
            Compare your page against real enforcement patterns. <br />
            <span className="italic text-sage-deep font-sans">Get your dated review record today.</span>
          </h2>
          <p className="mt-5 text-sm text-mist max-w-xl mx-auto leading-relaxed">
            Free snapshot in under a minute. The $497 Claim Exposure Audit delivers safer rewrites, evidence gaps, source references, and a dated review record — and credits toward Guardian when you're ready for the record to stay current.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-pricing-bottom"
              className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
            >
              Get Your Free Snapshot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tracker"
              className="group px-7 py-3.5 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              View Enforcement Tracker
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Reusable Pricing Card Component
function PricingCard({ tier }: { tier: Tier }) {
  const reduced = useReducedMotion();
  const accentBorder = tier.accent === 'pine' ? 'border-sage-deep/50' : tier.accent === 'clay' ? 'border-clay/50' : 'border-sand-deep/30';

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative rounded-2xl p-6 bg-bone border ${accentBorder} flex flex-col justify-between shadow-xs hover:border-sage-deep/50 transition-colors`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-6 px-2.5 py-0.5 bg-sage/20 border border-sage-deep/30 text-sage-deep font-mono text-[9px] uppercase tracking-wider rounded-full font-bold">
          {tier.badge}
        </span>
      )}

      <div>
        <h3 className="font-display text-lg text-espresso font-semibold leading-snug mb-1">{tier.name}</h3>
        <div className="flex items-baseline gap-1.5 my-3">
          <span className="font-display text-3xl text-espresso tracking-tight tabular-nums font-bold">{tier.price}</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-mist">{tier.cadence}</span>
        </div>
        <p className="text-[11px] text-mist leading-relaxed border-t border-sand-deep/15 pt-3 mb-4 italic">
          Best for: {tier.bestFor}
        </p>
        <ul className="space-y-2 mt-4 text-xs text-bark font-mono">
          {tier.includes.map(inc => (
            <li key={inc} className="flex gap-2 items-start">
              <CheckCircle2 size={12} className="text-sage-soft shrink-0 mt-0.5" />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={tier.ctaHref}
        onClick={() => {
          trackEvent('pricing_plan_click', {
            plan_name: tier.name,
            destination: tier.ctaHref,
            section: 'pricing_tier_card'
          });
        }}
        className="group mt-6 w-full py-2.5 bg-sage-deep hover:bg-espresso text-cream text-[10px] font-bold font-mono tracking-widest uppercase text-center rounded-lg transition-colors inline-flex items-center justify-center gap-1 shadow-xs"
      >
        {tier.ctaLabel}
        <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}
