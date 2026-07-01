"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

type CellTone = 'win' | 'neutral' | 'minus';

type Row = {
  category: string;
  scrutexity: { text: string; tone: CellTone };
  boulevard: { text: string; tone: CellTone };
  mangomint: { text: string; tone: CellTone };
  zenoti: { text: string; tone: CellTone };
};

const rows: Row[] = [
  {
    category: 'Product type',
    scrutexity: { text: 'Recovery overlay', tone: 'win' },
    boulevard:  { text: 'Premium PMS', tone: 'neutral' },
    mangomint:  { text: 'Modern spa PMS', tone: 'neutral' },
    zenoti:     { text: 'Enterprise PMS + AI suite', tone: 'neutral' },
  },
  {
    category: 'Monthly price (per location)',
    scrutexity: { text: '$2,000 flat', tone: 'win' },
    boulevard:  { text: '$176 – $410', tone: 'neutral' },
    mangomint:  { text: '$99 – $375', tone: 'neutral' },
    zenoti:     { text: '$200 – $500+ custom', tone: 'minus' },
  },
  {
    category: 'Replaces your PMS?',
    scrutexity: { text: 'No — sits on top', tone: 'win' },
    boulevard:  { text: 'It is the PMS', tone: 'neutral' },
    mangomint:  { text: 'It is the PMS', tone: 'neutral' },
    zenoti:     { text: 'Yes — full migration', tone: 'minus' },
  },
  {
    category: 'AI strategy',
    scrutexity: { text: 'Drafts → licensed-staff approval', tone: 'win' },
    boulevard:  { text: 'Smart prompts inside workflow', tone: 'neutral' },
    mangomint:  { text: 'Two-way texting, smart reminders', tone: 'neutral' },
    zenoti:     { text: '9 autonomous agents · in-suite only', tone: 'minus' },
  },
  {
    category: 'BAA governance',
    scrutexity: { text: 'Executed before activation', tone: 'win' },
    boulevard:  { text: 'Available', tone: 'neutral' },
    mangomint:  { text: 'Available', tone: 'neutral' },
    zenoti:     { text: 'Available', tone: 'neutral' },
  },
  {
    category: 'Pay structure',
    scrutexity: { text: 'Flat fee · no percentage', tone: 'win' },
    boulevard:  { text: 'Tiered subscription', tone: 'neutral' },
    mangomint:  { text: 'Tiered subscription', tone: 'neutral' },
    zenoti:     { text: 'Custom quote + add-ons', tone: 'minus' },
  },
  {
    category: 'Pilot terms',
    scrutexity: { text: '14 days · $0 if no verified re-engaged bookings', tone: 'win' },
    boulevard:  { text: 'Standard onboarding', tone: 'neutral' },
    mangomint:  { text: 'Free trial', tone: 'neutral' },
    zenoti:     { text: 'Custom rollout', tone: 'minus' },
  },
  {
    category: 'Onboarding time',
    scrutexity: { text: 'Days · read-only token', tone: 'win' },
    boulevard:  { text: 'Weeks', tone: 'neutral' },
    mangomint:  { text: 'Days', tone: 'neutral' },
    zenoti:     { text: 'Weeks to months', tone: 'minus' },
  },
];

const differentiators = [
  {
    eyebrow: 'On top of your stack',
    headline: 'We sit alongside, not in place of.',
    detail:
      'Keep Boulevard, Mangomint, or Zenoti exactly as is. Your front-desk workflow doesn’t change. We connect with a read-only token, observe the leak, and route inquiries back to your licensed staff with full context.',
  },
  {
    eyebrow: 'Flat fee · no percentage',
    headline: 'You compare us to the leak, not to your PMS.',
    detail:
      'Zenoti’s 9-agent suite is custom-quoted with add-ons. We’re $2,000 flat. No transaction fees, no percentage of recovered revenue, no per-patient charges. Acquisition diligence checks pricing language; ours stays on the safe side of CPOM and fee-splitting rules.',
  },
  {
    eyebrow: 'Staff approves · AI drafts',
    headline: 'Every recovery passes a licensed reviewer.',
    detail:
      'Other AI-led platforms reply autonomously to inquiries. Ours drafts a response, your licensed staff reviews and sends. Every reply is sealed in the ledger with the approver’s credential — defensible record, no autonomous clinical decisions.',
  },
];

const deepDives = [
  { name: 'Scrutexity vs Zenoti',  href: '/compare/zenoti',   blurb: 'The 9-agent suite vs a governed staff-approval layer.' },
  { name: 'Scrutexity vs Booker',  href: '/compare/booker',   blurb: 'All-in-one operating platform vs focused recovery overlay.' },
  { name: 'Scrutexity vs Mindbody', href: '/compare/mindbody', blurb: 'The wellness incumbent vs narrower recovery governance.' },
  { name: 'Scrutexity vs Vagaro',  href: '/compare/vagaro',   blurb: 'Affordable all-in-one vs evidence-backed recovery model.' },
];

function ToneIcon({ tone }: { tone: CellTone }) {
  if (tone === 'win') return <Check size={13} strokeWidth={2.3} className="text-sage-deep mt-[3px] shrink-0" />;
  if (tone === 'minus') return <Minus size={13} strokeWidth={2.3} className="text-clay mt-[3px] shrink-0" />;
  return <span className="w-[13px] h-[13px] mt-[3px] shrink-0 rounded-full border border-sand-deep/45" />;
}

export default function CompareContent() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
            Compare
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-5xl md:text-6xl lg:text-[4.75rem] text-ink tracking-[-0.03em] leading-[1.04] max-w-3xl"
          >
            Built on top.{' '}
            <span className="italic text-sage-deep">Not instead of.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-mist leading-[1.55] font-sans max-w-2xl"
          >
            Most platforms ask you to replace your stack. We ask for a read-only
            token. Keep Boulevard, Mangomint, or Zenoti. Add the layer that
            recovers the inquiries those systems never knew you lost.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-10 pt-8 border-t border-sand-deep/20 max-w-3xl"
          >
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-mist/70 leading-[1.6]"
              style={{ fontFamily: MONO_STACK }}
            >
              THE ONLY READ-ONLY · BAA-GOVERNED · RECOVERY OVERLAY ALONGSIDE BOULEVARD · MANGOMINT · ZENOTI
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 py-20 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-14"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              The product boundary
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Same buyer.{' '}
              <span className="italic text-sage-deep">Different category.</span>
            </h2>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="overflow-x-auto rounded-2xl border border-sand-deep/30 bg-bone"
            style={{ boxShadow: '0 14px 36px -14px rgba(28,24,20,0.08), inset 0 1px 1px rgba(255,255,255,0.6)' }}
          >
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-sand-deep/30">
                  <th
                    className="w-[22%] px-5 py-5 text-[10px] uppercase tracking-[0.18em] text-mist/65 font-normal"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Category
                  </th>
                  <th className="w-[19.5%] border-l border-sand-deep/25 px-5 py-5 align-bottom">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-sage-deep block"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Scrutexity
                    </span>
                    <span className="mt-1 block font-display text-base text-ink">Recovery overlay</span>
                  </th>
                  <th className="w-[19.5%] border-l border-sand-deep/25 px-5 py-5 align-bottom">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Boulevard
                    </span>
                    <span className="mt-1 block font-display text-base text-ink/85">Premium PMS</span>
                  </th>
                  <th className="w-[19.5%] border-l border-sand-deep/25 px-5 py-5 align-bottom">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Mangomint
                    </span>
                    <span className="mt-1 block font-display text-base text-ink/85">Independent spa PMS</span>
                  </th>
                  <th className="w-[19.5%] border-l border-sand-deep/25 px-5 py-5 align-bottom">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-mist/65 block"
                      style={{ fontFamily: MONO_STACK }}
                    >
                      Zenoti
                    </span>
                    <span className="mt-1 block font-display text-base text-ink/85">Enterprise + 9-agent AI</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.category} className="border-b border-sand-deep/15 last:border-b-0 align-top">
                    <th
                      scope="row"
                      className="px-5 py-5 text-sm font-semibold text-ink/85 leading-snug"
                    >
                      {row.category}
                    </th>
                    <td className="border-l border-sand-deep/15 px-5 py-5">
                      <div className="flex gap-2.5">
                        <ToneIcon tone={row.scrutexity.tone} />
                        <span className="text-sm leading-[1.55] text-ink">{row.scrutexity.text}</span>
                      </div>
                    </td>
                    <td className="border-l border-sand-deep/15 px-5 py-5">
                      <div className="flex gap-2.5">
                        <ToneIcon tone={row.boulevard.tone} />
                        <span className="text-sm leading-[1.55] text-mist">{row.boulevard.text}</span>
                      </div>
                    </td>
                    <td className="border-l border-sand-deep/15 px-5 py-5">
                      <div className="flex gap-2.5">
                        <ToneIcon tone={row.mangomint.tone} />
                        <span className="text-sm leading-[1.55] text-mist">{row.mangomint.text}</span>
                      </div>
                    </td>
                    <td className="border-l border-sand-deep/15 px-5 py-5">
                      <div className="flex gap-2.5">
                        <ToneIcon tone={row.zenoti.tone} />
                        <span className="text-sm leading-[1.55] text-mist">{row.zenoti.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p
            className="mt-5 text-[10px] uppercase tracking-[0.14em] text-mist/55"
            style={{ fontFamily: MONO_STACK }}
          >
            Sources: vendor pricing pages and public materials, June 2026 · figures directional, confirm in a quote call
          </p>
        </div>
      </section>

      {/* DIFFERENTIATORS — 3 callouts */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.eyebrow}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-4"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {d.eyebrow}
                </span>
                <h3 className="font-display text-2xl text-ink tracking-[-0.02em] leading-[1.2]">
                  {d.headline}
                </h3>
                <p className="mt-4 text-sm text-mist leading-[1.65]">{d.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP-DIVE LINKS */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Vendor deep dives
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Need it sourced{' '}
              <span className="italic text-sage-deep">side-by-side?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deepDives.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              >
                <Link
                  href={d.href}
                  className="group block rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/40 transition-colors duration-300"
                  style={{ boxShadow: '0 8px 22px -12px rgba(28,24,20,0.07)' }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl text-ink tracking-[-0.01em]">{d.name}</h3>
                    <ArrowRight size={14} className="text-sage-deep transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                  <p className="mt-2 text-sm text-mist leading-[1.55]">{d.blurb}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 md:py-32 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
            The comparison that matters{' '}
            <span className="italic text-sage-deep">is your own demand gap.</span>
          </h2>
          <p className="mt-5 text-mist text-base leading-[1.6] max-w-xl mx-auto">
            Run a read-only scan of the last 30 days of inquiries. You keep the
            report either way. Pilot if it shows a gap worth closing.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <Link
              href="/pilot"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Start 14-Day Pilot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              See pricing
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
