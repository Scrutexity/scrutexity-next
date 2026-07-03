"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Search,
  RadioTower,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/utils/analytics';
import { WebsiteXRay } from '@/components/artifacts';
import { ProcessFlowChart } from '@/components/process-flow-chart';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Data ─────────────────────────────────────────────────── */


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

type ArtifactPreview = {
  title: string;
  meta: string;
  status: string;
};

/* ── Component ────────────────────────────────────────────── */


export default function UmbrellaHomepage() {
  const [activeArtifact, setActiveArtifact] = useState<ArtifactPreview | null>(null);
  const heroMode = HERO_MODES[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Scrutexity',
        url: 'https://www.scrutexity.com',
        description:
          'Scrutexity is the claim-risk bureau behind AuditGPT, maintaining public claim records, review receipts, and verification artifacts for high-trust businesses.',
      },
      {
        '@type': 'WebSite',
        name: 'Scrutexity',
        url: 'https://www.scrutexity.com',
        description:
          'Claim intelligence infrastructure for public trust.',
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
      <section className="relative px-5 pt-28 pb-16 md:px-6 md:pt-40 md:pb-28 overflow-hidden bg-cream">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-sand-deep/30" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-sand-deep/20" />
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
                Scrutexity · Claim-Risk Bureau
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
                className="mt-5 font-display text-4xl md:text-6xl lg:text-[4.65rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl flex flex-wrap items-center gap-x-2"
              >
                <span>Claim intelligence</span>
                <span className="italic text-sage-deep">for public trust.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
                className="mt-6 text-base md:text-lg text-mist leading-[1.62] max-w-2xl"
              >
                Scrutexity helps high-trust businesses review public claims, visible proof,
                and AI answer risk so they can see what is supported, what is overstated,
                and what needs safer wording.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
                className="mt-3.5 flex flex-wrap gap-1.5"
              >
                {['Public claim records', 'Evidence mapping', 'Dated review receipts'].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full border border-sand-deep/30 bg-bone/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-sage-deep/90"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    <ShieldCheck size={10} />
                    {label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.26 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="https://auditgpt.ai/snapshot?source=scrutexity-home"
                  onClick={() =>
                    trackEvent('cta_click', {
                      cta_label: 'Run AuditGPT Scan',
                      destination: 'https://auditgpt.ai/snapshot?source=scrutexity-home',
                      section: 'hero',
                    })
                  }
                  className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
                  style={{ boxShadow: '0 18px 40px -20px rgba(94,122,90,0.8)' }}
                >
                  Run AuditGPT Scan
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/methodology"
                  onClick={() =>
                    trackEvent('cta_click', {
                      cta_label: 'View Methodology',
                      destination: '/methodology',
                      section: 'hero',
                    })
                  }
                  className="group px-7 py-4 bg-bone/80 hover:bg-cream border border-sand-deep/45 text-espresso font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  View Methodology
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
              { label: 'No legal, medical, or regulatory advice', Icon: RefreshCw },
              { label: 'Dated review records', Icon: FileText },
              { label: 'Validation slot reserved for named partners', Icon: ShieldCheck },
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

      {/* ══ PROCESS FLOW ════════════════════════════════════════════ */}
      <section className="border-t border-sand-deep/15 bg-bone/50 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage-deep/20 bg-sage-deep/8 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-sage-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
              The Pipeline
            </span>
            <h2 className="mt-5 font-display text-3xl tracking-tight text-espresso">
              From URL to risk landscape
            </h2>
            <p className="mt-3 text-sm text-mist max-w-md mx-auto">
              Every scan runs through the same deterministic pipeline — no shortcuts, no black boxes.
            </p>
          </div>
          <ProcessFlowChart />
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
                Institution / Instrument
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
                AuditGPT is the scanner.{' '}
                <span className="italic text-sage-deep">Scrutexity is the bureau behind it.</span>
              </h2>
              <p className="mt-5 text-base text-mist leading-[1.6]">
                AuditGPT gives operators a fast public-claims scan. Scrutexity maintains the deeper
                institutional layer: methodology, review records, validation artifacts, and the
                evidence library behind the work.
              </p>
              <p className="mt-4 text-sm text-mist/80 leading-[1.6]">
                This split keeps the tool simple and the institution durable. The scanner earns the
                first result; Scrutexity explains how claims are reviewed, recorded, and verified.
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
                      The claim-risk bureau. Maintains methodology, public proof review standards,
                      validation artifacts, and longitudinal claim records.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-0.5 self-stretch bg-sage-deep rounded-full shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-lg text-espresso mb-1">AuditGPT</p>
                    <p className="text-sm text-mist leading-[1.55]">
                      The instrument. A single-purpose scanner and report workflow for public
                      websites, designed to produce a first-pass review and route deeper work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INSTITUTIONAL USE CASE ═══════════════════════════════════ */}
      <section className="relative px-6 py-20 bg-cream border-t border-sand-deep/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
                style={{ fontFamily: MONO_STACK }}
              >
                For Insurers &amp; Acquirers
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
                Dated claim records for underwriting, diligence, and portfolio surveillance.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-[1.75] text-mist">
              <p>
                Scrutexity maintains a longitudinal archive of public claim language, visible proof,
                review receipts, and claim-change history. These records are designed to help teams
                understand what was claimed, what support was visible, and what changed over time.
              </p>
              <p>
                For insurers, lenders, acquirers, and portfolio operators, the value is not a promise
                of legal status. It is a consistent record format that can sit beside underwriting,
                diligence, and operating review materials.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/enterprise"
                  className="inline-flex items-center gap-2 rounded-full border border-sand-deep/45 bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-espresso hover:bg-cream"
                  style={{ fontFamily: MONO_STACK }}
                >
                  View enterprise brief
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/proof"
                  className="inline-flex items-center gap-2 rounded-full border border-sand-deep/45 bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-espresso hover:bg-cream"
                  style={{ fontFamily: MONO_STACK }}
                >
                  View proof library
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PUBLIC RECORD SYSTEM ═════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-bone" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 700px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
                style={{ fontFamily: MONO_STACK }}
              >
                Public Record System
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
                The scanner creates a finding.{' '}
                <span className="italic text-sage-deep">The bureau keeps the record.</span>
              </h2>
              <p className="mt-5 text-base text-mist leading-[1.65]">
                Scrutexity is not another dashboard for marketers. It is the institutional layer
                behind AuditGPT: a method, a proof library, and a dated record format for public
                claims that may be repeated by buyers, partners, investors, or AI answer engines.
              </p>
            </div>

            <div className="divide-y divide-sand-deep/20 border-y border-sand-deep/20">
              {[
                {
                  title: 'Methodology',
                  body: 'How public claims are captured, separated, reviewed against visible support, and rewritten closer to evidence.',
                  href: '/methodology',
                },
                {
                  title: 'Proof Library',
                  body: 'Where validation reports, anonymized receipts, digest references, and verification links live when they exist.',
                  href: '/proof',
                },
                {
                  title: 'Institutional Brief',
                  body: 'How dated claim records can sit beside diligence, underwriting, portfolio review, and agency launch materials.',
                  href: '/enterprise',
                },
              ].map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group grid gap-4 py-6 md:grid-cols-[72px_1fr_auto] md:items-start"
                >
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-2xl text-espresso">{item.title}</span>
                    <span className="mt-2 block text-sm leading-7 text-mist">{item.body}</span>
                  </span>
                  <ArrowRight size={17} className="text-sage-deep transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT GETS RECORDED ═══════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-cream" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 700px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Claim Record Transparency
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
              A review record should be boring, dated, and checkable.
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.65]">
              The Scrutexity standard is intentionally plain. Each artifact should show the public
              URL, the observed claim, the visible support, the proof gap, a safer wording option,
              the review timestamp, and a digest reference when available.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto border border-sand-deep/25 bg-bone">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-sand-deep/25 text-[10px] uppercase tracking-[0.14em] text-mist" style={{ fontFamily: MONO_STACK }}>
                  <th className="px-5 py-4 font-semibold">Record field</th>
                  <th className="px-5 py-4 font-semibold">Why it matters</th>
                  <th className="px-5 py-4 font-semibold">Artifact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-deep/15">
                {[
                  ['Observed claim', 'The exact public language under review.', 'Claim receipt'],
                  ['Visible support', 'The proof a visitor can actually see or reach from the page.', 'Evidence map'],
                  ['Proof gap', 'The missing or weak support that creates review risk.', 'Review note'],
                  ['Safer wording', 'A lower-exposure alternative closer to visible evidence.', 'Rewrite exhibit'],
                  ['Record digest', 'A reference for later artifact verification where available.', 'Public digest'],
                ].map(([field, why, artifact]) => (
                  <tr key={field}>
                    <td className="px-5 py-4 font-display text-lg text-espresso">{field}</td>
                    <td className="px-5 py-4 text-mist">{why}</td>
                    <td className="px-5 py-4 text-sage-deep">{artifact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ BOUNDARY STATEMENT ═══════════════════════════════════════ */}
      <section className="px-6 py-20 border-t border-sand-deep/15 bg-cream-deep" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 520px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
                style={{ fontFamily: MONO_STACK }}
              >
                What Scrutexity Is
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-[-0.02em] leading-[1.1]">
                A record layer for public claims.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Reviews public pages and public claim language.',
                'Maps claims to visible support and proof gaps.',
                'Maintains dated receipts and verification references.',
                'Does not issue legal, medical, regulatory, financial, clinical, ranking, or revenue opinions.',
              ].map((item) => (
                <div key={item} className="border border-sand-deep/25 bg-bone p-5 text-sm leading-7 text-mist">
                  <CheckCircle2 className="mb-4 h-4 w-4 text-sage-deep" />
                  {item}
                </div>
              ))}
            </div>
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
            Run the scanner.{' '}
            <span className="italic text-sage-deep">Keep the record.</span>
          </h2>
          <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl mx-auto">
            AuditGPT scans a public website and returns the first-pass finding. Scrutexity keeps
            the methodology, proof library, and review-record infrastructure behind the artifact.
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
                  cta_label: 'Run AuditGPT Scan — Bottom',
                  destination: 'https://auditgpt.ai/snapshot?source=scrutexity-home',
                  section: 'bottom-cta',
                })
              }
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Run AuditGPT Scan
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/methodology"
              onClick={() =>
                trackEvent('cta_click', {
                  cta_label: 'View Methodology — Bottom',
                  destination: '/methodology',
                  section: 'bottom-cta',
                })
              }
              className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              View Methodology
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
