"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { listAudits } from '@/data/claim-audits';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const BADGES: Array<{
  label:
    | 'Audit Completed'
    | 'Claim Library Active'
    | 'Monitored by Scrutexity'
    | 'Audited by Scrutexity'
    | 'Expired — Rescan Required';
  meaning: string;
  cadence: string;
  color: string;
  bg: string;
  border: string;
}> = [
  {
    label: 'Audit Completed',
    meaning:
      'A Claim Audit Report has been run against this domain. Findings and fix recommendations are available for the operator and, in public form, for visitors.',
    cadence: '90-day expiry · rescan to renew',
    color: '#2F5D4A',
    bg: 'rgba(94,122,90,0.10)',
    border: 'rgba(94,122,90,0.35)',
  },
  {
    label: 'Claim Library Active',
    meaning:
      'The operator maintains a versioned claim library — each public claim has a defined source, last-verified date, and evidence pointer. Active means the library is current.',
    cadence: 'Live · last verified date shown on badge',
    color: '#2F5D4A',
    bg: 'rgba(94,122,90,0.10)',
    border: 'rgba(94,122,90,0.35)',
  },
  {
    label: 'Monitored by Scrutexity',
    meaning:
      'Public claim surfaces are scanned on a recurring cadence. Drift between published claims and visible evidence is flagged before a prospect, journalist, or investor finds it first.',
    cadence: 'Weekly or monthly · cadence shown on badge',
    color: '#3D6B7B',
    bg: 'rgba(61,107,123,0.08)',
    border: 'rgba(61,107,123,0.30)',
  },
  {
    label: 'Audited by Scrutexity',
    meaning:
      'A selected recovery workflow is active or in pilot. The operator uses read-only-first recovery workflows with staff approval; healthcare workflows require a BAA before patient-adjacent activation. Individual audit records can be SHA-256 sealed for verification.',
    cadence: 'Live or pilot · sealed record link on badge when available',
    color: '#9C7A1E',
    bg: 'rgba(212,175,55,0.10)',
    border: 'rgba(212,175,55,0.45)',
  },
  {
    label: 'Expired — Rescan Required',
    meaning:
      'A previous Scrutexity audit has aged past 90 days. The badge shifts to expired until the next rescan. Operators see this state too — it is the prompt to schedule.',
    cadence: 'Past 90 days · re-runs reset the clock',
    color: '#8A533B',
    bg: 'rgba(183,137,107,0.10)',
    border: 'rgba(183,137,107,0.40)',
  },
];

const disallowed = [
  '"Verified by Scrutexity" applied to a whole company.',
  '"Compliant," "approved," or "risk-free" as standalone descriptors.',
  '"Clinically approved" — Scrutexity does not opine on clinical matters.',
  '"Endorsed by Scrutexity" or similar endorsement language.',
];

export default function VerifyContent() {
  const audits = listAudits().slice(0, 5);

  return (
    <div className="min-h-screen bg-cream text-ink font-sans">

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <ShieldCheck size={12} />
            Verify · How the badge works
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-5xl md:text-6xl lg:text-[4.75rem] text-ink tracking-[-0.03em] leading-[1.02] max-w-3xl"
          >
            Five badge states.{' '}
            <span className="italic text-sage-deep">Conservative on purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-7 text-base md:text-lg text-mist leading-[1.55] font-sans max-w-2xl"
          >
            Scrutexity badges show the status of an audit, claim library, visibility review, or monitoring relationship. They do not certify a company, guarantee compliance, or replace legal, clinical, or regulatory review.
          </motion.p>
        </div>
      </section>

      {/* BADGE STATES */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-6xl mx-auto">
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
              Badge states
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              What each state means,{' '}
              <span className="italic text-sage-deep">and what expires.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="rounded-2xl bg-bone border border-sand-deep/30 p-6 md:p-7"
                style={{
                  boxShadow:
                    '0 12px 32px -14px rgba(28,24,20,0.07), inset 0 1px 1px rgba(255,255,255,0.6)',
                }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.16em] font-semibold"
                  style={{
                    background: b.bg,
                    borderColor: b.border,
                    color: b.color,
                    fontFamily: MONO_STACK,
                  }}
                >
                  <ShieldCheck size={11} />
                  {b.label}
                </span>
                <p className="mt-5 text-sm text-ink/85 leading-[1.65]">{b.meaning}</p>
                <p
                  className="mt-4 text-[10px] uppercase tracking-[0.14em] text-mist/65"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {b.cadence}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT BADGES DO NOT SAY */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            What badges do not say
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.1]">
            Conservative by{' '}
            <span className="italic text-sage-deep">design.</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-2xl">
            Operators sometimes ask for stronger language. We do not provide it,
            because the badge would lose its meaning. Four phrasings we will not
            apply to a Scrutexity badge:
          </p>
          <ul className="mt-8 space-y-3">
            {disallowed.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-2 w-1 h-1 rounded-full bg-clay-deep shrink-0" />
                <span className="text-sm text-ink/85 leading-[1.65]">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PUBLIC AUDIT INDEX */}
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
              Public audit archetypes
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              Five archetype audits{' '}
              <span className="italic text-sage-deep">you can read.</span>
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl">
              Composite archetypes, not specific companies. Each demonstrates
              the report format and the four-question framework against a
              different category of public claim.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audits.map((a, i) => (
              <motion.div
                key={a.publicId}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                <Link
                  href={`/claim-audit/${a.publicId}`}
                  className="group block rounded-xl border border-sand-deep/30 bg-bone p-5 hover:border-sage-deep/40 transition-colors duration-300"
                  style={{ boxShadow: '0 8px 22px -12px rgba(28,24,20,0.07)' }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl text-ink tracking-[-0.01em] leading-snug">
                      {a.companyType}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-sage-deep transition-transform group-hover:translate-x-0.5 shrink-0"
                    />
                  </div>
                  <p
                    className="mt-3 text-[10px] uppercase tracking-[0.14em] text-mist/65 inline-flex items-center gap-3"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    <span>Risk · {a.riskScore}/100</span>
                    <span className="opacity-50">·</span>
                    <span>Sealed {a.auditDate}</span>
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 md:py-32 border-t border-sand-deep/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-ink tracking-[-0.02em] leading-[1.05]">
            Claims change.{' '}
            <span className="italic text-sage-deep">Run a rescan.</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl mx-auto">
            The 90-day expiry is on purpose. It forces a cadence — and the
            cadence is the point.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <Link
              href="/claim-audit"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Run AuditGPT
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/proof"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              View Proof Artifacts
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
