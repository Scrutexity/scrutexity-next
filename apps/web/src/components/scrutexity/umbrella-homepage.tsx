"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';
import { ScrollyTimeline } from '@/components/scrutexity/motion/ScrollyTimeline';
import { HashChainProof } from '@/components/scrutexity/motion/HashChainProof';
import { CensusCounter } from '@/components/scrutexity/motion/CensusCounter';
import { SMarkLifecycle } from '@/components/scrutexity/motion/SMarkLifecycle';
import { InstitutionalPipeline } from '@/components/scrutexity/motion/institutional-pipeline';
import { OperatingSystemDiagram } from '@/components/scrutexity/operating-system-diagram';
import { HoverProofLink } from '@/components/scrutexity/motion/hover-proof-link';
import { AIAnswerRealityPreview } from '@/components/scrutexity/ai-answer-reality-preview';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

/* ── Data ─────────────────────────────────────────────────── */

type ArtifactPreview = {
  title: string;
  meta: string;
  status: string;
};

/* ── Component ────────────────────────────────────────────── */


export default function UmbrellaHomepage() {
  const [activeArtifact, setActiveArtifact] = useState<ArtifactPreview | null>(null);

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
      <section className="relative px-5 pt-32 pb-16 md:px-6 md:pt-48 md:pb-24 overflow-hidden bg-cream">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-sage-deep/5 rounded-full blur-[120px]" />
          {/* subtle paper grain */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-sage-deep font-semibold mb-6"
            style={{ fontFamily: MONO_STACK }}
          >
            SCRUTEXITY <span className="w-1 h-1 rounded-full bg-sage-deep/50" /> Claim Intelligence Standard
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
            className="font-display text-5xl md:text-6xl lg:text-[5rem] text-espresso tracking-[-0.03em] leading-[1.05]"
          >
            Claim intelligence for public trust.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
            className="mt-8 text-base md:text-lg text-mist leading-relaxed max-w-2xl mx-auto"
          >
            <span className="block text-espresso font-medium mb-4">
              Claims should be preserved as they were published, reviewed against publicly visible evidence, and revisited when that evidence changes.
            </span>
            Organizations publish claims that are repeated by search engines, AI assistants, customers, and partners. Scrutexity documents what was claimed, what evidence was publicly visible, and how that record changes over time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
            className="mt-12 flex flex-col items-center justify-center gap-5"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="https://auditgpt.ai/snapshot?source=scrutexity-home"
                onClick={() => trackEvent('cta_click', { cta_label: 'Run Claim Scan', destination: 'https://auditgpt.ai/snapshot?source=scrutexity-home', section: 'hero' })}
                className="group px-7 py-3.5 bg-espresso text-cream font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 shadow-lg"
              >
                Run a claim scan
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              
              <HoverProofLink
                href="/proof"
                className="group px-7 py-3.5 bg-transparent border border-sand-deep/40 text-espresso font-sans font-semibold rounded-full transition-all duration-300 text-sm inline-flex items-center gap-2 hover:bg-bone/50 hover:-translate-y-0.5"
              >
                Sample Claim Record
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 text-sage-deep" />
              </HoverProofLink>
            </div>
            
            <Link
              href="/methodology"
              className="text-[11px] mt-2 text-mist hover:text-espresso transition-colors tracking-wide border-b border-transparent hover:border-mist/40 pb-0.5"
              style={{ fontFamily: MONO_STACK }}
            >
              Explore the Methodology
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 mt-16 md:mt-24">
          <InstitutionalPipeline />
        </div>
      </section>

      {/* ══ AI ANSWER REALITY PREVIEW ════════════════════════════════ */}
      <AIAnswerRealityPreview />

      {/* ══ INSTITUTIONAL PROOF & HISTORY ══════════════════════════════ */}
      <section aria-label="Institutional Proof" className="border-y border-sand-deep/15 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center divide-sand-deep/10 lg:divide-x">
            {[
              'Public Claim Records',
              'Evidence Mapping',
              'Review Methodology',
              'Pattern Registry',
              'Verification Receipts',
              'Historical Archive',
            ].map((label) => (
              <div key={label} className="px-4 flex items-center justify-center">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-mist" style={{ fontFamily: MONO_STACK }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-sand-deep/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage-deep mb-2" style={{ fontFamily: MONO_STACK }}>Archive Status</p>
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl text-espresso">Active Standard</p>
                <Link href="/proof" className="text-[10px] text-sage-deep border-b border-sage-deep/30 hover:border-sage-deep transition-colors ml-1 font-semibold" style={{ fontFamily: MONO_STACK }}>Verify →</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage-deep mb-2" style={{ fontFamily: MONO_STACK }}>Pattern Registry</p>
              <p className="font-display text-2xl text-espresso">Public</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage-deep mb-2" style={{ fontFamily: MONO_STACK }}>Review Standard</p>
              <p className="font-display text-2xl text-espresso">v1.2</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage-deep mb-2" style={{ fontFamily: MONO_STACK }}>Evidence Sources</p>
              <p className="font-display text-2xl text-espresso">Public</p>
            </div>
          </div>
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
          <ScrollyTimeline />
        </div>
      </section>

      {/* ══ POSITION STATEMENT ════════════════════════════════════════ */}
      <section className="relative px-6 py-24 bg-cream border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
                style={{ fontFamily: MONO_STACK }}
              >
                Institution / Instrument
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
                The bureau behind the scanner.
              </h2>
              <p className="mt-6 text-base text-mist leading-relaxed">
                AuditGPT finds the claim surface. Scrutexity records what changed, what evidence
                exists, what distortion appeared, and when the review record was sealed. The scanner
                creates the first observation. The bureau turns that observation into a dated record format.
              </p>
              
              <div className="mt-10 grid gap-4">
                {[
                  'Reviews public pages and public claim language.',
                  'Maps claims to visible support and proof gaps.',
                  'Maintains dated receipts and verification references.',
                ].map((item) => (
                  <div key={item} className="border border-sand-deep/25 bg-bone p-4 text-sm leading-relaxed text-mist flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <OperatingSystemDiagram className="max-w-[520px] mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROOF INFRASTRUCTURE ═══════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32 border-t border-sand-deep/15 bg-bone" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Claim Record Transparency
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-espresso tracking-[-0.02em] leading-[1.1]">
            A review record should be boring, dated, and checkable.
          </h2>
          <p className="mt-6 text-base text-mist leading-relaxed max-w-2xl mx-auto">
            The Scrutexity standard is intentionally plain. Each artifact shows the public
            URL, the observed claim, the visible support, the proof gap, a safer wording option,
            the review timestamp, and a digest reference when available.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-20 space-y-16">
          <HashChainProof />
          <div className="border-t border-sand-deep/15 pt-16">
            <SMarkLifecycle />
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
          <p className="mt-6 mb-8 text-base text-mist leading-relaxed max-w-xl mx-auto">
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
