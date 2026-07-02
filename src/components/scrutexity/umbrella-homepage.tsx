"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  FileText,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sparkles,
  RadioTower,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/utils/analytics';
import { WebsiteXRay } from '@/components/artifacts';
import { OperatingSystemDiagram } from './operating-system-diagram';
import { ENFORCEMENT_TRACKER, ENFORCEMENT_TRACKER_LAST_REVIEWED } from '@/data/enforcement-tracker';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Data ─────────────────────────────────────────────────── */


const VERTICALS = [
  { name: 'Med Spas', copy: 'Claim-safe treatment content for aggressive aesthetic and outcome language.' },
  { name: 'Medical Weight Loss', copy: 'GLP-1, compounded medication, testimonial, and outcome-claim review.' },
  { name: 'Urgent Care', copy: 'Accurate service messaging and public claim support.' },
  { name: 'Wellness & Spa', copy: 'Content and proof mapping that does not overpromise results.' },
];

const HERO_MODES = [
  {
    id: 'claim-audit',
    label: 'Claim Audit',
    title: 'Claim Intelligence Run',
    metric: ['34', '18', '7'],
    metricLabel: ['Claims', 'Proof', 'Risks'],
    findings: [
      { label: 'Unsupported claim', value: 'Needs proof', tone: 'clay', Icon: AlertTriangle },
      { label: 'Claim drift', value: 'Language mismatch', tone: 'sage', Icon: Search },
      { label: 'Owner brief', value: 'Priority plan ready', tone: 'ink', Icon: FileText },
    ],
    artifacts: [
      { title: 'Claim Audit Receipt', meta: '34 claims scanned', status: '7 require evidence' },
      { title: 'Risk Map', meta: 'Policy + proof review', status: '3 high priority fixes' },
      { title: '30-Day Plan', meta: 'Activation sequence', status: 'Ready to assign' },
    ],
  },
] as const;

type HeroModeId = (typeof HERO_MODES)[number]['id'];

type ArtifactPreview = {
  title: string;
  meta: string;
  status: string;
};

const BEFORE_AFTER = [
  {
    label: 'Before Scrutexity',
    tone: 'before',
    points: ['Claims scattered across pages', 'AI answers describe you inconsistently', 'Proof is buried in folders', 'Agent behavior is reviewed after launch'],
  },
  {
    label: 'After Scrutexity',
    tone: 'after',
    points: ['Claims mapped to evidence', 'AI visibility monitored by surface', 'Proof artifacts ready for buyers', 'Agent transcripts tied to guardrail fixes'],
  },
];


/* ── Component ────────────────────────────────────────────── */


export default function UmbrellaHomepage() {
  const [activeMode, setActiveMode] = useState<HeroModeId>('claim-audit');
  const [activeArtifact, setActiveArtifact] = useState<ArtifactPreview | null>(null);
  const heroMode = HERO_MODES.find((mode) => mode.id === activeMode) ?? HERO_MODES[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Scrutexity',
        url: 'https://www.scrutexity.com',
        description:
          'Scrutexity tracks enforcement patterns in claim-sensitive markets. AuditGPT reviews public marketing language against cited claim patterns and produces safer rewrites.',
      },
      {
        '@type': 'WebSite',
        name: 'Scrutexity',
        url: 'https://www.scrutexity.com',
        description:
          'Enforcement intelligence for public claims in claim-sensitive markets.',
        publisher: { '@type': 'Organization', name: 'Scrutexity' },
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-cream text-bark font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EvidenceSpine />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative px-5 pt-28 pb-16 md:px-6 md:pt-40 md:pb-28 overflow-hidden bg-cream-deep">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(94,122,90,0.07)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(92,70,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-24 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-sage-deep/35 to-transparent"
            animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] gap-14 lg:gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
                style={{ fontFamily: MONO_STACK }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sage-deep opacity-40 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
                </span>
                Scrutexity · Claim Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
                className="mt-5 font-display text-4xl md:text-6xl lg:text-[4.65rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl flex flex-wrap items-center gap-x-2"
              >
                <span>Claim intelligence</span>
                <span className="italic text-sage-deep">for the AI-generated internet.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
                className="mt-6 text-base md:text-lg text-mist leading-[1.62] max-w-2xl"
              >
                Scrutexity tracks enforcement patterns, public claims, and AI answer distortions
                for high-trust businesses. AuditGPT turns that intelligence into dated review
                receipts with safer rewrites.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
                className="mt-3.5 flex flex-wrap gap-1.5"
              >
                {['Enforcement tracking', 'AI distortion detection', 'Dated review records'].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-sand-deep/30 bg-bone/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-sage-deep/90"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    <ShieldCheck size={10} />
                    {label}
                  </span>
                ))}\n              </motion.div>\n\n              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.26 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="https://auditgpt.ai/snapshot?source=scrutexity-home"
                  onClick={() =>
                    trackEvent('cta_click', {
                      cta_label: 'Request a Claim Exposure Audit',
                      destination: 'https://auditgpt.ai/snapshot?source=scrutexity-home',
                      section: 'hero',
                    })
                  }
                  className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
                  style={{ boxShadow: '0 18px 40px -20px rgba(94,122,90,0.8)' }}
                >
                  Request a Claim Exposure Audit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/tracker"
                  onClick={() =>
                    trackEvent('cta_click', {
                      cta_label: 'View the Enforcement Tracker',
                      destination: '/tracker',
                      section: 'hero',
                    })
                  }
                  className="group px-7 py-4 bg-bone/80 hover:bg-cream border border-sand-deep/45 text-espresso font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  View the Enforcement Tracker
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <MobileHeroArtifact mode={heroMode} onOpenArtifact={setActiveArtifact} />
            </div>

            <div className="hidden lg:block">
              <HeroArtifactCockpit mode={heroMode} onOpenArtifact={setActiveArtifact} />
            </div>
          </div>

        </div>
      </section>

      {/* ══ TRUST STRIP ══════════════════════════════════════════════ */}
      <section aria-label="What this is and is not" className="border-y border-sand-deep/15 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
            {[
              { label: 'Public sources only', Icon: Eye },
              { label: 'No legal or clinical advice', Icon: RefreshCw },
              { label: 'Dated review record', Icon: FileText },
            ].map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-bark"
                style={{ fontFamily: MONO_STACK }}
              >
                <Icon size={14} className="text-sage-deep" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ WEBSITE X-RAY (signature artifact) ═══════════════════════ */}
      <WebsiteXRay />

      {/* ══ MIRROR AUDIT ═════════════════════════════════════════════ */}

      {/* ══ POSITION STATEMENT ════════════════════════════════════════ */}
      <section className="relative px-6 py-24 bg-cream border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
                style={{ fontFamily: MONO_STACK }}
              >
                Parent Company / Product
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
                Scrutexity tracks the patterns.{' '}
                <span className="italic text-sage-deep">AuditGPT reviews your language against them.</span>
              </h2>
              <p className="mt-5 text-base text-mist leading-[1.6]">
                Scrutexity is not an agency, and it is not a generic AI audit tool. It maintains a
                source-linked record of the claim patterns regulators are already citing in
                claim-sensitive markets.
              </p>
              <p className="mt-4 text-sm text-mist/80 leading-[1.6]">
                AuditGPT is the response product. It compares your public marketing language against
                the patterns Scrutexity tracks, and returns safer rewrites with a dated review record.
              </p>
            </div>

            <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8 shadow-xs">
              <span
                className="text-[10px] uppercase tracking-[0.14em] text-mist/60 font-mono block mb-6"
                style={{ fontFamily: MONO_STACK }}
              >
                Scrutexity vs AuditGPT — the distinction
              </span>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-0.5 self-stretch bg-espresso rounded-full shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-lg text-espresso mb-1">Scrutexity</p>
                    <p className="text-sm text-mist leading-[1.55]">
                      Enforcement intelligence. Tracks public claim patterns regulators are citing,
                      source-linked, updated as new actions are published.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-0.5 self-stretch bg-sage-deep rounded-full shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-lg text-espresso mb-1">AuditGPT</p>
                    <p className="text-sm text-mist leading-[1.55]">
                      The response product. Reviews your public page against the patterns Scrutexity
                      tracks and returns safer rewrites with a dated record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE OPERATING SYSTEM (signature diagram) ═════════════════ */}
      <section id="system" className="relative px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-bone">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              The Infrastructure
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Four moves.{' '}
              <span className="italic text-sage-deep">One operating layer.</span>
            </h2>
            <p className="mt-4 text-base text-mist leading-[1.6] max-w-2xl">
              Find what is unsupported. Fix it with governed content. Monitor how AI describes you.
              Prove it with a claim evidence trail. Everything beneath these four moves is implementation.
            </p>
          </div>

          {/* Simplified mental model — the thing a first-time visitor remembers */}
          <div className="mb-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              { n: '01', word: 'Find', sub: 'what is unsupported' },
              { n: '02', word: 'Fix', sub: 'with governed content' },
              { n: '03', word: 'Monitor', sub: 'how AI describes you' },
              { n: '04', word: 'Prove', sub: 'with claim evidence' },
            ].map((step, i, arr) => (
              <div key={step.word} className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                  className="flex min-w-[150px] flex-col items-center rounded-2xl border border-sand-deep/35 bg-bone px-6 py-4 text-center shadow-[0_1px_2px_rgba(28,24,20,0.04)]"
                >
                  <span className="text-[10px] tracking-[0.22em] text-sage-deep" style={{ fontFamily: MONO_STACK }}>
                    {step.n}
                  </span>
                  <span className="mt-1 font-display text-2xl text-espresso">{step.word}</span>
                  <span className="mt-1 text-[11px] text-mist">{step.sub}</span>
                </motion.div>
                {i < arr.length - 1 && (
                  <ArrowRight size={18} className="shrink-0 text-sage-deep/45" />
                )}
              </div>
            ))}
          </div>

          {/* The canonical Scrutexity Operating System diagram */}
          <div className="relative overflow-hidden rounded-3xl border border-sand-deep/30 bg-gradient-to-b from-cream to-bone p-6 md:p-12 shadow-[0_30px_80px_-55px_rgba(28,24,20,0.45)]">
            <div className="absolute inset-0 pointer-events-none opacity-[0.5] [background-image:linear-gradient(rgba(92,70,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sage/10 to-transparent blur-2xl"
              animate={{ y: ['-20%', '320%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            />
            <OperatingSystemDiagram className="relative z-10 mx-auto max-w-[640px]" />
          </div>
        </div>
      </section>

      {/* ══ BEFORE / AFTER ARTIFACTS ═════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-espresso text-cream" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25 [background-image:linear-gradient(rgba(248,243,234,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,234,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -top-24 left-1/2 h-64 w-[70vw] -translate-x-1/2 rounded-full bg-sage-deep/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-soft block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Artifact Transformation
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-cream tracking-[-0.02em] leading-[1.1]">
              From scattered claims to{' '}
              <span className="italic text-sage-soft">operating proof.</span>
            </h2>
            <p className="mt-4 text-base text-cream/68 leading-[1.6] max-w-2xl">
              Scans, receipts, briefs, maps, and workflows make the infrastructure visible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            {BEFORE_AFTER.map((column, index) => (
              <motion.div
                key={column.label}
                initial={{ opacity: 0, x: index === 0 ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
                className={`rounded-3xl border p-6 md:p-7 ${
                  column.tone === 'before'
                    ? 'border-clay/25 bg-cream/5'
                    : 'border-sage-soft/30 bg-sage-soft/10'
                }`}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-cream">{column.label}</h3>
                  <span
                    className={`rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.14em] ${
                      column.tone === 'before'
                        ? 'border-clay/30 text-clay'
                        : 'border-sage-soft/35 text-sage-soft'
                    }`}
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {column.tone === 'before' ? 'Unmapped' : 'Governed'}
                  </span>
                </div>
                <div className="space-y-3">
                  {column.points.map((point, i) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-cream/[0.035] p-4"
                    >
                      <span
                        className={`mt-1 h-2 w-2 rounded-full ${
                          column.tone === 'before' ? 'bg-clay' : 'bg-sage-soft'
                        }`}
                      />
                      <p className="text-sm leading-relaxed text-cream/76">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="hidden items-center justify-center lg:flex">
              <motion.div
                className="relative flex h-full min-h-[280px] w-16 items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
              >
                <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sage-soft/40 to-transparent" />
                <motion.div
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-sage-soft/30 bg-sage-soft/15 text-sage-soft"
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles size={18} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOUNDER'S THESIS ════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 bg-cream-deep border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-start">
            <div className="w-16 h-16 rounded-full bg-espresso flex items-center justify-center text-cream font-display text-2xl shrink-0 mx-auto lg:mx-0">
              N
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4" style={{ fontFamily: MONO_STACK }}>
                <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep font-semibold">Founder&apos;s Thesis</span>
              </div>
              <blockquote className="font-display text-2xl md:text-3xl text-espresso leading-[1.25] tracking-[-0.01em]">
                &ldquo;Generative AI fundamentally changed how businesses are described, discovered, and trusted. Yet most organizations still manage their public claims with documents, marketing teams, and disconnected workflows. Scrutexity was built as the operating layer that connects every public claim to evidence, every published statement to governance, and every customer interaction to verifiable proof. Trust should not depend on memory&mdash;it should be infrastructure.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-px h-10 bg-sand-deep/40" />
                <div>
                  <p className="font-sans text-sm font-semibold text-espresso">Nick Altstein</p>
                  <p className="text-xs text-mist" style={{ fontFamily: MONO_STACK }}>Systems Architect · Scrutexity</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/thesis" className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-sage-deep hover:text-espresso transition-colors duration-300">
                  Read the full thesis
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Pull quotes — the phrases people remember */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['Trust should not depend on memory.', 'Evidence beats marketing.', 'Claims become infrastructure.'].map((q, i) => (
                  <motion.blockquote
                    key={q}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                    className="rounded-2xl border border-sand-deep/30 bg-bone/70 p-5"
                  >
                    <span className="block font-display text-lg text-espresso leading-snug">&ldquo;{q}&rdquo;</span>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY THIS MATTERS NOW ═══════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-cream" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5" style={{ fontFamily: MONO_STACK }}>
            Why This Matters Now
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1] max-w-3xl">
            FDA has issued multiple waves of GLP-1 marketing warning letters since 2025.
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-2xl">
            The recurring issue: public claims that may imply FDA approval, clinical proof,
            generic/equivalent status, or unsupported safety or efficacy — starting in September 2025,
            with further waves in March 2026 and mid-June 2026.
          </p>
          <p className="mt-3 text-xs text-mist/60 font-mono">Last reviewed: {ENFORCEMENT_TRACKER_LAST_REVIEWED}.</p>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl text-espresso mb-4">What Scrutexity tracks</h3>
              <div className="overflow-x-auto rounded-2xl border border-sand-deep/30 bg-bone">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left border-b border-sand-deep/25 text-[9px] uppercase tracking-[0.1em] text-mist/70 font-mono">
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Claim pattern</th>
                      <th className="py-3 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENFORCEMENT_TRACKER.filter((e) => e.sourceUrl !== 'TODO_SOURCE').map((e) => (
                      <tr key={e.company} className="border-b border-sand-deep/15 align-top">
                        <td className="py-3 px-4 font-semibold text-espresso">{e.company}</td>
                        <td className="py-3 px-4 text-mist whitespace-nowrap">{e.date}</td>
                        <td className="py-3 px-4 text-mist">{e.pattern}</td>
                        <td className="py-3 px-4">
                          <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sage-deep underline underline-offset-2">FDA</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/tracker" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-sage-deep hover:text-espresso" style={{ fontFamily: MONO_STACK }}>
                View the full Enforcement Tracker <ArrowRight size={12} />
              </Link>
            </div>

            <div>
              <h3 className="font-display text-2xl text-espresso mb-4">What AuditGPT delivers</h3>
              <ul className="space-y-3">
                {[
                  'Review of one public GLP-1 / health-claim landing page',
                  'Comparison against current FDA-cited claim patterns',
                  'Flagged phrases with page context',
                  'Safer replacement language',
                  'Dated review record',
                  '72-hour turnaround',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-bark">
                    <CheckCircle2 size={14} className="text-sage-deep mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Offer card */}
          <div className="mt-16 rounded-2xl border border-espresso/20 bg-espresso text-cream p-8 md:p-10">
            <span className="text-[10px] uppercase tracking-[0.18em] text-sage-soft block mb-3" style={{ fontFamily: MONO_STACK }}>Offer</span>
            <h3 className="font-display text-3xl md:text-4xl mb-2">Claim Exposure Audit</h3>
            <p className="text-cream/80 mb-1">$497 — one public page, every claim on it. Delivered in 72 hours. Credits toward Guardian.</p>
            <ul className="mt-6 space-y-2 mb-8">
              {[
                'Every claim on the page extracted and scored',
                'Comparison against current FDA-cited claim patterns',
                'Flagged phrases with page context',
                'Safer replacement language per claim',
                'AI Distortion Snapshot across major AI surfaces',
                'Dated review record',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-cream/85">
                  <CheckCircle2 size={14} className="text-sage-soft mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="text-xs text-cream/60 mb-8 max-w-xl leading-relaxed">
              Scrutexity does not provide legal, clinical, regulatory, ranking, or revenue advice.
              Reviews are based on public claim-language patterns and source-linked enforcement materials.
            </p>
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-offer-card"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-sage-deep hover:bg-cream hover:text-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm"
            >
              Request a Claim Exposure Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Data feed teaser */}
          <div className="mt-10 rounded-2xl border border-sand-deep/30 bg-bone p-8">
            <h3 className="font-display text-xl text-espresso mb-2">Enforcement Data Feed</h3>
            <p className="text-sm text-mist leading-relaxed max-w-xl mb-4">
              Scrutexity is building a structured feed of enforcement letters and claim patterns for
              regulatory teams, agencies, compliance consultants, and health-market operators.
              Spreadsheet access available for early partners.
            </p>
            <a
              href="mailto:nick@scrutexity.com?subject=Enforcement%20Data%20Feed%20Access"
              className="text-sm font-semibold text-sage-deep hover:text-espresso underline underline-offset-2"
            >
              Ask about feed access
            </a>
          </div>
        </div>
      </section>

      {/* ══ MEDICAL & WELLNESS VERTICAL ═══════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-cream-deep" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Primary Use Case Vertical
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
              Built for operators where{' '}
              <span className="italic text-sage-deep">claim language matters.</span>
            </h2>
            <p className="mt-4 text-base text-mist leading-[1.6] max-w-2xl">
              Medical, wellness, and high-trust local businesses face the exact Scrutexity problem:
              sensitive claims, aggressive outcome language, reputation risk, and AI answer drift.
              Scrutexity Infrastructure was built for them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VERTICALS.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                className="rounded-xl border border-sand-deep/30 bg-bone p-6"
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-sage-deep block mb-3"
                  style={{ fontFamily: MONO_STACK }}
                >
                  0{i + 1} · vertical
                </span>
                <h3 className="font-display text-xl text-espresso mb-3">{v.name}</h3>
                <p className="text-xs text-mist leading-[1.65]">{v.copy}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/medical-wellness"
              className="group px-6 py-3 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              Explore Medical &amp; Wellness
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════ */}
      <section className="px-6 py-32 md:py-44 border-t border-sand-deep/15 bg-cream" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Send Your Page
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-espresso tracking-[-0.02em] leading-[1.05]">
            Send your page.{' '}
            <span className="italic text-sage-deep">Get the review in 72 hours.</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl mx-auto">
            AuditGPT compares your public GLP-1 or health-claim page against the patterns Scrutexity
            tracks, and returns safer rewrites with a dated review record.
          </p>

          {/* What's generated — durable artifacts, not dashboard views */}
          <div className="mt-12">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO_STACK }}>
              What you receive
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {['claim_review.pdf', 'risk_map.json', 'rewrite_exhibit.md', 'dated_review_record.pdf'].map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sand-deep/30 bg-bone/70 px-2.5 py-1 text-[10px] text-bark"
                  style={{ fontFamily: MONO_STACK }}
                >
                  <FileText size={11} className="text-sage-deep" />
                  {name}
                </span>
              ))}
            </div>
          </div>

          <OwnerBriefPreview onOpenArtifact={setActiveArtifact} />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="https://auditgpt.ai/snapshot?source=scrutexity-home"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'Request a Claim Exposure Audit — Bottom',
                  destination: 'https://auditgpt.ai/snapshot?source=scrutexity-home',
                  section: 'bottom-cta',
                })
              }
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Request a Claim Exposure Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tracker"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'View the Enforcement Tracker — Bottom',
                  destination: '/tracker',
                  section: 'bottom-cta',
                })
              }
              className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              View the Enforcement Tracker
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
      <ArtifactPreviewModal artifact={activeArtifact} onClose={() => setActiveArtifact(null)} />
    </div>
  );
}

function EvidenceSpine() {
  return (
    <div className="pointer-events-none fixed left-4 top-24 bottom-10 z-40 hidden w-px lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sage-deep/25 to-transparent" />
      <motion.div
        className="absolute left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sage-deep to-transparent"
        animate={{ top: ['0%', '82%', '0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-sage-deep bg-cream shadow-[0_0_24px_rgba(94,122,90,0.55)]"
        animate={{ top: ['2%', '84%', '2%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function HeroModeTabs({
  activeMode,
  onChange,
}: {
  activeMode: HeroModeId;
  onChange: (mode: HeroModeId) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
      className="mt-7 inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-sand-deep/35 bg-bone/80 p-1.5 backdrop-blur"
    >
      {HERO_MODES.map((mode) => {
        const active = mode.id === activeMode;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onChange(mode.id)}
            className={`relative rounded-xl px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-4 ${
              active ? 'text-cream' : 'text-mist hover:text-espresso'
            }`}
            style={{ fontFamily: MONO_STACK }}
          >
            {active && (
              <motion.span
                layoutId="hero-mode-pill"
                className="absolute inset-0 rounded-xl bg-sage-deep"
                transition={{ duration: 0.35, ease: EASE }}
              />
            )}
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

function MobileHeroArtifact({
  mode,
  onOpenArtifact,
}: {
  mode: (typeof HERO_MODES)[number];
  onOpenArtifact: (artifact: ArtifactPreview) => void;
}) {
  const artifact = mode.artifacts[0];

  return (
    <motion.button
      type="button"
      data-testid="mobile-hero-artifact"
      onClick={() => onOpenArtifact(artifact)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
      className="mt-8 block w-full rounded-2xl border border-sand-deep/35 bg-bone p-4 text-left shadow-[0_20px_45px_-35px_rgba(28,24,20,0.45)] lg:hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className="text-[9px] uppercase tracking-[0.14em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            {mode.label} artifact
          </span>
          <p className="mt-2 font-display text-xl text-espresso">{artifact.title}</p>
          <p className="mt-1 text-sm text-mist">{artifact.meta}</p>
        </div>
        <FileText size={18} className="shrink-0 text-sage-deep" />
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sand-deep/35">
        <motion.div
          className="h-full rounded-full bg-sage-deep"
          animate={{ width: ['30%', '88%', '52%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.button>
  );
}

function HeroArtifactCockpit({
  mode,
  onOpenArtifact,
}: {
  mode: (typeof HERO_MODES)[number];
  onOpenArtifact: (artifact: ArtifactPreview) => void;
}) {
  return (
    <motion.div
      key={mode.id}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[2.4rem] bg-[radial-gradient(60%_55%_at_50%_12%,rgba(143,169,138,0.18),transparent_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        className="absolute -inset-5 rounded-[2rem] bg-sage/15 blur-3xl"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.96, 1.02, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-sand-deep/45 bg-cream/88 p-4 shadow-[0_35px_90px_-45px_rgba(28,24,20,0.55)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-sand-deep/25 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-clay" />
            <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
            <span className="h-2.5 w-2.5 rounded-full bg-sage-deep" />
          </div>
          <span
            className="rounded-full border border-sage/30 bg-sage/10 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            {mode.label} Layer
          </span>
        </div>

        <div className="grid gap-4 pt-5 md:grid-cols-[1fr_0.78fr]">
          <div className="space-y-3">
            <div className="rounded-2xl border border-sand-deep/30 bg-bone p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-[6px]">
                    <Image src="/logo-shield.png" alt="" width={32} height={32} className="h-[27px] w-[27px] object-contain flex-shrink-0" />
                    <span className="font-semibold text-[14px] tracking-[-0.01em] text-espresso whitespace-nowrap leading-none pt-0.5">AuditGPT</span>
                  </div>
                  <p className="mt-1.5 text-xs text-mist font-medium">{mode.title}</p>
                </div>
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-deep text-cream"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ShieldCheck size={18} />
                </motion.div>
              </div>
              <div className="space-y-3">
                {mode.findings.map((finding, index) => {
                  const Icon = finding.Icon;
                  const toneClass =
                    finding.tone === 'clay'
                      ? 'bg-clay/10 text-clay-deep border-clay/25'
                      : finding.tone === 'sage'
                        ? 'bg-sage/10 text-sage-deep border-sage/25'
                        : 'bg-espresso/5 text-espresso border-espresso/10';

                  return (
                    <motion.div
                      key={finding.label}
                      className={`flex items-center gap-3 rounded-xl border p-3 ${toneClass}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.38 + index * 0.1 }}
                    >
                      <Icon size={15} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-espresso">{finding.label}</p>
                        <p className="text-[10px] uppercase tracking-[0.12em] opacity-75" style={{ fontFamily: MONO_STACK }}>
                          {finding.value}
                        </p>
                      </div>
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-current"
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.25 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {mode.metricLabel.map((metric, index) => (
                <div key={metric} className="rounded-xl border border-sand-deep/25 bg-bone/80 p-3">
                  <p className="font-display text-xl text-espresso">{mode.metric[index]}</p>
                  <p className="text-[9px] uppercase tracking-[0.13em] text-mist" style={{ fontFamily: MONO_STACK }}>
                    {metric}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-sand-deep/30 bg-espresso p-4 text-cream shadow-[inset_0_1px_0_rgba(248,243,234,0.06),inset_0_-34px_64px_-34px_rgba(143,169,138,0.20)]">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(248,243,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(248,243,234,0.1)_1px,transparent_1px)] [background-size:26px_26px]" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-sage-soft/12 to-transparent blur-md motion-reduce:hidden"
              animate={{ x: ['0%', '420%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.14em] text-cream/55" style={{ fontFamily: MONO_STACK }}>
                Artifacts
              </span>
              <RadioTower size={15} className="text-sage-soft" />
            </div>
            <div className="relative z-10 mt-5 space-y-3">
              {mode.artifacts.map((artifact, index) => (
                <motion.div
                  key={artifact.title}
                  role="button"
                  tabIndex={0}
                  data-testid={`hero-artifact-${index}`}
                  onClick={() => onOpenArtifact(artifact)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenArtifact(artifact);
                    }
                  }}
                  className="cursor-pointer rounded-2xl border border-cream/10 bg-cream/[0.055] p-4 backdrop-blur transition-colors hover:border-sage-soft/40 hover:bg-cream/[0.08]"
                  animate={{ y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                  transition={{ duration: 3.4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-cream">{artifact.title}</p>
                      <p className="mt-1 text-xs text-cream/52">{artifact.meta}</p>
                    </div>
                    <FileText size={15} className="shrink-0 text-sage-soft" />
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      className="h-full rounded-full bg-sage-soft"
                      animate={{ width: ['24%', '86%', '54%'] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
                    />
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-sage-soft" style={{ fontFamily: MONO_STACK }}>
                    {artifact.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemSignalStrip({ activeMode }: { activeMode: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-sand-deep/30 bg-bone/70 px-4 py-3 backdrop-blur">
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-sage/20 to-transparent"
        animate={{ x: ['-100%', '850%'] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative flex flex-wrap items-center gap-2 md:justify-between">
        <span
          className="mr-2 rounded-full border border-sage/25 bg-sage/10 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-sage-deep"
          style={{ fontFamily: MONO_STACK }}
        >
          {activeMode}
        </span>
        {['Claim Scan', 'AI Answer Reality', 'Proof Map', 'Guardrail Audit', 'Owner Brief'].map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sage/25 bg-sage/10 text-[10px] font-semibold text-sage-deep">
              {index + 1}
            </span>
            <span className="text-[10px] uppercase tracking-[0.13em] text-mist" style={{ fontFamily: MONO_STACK }}>
              {step}
            </span>
            {index < 4 && <ArrowRight size={13} className="hidden text-sand-deep md:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function OwnerBriefPreview({ onOpenArtifact }: { onOpenArtifact: (artifact: ArtifactPreview) => void }) {
  const artifact = {
    title: 'Owner Brief',
    meta: 'Generated from AuditGPT findings',
    status: 'Claim risk, visibility gap, and guardrail path ready',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: EASE }}
      role="button"
      tabIndex={0}
      data-testid="owner-brief-preview"
      onClick={() => onOpenArtifact(artifact)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenArtifact(artifact);
        }
      }}
      className="mx-auto mt-10 max-w-2xl cursor-pointer overflow-hidden rounded-3xl border border-sand-deep/35 bg-bone text-left shadow-[0_25px_70px_-52px_rgba(28,24,20,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-sage-deep/35"
    >
      <div className="flex items-center justify-between border-b border-sand-deep/25 px-5 py-4">
        <div>
          <p className="font-display text-xl text-espresso">Owner Brief</p>
          <p className="text-xs text-mist">Generated from AuditGPT findings</p>
        </div>
        <span className="rounded-full border border-sage/30 bg-sage/10 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO_STACK }}>
          Ready
        </span>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        {['Claim risk', 'Visibility gap', 'Guardrail path'].map((item, index) => (
          <div key={item} className="rounded-2xl border border-sand-deep/25 bg-cream p-4">
            <p className="text-[9px] uppercase tracking-[0.13em] text-mist" style={{ fontFamily: MONO_STACK }}>
              0{index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold text-espresso">{item}</p>
            <motion.div className="mt-4 h-1.5 rounded-full bg-sand-deep/35">
              <motion.div
                className="h-full rounded-full bg-sage-deep"
                initial={{ width: '18%' }}
                whileInView={{ width: `${58 + index * 12}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ArtifactPreviewModal({
  artifact,
  onClose,
}: {
  artifact: ArtifactPreview | null;
  onClose: () => void;
}) {
  if (!artifact) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/72 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${artifact.title} preview`}
        className="relative max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-sand-deep/45 bg-cream shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artifact preview"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-sand-deep/40 bg-bone text-espresso transition-colors hover:bg-sand"
        >
          <X size={16} />
        </button>

        <div className="border-b border-sand-deep/30 bg-bone px-6 py-5">
          <span
            className="text-[10px] uppercase tracking-[0.16em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            Scrutexity artifact preview
          </span>
          <h3 className="mt-2 font-display text-3xl text-espresso">{artifact.title}</h3>
          <p className="mt-1 text-sm text-mist">{artifact.meta}</p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-sand-deep/30 bg-espresso p-5 text-cream">
            <div className="mb-6 flex items-center justify-between">
              <span
                className="text-[9px] uppercase tracking-[0.14em] text-cream/55"
                style={{ fontFamily: MONO_STACK }}
              >
                Status
              </span>
              <span className="h-2 w-2 rounded-full bg-sage-soft" />
            </div>
            <p className="font-display text-2xl leading-tight text-cream">{artifact.status}</p>
            <div className="mt-7 space-y-3">
              {['Evidence attached', 'Buyer-facing language cleaned', 'Next action assigned'].map((row, index) => (
                <motion.div
                  key={row}
                  className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.045] p-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 + index * 0.08 }}
                >
                  <CheckCircle2 size={14} className="text-sage-soft" />
                  <span className="text-sm text-cream/72">{row}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-sand-deep/30 bg-bone p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-xl text-espresso">Report extract</p>
              <FileText size={16} className="text-sage-deep" />
            </div>
            <div className="space-y-4">
              {[
                ['Claim', '“Best-in-class AI support” requires proof or safer framing.'],
                ['Evidence', 'Attach review data, transcript receipts, and operator notes.'],
                ['Action', 'Rewrite hero claim, add proof block, route guardrail fix.'],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.16 + index * 0.08 }}
                  className="rounded-xl border border-sand-deep/25 bg-cream p-4"
                >
                  <p
                    className="text-[9px] uppercase tracking-[0.14em] text-sage-deep"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bark">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
