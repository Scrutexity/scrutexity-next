"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Lock, CheckCircle2, Search, FileText, Globe, PhoneCall, ShieldCheck, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';
import ClaimLadder from '@/components/scrutexity/ClaimLadder';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

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
  const [activeSection, setActiveSection] = useState('auditgpt');

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  // Sticky anchor active state observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['auditgpt', 'contento', 'recovery', 'aivisibility', 'agency'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            Flat-fee pricing for governed growth
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-espresso tracking-[-0.03em] leading-[1.04]"
          >
            Start with the audit. <br />
            <span className="italic text-sage-deep">Grow with the system.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 text-sm md:text-base text-mist leading-[1.65] max-w-3xl mx-auto font-sans"
          >
            Start with a free claim snapshot or a $299 AuditGPT Claim Intelligence Report. The report includes a dated Claim Intelligence Receipt and a conservative Reviewed by AuditGPT badge. If the report reveals fixable proof gaps, Scrutexity can activate the $1,997 Claim Cleanup Record, then monitor drift at $299/month. Agencies can join the Receipt Beta at $499/month for the first five partners, then $799/month after.
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
              href="/claim-audit"
              className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
            >
              Run AuditGPT
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => scrollTo('pricing-sections')}
              className="group px-7 py-3.5 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-1.5"
            >
              Explore services
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
            Scrutexity identifies claim-support, content-risk, visibility, reputation, and follow-up patterns. It does not provide legal, clinical, regulatory, or medical advice.
          </motion.p>
        </div>
      </section>

      {/* Section 1.5 — Claim Ladder (the canonical buyer path, surfaced above all tier grids) */}
      <ClaimLadder variant="pricing" />

      {/* Section 2 — Pricing Overview Visual */}
      <section className="px-6 py-16 bg-cream border-b border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8 shadow-xs">
            <h3 className="text-center font-mono text-[10px] uppercase tracking-widest text-mist mb-8">Integrated Platform Ecosystem</h3>
            
            {/* System Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
              {[
                { label: 'AuditGPT', icon: Search, desc: 'Finds the plan', step: '01' },
                { label: 'Contento', icon: FileText, desc: 'Governs content', step: '02' },
                { label: 'AI Visibility', icon: Globe, desc: 'Improves presence', step: '03' },
                { label: 'Recovery', icon: PhoneCall, desc: 'Converts demand', step: '04' },
                { label: 'Proof & Reputation', icon: ShieldCheck, desc: 'Makes trust visible', step: '05' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="relative flex flex-col items-center text-center p-4 bg-cream/50 rounded-xl border border-sand-deep/20">
                    <span className="absolute top-2 left-2 text-[8px] font-mono text-mist">{item.step}</span>
                    <span className="p-3 bg-sage/12 text-sage-deep rounded-full mb-3">
                      <Icon size={18} />
                    </span>
                    <h4 className="font-display text-base text-espresso font-semibold mb-1">{item.label}</h4>
                    <p className="text-xs text-mist leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <p className="mt-8 text-center text-xs font-mono text-sage-deep">
              AuditGPT finds the plan. Contento is embedded/pilot-stage. AI Visibility improves structured discoverability. Recovery is available for selected pilots. Proof &amp; Reputation make trust visible.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Unified Pricing Path */}
      <section id="plans" className="px-6 py-20 bg-cream">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2">Platform Pricing</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">The 5-Step Canonical Path</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
            {/* 1. Free Claim Snapshot */}
            <PricingCard
              tier={{
                name: 'Free Claim Snapshot',
                price: '$0',
                cadence: 'one-time',
                bestFor: 'Testing the diagnostic wedge before purchasing.',
                includes: [
                  'One public-surface scan',
                  'Top 3 claim risks identified',
                  'One suggested rewrite fix',
                  'No credit card required'
                ],
                ctaLabel: 'Run Free Snapshot',
                ctaHref: '/claim-audit?intent=claim-audit',
                accent: 'neutral'
              }}
            />

            {/* 2. Claim Intelligence Report */}
            <PricingCard
              tier={{
                name: 'Claim Intelligence Report',
                price: '$299',
                cadence: 'one-time',
                badge: 'Recommended',
                accent: 'pine',
                bestFor: 'CMOs and operators needing a complete, prioritized action plan.',
                includes: [
                  'Read-only claim surface scan',
                  'Full claim audit & risk score',
                  'Dated Claim Intelligence Receipt',
                  'Reviewed by AuditGPT badge + static summary page',
                  'Drop-in safer rewrites',
                  'AI search visibility gaps mapped',
                  '30-day action plan'
                ],
                ctaLabel: 'Get the $299 Report',
                ctaHref: '/claim-audit?intent=claim-audit'
              }}
            />

            {/* 3. Claim Cleanup Record */}
            <PricingCard
              tier={{
                name: 'Claim Cleanup Record',
                price: '$1,997',
                cadence: 'one-time via Scrutexity',
                bestFor: 'Clinics needing their copy and evidence library executed and locked.',
                accent: 'clay',
                includes: [
                  'Done-for-you rewrites across priority pages',
                  'Proof-gap table — evidence linked per claim',
                  'AI Answer Reality Receipt included',
                  'Medical-director visibility check',
                  'Final Claim Cleanup Record PDF'
                ],
                ctaLabel: 'Book Claim Cleanup Record',
                ctaHref: '/contact?intent=claim-cleanup-record'
              }}
            />

            {/* 4. Claim Drift Monitoring */}
            <PricingCard
              tier={{
                name: 'Claim Drift Monitoring',
                price: '$299',
                cadence: '/ month',
                accent: 'pine',
                bestFor: 'Operators updating site copy, ads, or visibility surfaces regularly.',
                includes: [
                  'Continuous claim drift scans',
                  'Monthly updated reports',
                  'Badge status management',
                  'Drift alert queues'
                ],
                ctaLabel: 'Start Claim Drift Monitoring',
                ctaHref: '/claim-audit?intent=monitoring'
              }}
            />

            {/* 5. Agency Receipt Beta */}
            <PricingCard
              tier={{
                name: 'Agency Receipt Beta',
                price: '$499',
                cadence: '/ mo (Founding Beta)',
                badge: 'First 5 Partners',
                bestFor: 'Agencies that need a client-ready receipt for high-claim launches.',
                includes: [
                  '10 Claim Intelligence Receipts / month',
                  'White-label PDFs & client briefs',
                  'Static reviewed-badge pages',
                  'Client approval language for launch packets',
                  'First 5 partners rate locks',
                  'Standard rate is $799/mo after'
                ],
                ctaLabel: 'Join the Agency Beta',
                ctaHref: '/agency',
                accent: 'neutral'
              }}
            />
          </div>
        </div>
      </section>

      {/* Section 8.5 — Creator & Personal Brand Claim Intelligence */}
      <section className="px-6 py-20 bg-cream border-t border-sand-deep/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-deep block mb-2" style={{ fontFamily: MONO_STACK }}>Secondary Path</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">Creator &amp; Personal Brand Claim Intelligence</h2>
            <p className="mt-3 text-sm text-mist leading-relaxed font-sans">
              For creators, founders, coaches, experts, and personal brands who need sponsor-ready claims, cleaner public positioning, and safer AI answer visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Snapshot */}
            <div className="bg-bone border border-sand-deep/30 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base text-espresso font-semibold">Personal Brand Snapshot</h3>
                <p className="font-display text-2xl text-espresso font-bold my-2">$99</p>
                <p className="text-[11px] text-mist leading-relaxed">
                  Brief scan covering the top 3 exposure areas on a personal domain or bio list.
                </p>
              </div>
              <Link href="/personal-brand-audit" className="mt-5 text-[10px] font-mono font-bold uppercase tracking-wider text-sage-deep hover:text-espresso flex items-center gap-1 w-fit">
                View Creator Audit <ArrowRight size={10} />
              </Link>
            </div>

            {/* Audit */}
            <div className="bg-bone border border-sand-deep/30 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base text-espresso font-semibold">Sponsor-Ready Claim Audit</h3>
                <p className="font-display text-2xl text-espresso font-bold my-2">$399</p>
                <p className="text-[11px] text-mist leading-relaxed">
                  Full manual inventory of public statements, credentials, and visibility surfaces.
                </p>
              </div>
              <Link href="/personal-brand-audit" className="mt-5 text-[10px] font-mono font-bold uppercase tracking-wider text-sage-deep hover:text-espresso flex items-center gap-1 w-fit">
                View Creator Audit <ArrowRight size={10} />
              </Link>
            </div>

            {/* Cleanup */}
            <div className="bg-bone border border-clay/35 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base text-espresso font-semibold">Creator Cleanup Sprint</h3>
                <p className="font-display text-2xl text-espresso font-bold my-2">$1,999</p>
                <p className="text-[11px] text-mist leading-relaxed">
                  Full rewrite implementation, proof page publishing, and evidence locks.
                </p>
              </div>
              <Link href="/personal-brand-audit" className="mt-5 text-[10px] font-mono font-bold uppercase tracking-wider text-sage-deep hover:text-espresso flex items-center gap-1 w-fit">
                View Creator Audit <ArrowRight size={10} />
              </Link>
            </div>

            {/* Governance */}
            <div className="bg-bone border border-sand-deep/30 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base text-espresso font-semibold">Ongoing Governance</h3>
                <p className="font-display text-2xl text-[#5E7A5A] font-bold my-2">$299<span className="text-[10px] font-normal text-mist">/mo</span></p>
                <p className="text-[11px] text-mist leading-relaxed">
                  Weekly scanning for claim drift, media deck updates, and citation monitoring.
                </p>
              </div>
              <Link href="/personal-brand-audit" className="mt-5 text-[10px] font-mono font-bold uppercase tracking-wider text-sage-deep hover:text-espresso flex items-center gap-1 w-fit">
                View Creator Audit <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 — Comparison Matrix */}
      <section className="px-6 py-20 bg-cream-deep border-t border-b border-sand-deep/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-display text-2xl md:text-3xl text-espresso tracking-tight mb-8">
            Which Plan Should I Start With?
          </h2>

          <div className="bg-bone border border-sand-deep/35 rounded-2xl overflow-hidden shadow-xs divide-y divide-sand-deep/25">
            {[
              { q: '“I want to know what is wrong first”', a: 'Claim Intelligence Report', href: '/claim-audit' },
              { q: '“I need my claims cleaned up”', a: 'Med Spa Claim Cleanup Sprint', href: '/contact?intent=cleanup-sprint' },
              { q: '“I want ongoing monitoring”', a: 'Claim Drift Monitoring', href: '/claim-audit?intent=monitoring' },
              { q: '“I run an agency”', a: 'Agency Receipt Beta', href: '/agency' },
              { q: '“I’m not sure”', a: 'Free Claim Snapshot', href: '/claim-audit' }
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
            Start with the audit. <br />
            <span className="italic text-sage-deep font-sans">Then build the system.</span>
          </h2>
          <p className="mt-5 text-sm text-mist max-w-xl mx-auto leading-relaxed">
            AuditGPT shows what is unsupported, invisible, risky, or leaking. Scrutexity turns that plan into receipts, reviewed badges, governed content, visibility improvements, recovery workflows, and proof artifacts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/claim-audit"
              className="group px-7 py-3.5 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-xs"
            >
              Run AuditGPT
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/proof"
              className="group px-7 py-3.5 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Explore Proof Artifacts
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
  const accentText = tier.accent === 'pine' ? 'text-sage-deep' : tier.accent === 'clay' ? 'text-clay-deep' : 'text-espresso';

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
