import Link from 'next/link';
import { ShieldCheck, FileText, Lock, Eye, BadgeCheck, FileSearch, Hash } from 'lucide-react';
import { CensusCounter } from '@/components/scrutexity/motion/CensusCounter';
import { HashChainProof } from '@/components/scrutexity/motion/HashChainProof';
import { ScrollyTimeline } from '@/components/scrutexity/motion/ScrollyTimeline';
import { SMarkLifecycle } from '@/components/scrutexity/motion/SMarkLifecycle';

export const metadata = {
  title: 'Scrutexity Proof Library | Validation Reports, Receipts, and Verification',
  description: 'Scrutexity proof artifacts: validation reports, anonymized claim review receipts, public digest references, and hash-chain verification links.',
};

const artifactsList = [
  {
    name: '1. Validation Report',
    desc: 'The signed 20-domain validation report will live here once completed, with scope, review limits, and aggregate findings stated plainly.',
    icon: FileSearch,
  },
  {
    name: '2. Claim Record Receipt',
    desc: 'A dated record of a single public claim: source URL, observed text, visible support, proof gap, safer wording, and review timestamp.',
    icon: ShieldCheck,
  },
  {
    name: '3. Anonymized Receipt Excerpts',
    desc: 'Illustrative archetype records showing the review structure. These fixtures are not live customer output.',
    icon: Eye,
  },
  {
    name: '4. Public Digest',
    desc: 'A git-based public digest for published record references, designed to make review artifacts independently checkable over time.',
    icon: FileText,
  },
  {
    name: '5. Badge / Review Page',
    desc: 'Conservative reviewed-badge pages that disclose audit date, reviewed surfaces, expiration status, and limitations.',
    icon: BadgeCheck,
  },
  {
    name: '6. Hash-Chain Verification',
    desc: 'A SHA-256 hashed chronology of reviewed claims, record digests, and verification references for retained artifacts.',
    icon: Lock,
  },
];

const proofSequence = [
  ['01', 'Observe', 'Capture the public page, claim text, source URL, timestamp, and review context.'],
  ['02', 'Review', 'Map each claim to visible support, proof gaps, and safer wording without calling it approved or cleared.'],
  ['03', 'Record', 'Create a dated Claim Record Transparency receipt with structured fields and retained references.'],
  ['04', 'Verify', 'Publish or retain digest references so the artifact can be checked later without exposing private material.'],
] as const;

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-sage-deep mb-3">Proof Library</p>
          <h1 className="font-display text-5xl md:text-7xl text-espresso tracking-tight leading-tight">
            Evidence artifacts, <span className="italic text-sage-deep font-sans">not marketing theater.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-relaxed">
            Scrutexity documents how claim reviews are captured, classified, and returned: sample
            report structures, source references, and review boundaries.
          </p>
        </div>

        <div className="mb-16 rounded-2xl border border-sand-deep/30 bg-bone p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              ['Validation report', 'Reserved for the signed 20-domain review once complete.'],
              ['Receipt excerpts', 'Anonymized examples only; no customer-sensitive material is invented.'],
              ['Verification', 'Hash-chain and digest links where a public artifact exists.'],
            ].map(([title, body]) => (
              <div key={title} className="border-l border-sand-deep/30 pl-4">
                <p className="font-display text-xl text-espresso">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-mist">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Sequence */}
        <div className="mt-12 mb-16 bg-bone border border-sand-deep/30 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="max-w-2xl mb-7">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sage-deep mb-3">Record sequence</p>
            <h2 className="font-display text-3xl text-espresso tracking-tight">Every proof artifact starts as a review record.</h2>
            <p className="mt-3 text-sm text-mist leading-relaxed">
              Scrutexity does not pretend a claim is approved or cleared. It creates
              dated artifacts that show what was observed, what support was visible, and what changed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {proofSequence.map(([step, title, desc]) => (
              <div key={step} className="border border-sand-deep/25 bg-cream/70 rounded-xl p-4">
                <span className="font-mono text-[10px] text-sage-deep font-semibold">{step}</span>
                <h3 className="mt-3 font-display text-lg text-espresso leading-tight">{title}</h3>
                <p className="mt-2 text-xs text-mist leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive Artifacts Section */}
        <div className="mb-16 rounded-2xl border border-sage-deep/30 bg-bone p-6 md:p-8 shadow-sm">
          <span className="font-mono text-[10px] uppercase tracking-widest text-sage-deep block mb-2">Sample review artifacts</span>
          <h2 className="font-display text-3xl text-espresso tracking-tight mb-4">Illustrative archetype records showing the review structure.</h2>
          <p className="text-sm text-mist mb-6 max-w-2xl">
            Fictional examples · illustrative data · not live customer output.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/sample-report"
              className="group p-5 bg-cream border border-sand-deep/40 rounded-xl hover:border-sage-deep transition-all duration-300 flex items-start justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-sage-deep font-semibold block mb-1">Interactive Report</span>
                <h3 className="font-display text-xl text-espresso font-semibold group-hover:text-sage-deep transition-colors">Sample Claim Audit Report</h3>
                <p className="text-xs text-mist mt-1 leading-relaxed">Four-question claim evaluation matrix, evidence gaps, safer rewrites, and AI distortion snapshot.</p>
              </div>
              <ShieldCheck className="text-sage-deep shrink-0 ml-3 mt-1" size={20} />
            </Link>
            <Link
              href="/sample-owner-brief"
              className="group p-5 bg-cream border border-sand-deep/40 rounded-xl hover:border-sage-deep transition-all duration-300 flex items-start justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-sage-deep font-semibold block mb-1">Executive Summary</span>
                <h3 className="font-display text-xl text-espresso font-semibold group-hover:text-sage-deep transition-colors">Sample Owner Brief</h3>
                <p className="text-xs text-mist mt-1 leading-relaxed">High-level risk distribution, key exposure areas, and prioritized remediation path for operators.</p>
              </div>
              <FileText className="text-sage-deep shrink-0 ml-3 mt-1" size={20} />
            </Link>
          </div>
        </div>

        {/* Artifact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {artifactsList.map((art) => {
            const Icon = art.icon;
            return (
              <div key={art.name} className="p-6 bg-bone border border-sand-deep/30 rounded-2xl flex items-start gap-4">
                <span className="p-2.5 bg-sage/10 text-sage-deep rounded-xl shrink-0">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-espresso font-semibold mb-2">{art.name}</h3>
                  <p className="text-sm text-mist leading-relaxed">{art.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ ENTERPRISE MOTION SYSTEM VISUALIZERS ═══════════════════════ */}
        <div className="mt-20 space-y-16">
          {/* 1. Census Counter */}
          <CensusCounter />

          {/* 2. Hash Chain Proof & S-Mark Lifecycle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <HashChainProof />
            <SMarkLifecycle />
          </div>

          {/* 3. Scrolly Timeline */}
          <div className="rounded-3xl border border-sand-deep/35 bg-bone p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-sage-deep font-semibold block mb-2">Process Sequence</span>
              <h2 className="font-display text-3xl text-espresso">Scroll-Driven Claim Ingestion Pipeline</h2>
              <p className="text-sm text-mist mt-2">How every public claim moves from initial observation to hash-sealed record.</p>
            </div>
            <ScrollyTimeline />
          </div>
        </div>

        {/* Standards Section */}
        <div className="mt-16 bg-cream-deep border border-sand-deep/45 rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="max-w-3xl relative z-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sage-deep block mb-3">Claim Record Transparency</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight leading-tight mb-4">
              The proof layer is a record format.
            </h2>
            <p className="text-sm md:text-base text-mist leading-relaxed mb-6">
              Claim Record Transparency is Scrutexity&apos;s structured format for public claim
              reviews. It records the source URL, observed claim, visible evidence, missing support,
              safer wording, timestamp, reviewer context, and digest reference when available.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/methodology" className="px-6 py-3 bg-sage-deep hover:bg-espresso text-cream text-xs font-bold font-mono tracking-wider rounded-lg transition-colors">
                View Methodology
              </Link>
              <Link href="/proof/sealed-audit-trail" className="px-6 py-3 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso text-xs font-bold font-mono tracking-wider rounded-lg transition-colors">
                View Sealed Audit Trail
              </Link>
              <Link href="/verify" className="px-6 py-3 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso text-xs font-bold font-mono tracking-wider rounded-lg transition-colors">
                Verify Artifact
              </Link>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center border-t border-sand-deep/15 pt-16">
          <h2 className="font-display text-3xl text-espresso mb-4">Start with the scanner. Keep the record.</h2>
          <p className="text-sm text-mist max-w-lg mx-auto mb-8">
            Start with one public page. Scrutexity returns the exact claim, visible support, why the finding matters, and the next action.
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Link href="/contact?intent=claim-support-review&source=proof" className="px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-colors shadow-xs">
              Start a Claim Review
            </Link>
            <Link href="/sample-report" className="px-6 py-3.5 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-colors shadow-xs">
              View Sample Report
            </Link>
          </div>
        </div>

        {/* Footer Disclaimer/Alignment */}
        <div className="mt-16 pt-8 border-t border-sand-deep/20 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-mist">
          <span className="flex items-center gap-1.5"><Hash size={12} /> Public digest and hash-chain references where available</span>
          <span>No legal, medical, regulatory, or financial advice. Verification is structural only.</span>
        </div>

      </main>
    </div>
  );
}
