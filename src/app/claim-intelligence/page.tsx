import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  WebsiteXRay,
  ClaimHeatmap,
  ClaimDashboard,
  EvidenceCoverage,
  CitationNetwork,
  ClaimTimeline,
  ClaimCardShowcase,
  ClaimLifecycle,
  GovernanceFlywheel,
  TrustStack,
} from '@/components/artifacts';

export const metadata: Metadata = {
  title: 'Claim Intelligence | Scrutexity',
  description:
    'See every public claim the way a regulator does. Scrutexity is the claim intelligence layer for the content stack — proving whether what your page says is supported before AI systems, buyers, and regulators do.',
  alternates: { canonical: '/claim-intelligence' },
};

const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function ClaimIntelligencePage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans antialiased">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-cream px-5 pb-12 pt-28 sm:px-8 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(92,70,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.08)_1px,transparent_1px)] [background-size:42px_42px]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
            Claim Intelligence · the content-stack trust layer
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.04] tracking-[-0.03em] text-espresso sm:text-6xl lg:text-[4.4rem]">
            See every public claim{' '}
            <span className="italic text-sage-deep">before everyone else does.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            Scrunch tells brands what AI says about them. Scrutexity proves whether what your page
            says is actually true — claim by claim, with evidence, before AI systems, buyers, and
            regulators read it.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="https://auditgpt.ai/snapshot?source=claim-intelligence"
              className="group inline-flex items-center gap-2 rounded-xl bg-sage-deep px-7 py-4 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
              style={{ boxShadow: '0 18px 40px -20px rgba(94,122,90,0.8)' }}
            >
              Run a claim audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/insights/glp-1-claim-audit"
              className="inline-flex items-center gap-2 rounded-xl border border-sand-deep/45 bg-beige/60 px-7 py-4 text-sm font-semibold text-espresso transition-colors hover:bg-cream"
            >
              Read the GLP-1 teardown
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Artifacts, in narrative order ── */}
      <WebsiteXRay />
      <ClaimHeatmap />
      <ClaimDashboard />
      <EvidenceCoverage />
      <CitationNetwork />
      <ClaimTimeline />

      {/* Claim record cards */}
      <section className="border-t border-sand-deep/15 bg-beige/40 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span
              className="mb-5 block text-[11px] uppercase tracking-[0.18em] text-sage-deep"
              style={{ fontFamily: MONO_STACK }}
            >
              The Claim Record
            </span>
            <h2 className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-espresso md:text-[2.7rem]">
              Every claim becomes{' '}
              <span className="italic text-sage-deep">a verifiable object.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.6] text-mist">
              Like a payment object, each claim carries its status, evidence, owner, and a
              verification handle — so any report renders consistently and any claim can be checked.
            </p>
          </div>
          <div className="mt-12">
            <ClaimCardShowcase />
          </div>
        </div>
      </section>

      <ClaimLifecycle />
      <GovernanceFlywheel />
      <TrustStack />

      {/* ── Bottom CTA ── */}
      <section className="border-t border-sand-deep/15 bg-cream px-5 py-24 text-center sm:px-8 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl">
            Govern the claims{' '}
            <span className="italic text-sage-deep">your business stands behind.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist">
            Start with a claim audit. See what is unsupported, where AI distorts it, and exactly how
            to fix it — before anyone else finds it first.
          </p>
          <div className="mt-9">
            <Link
              href="https://auditgpt.ai/snapshot?source=claim-intelligence-bottom"
              className="group inline-flex items-center gap-2 rounded-xl bg-sage-deep px-7 py-4 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
            >
              Run a claim audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
