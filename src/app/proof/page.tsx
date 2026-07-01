import Link from 'next/link';
import { ShieldCheck, FileText, Lock, LayoutGrid, Eye, Compass, BadgeCheck, FileSearch } from 'lucide-react';

export const metadata = {
  title: 'Scrutexity Proof Artifacts | Audits, Visibility Reports, Content Briefs, and Recovery Plans',
  description: 'Scrutexity turns audits, content strategy, AI visibility reviews, reputation surfaces, and recovery workflows into visual reports your team can act on.',
};

const artifactsList = [
  {
    name: '1. AuditGPT Plan',
    desc: 'The diagnostic snapshot prioritizing your top claim risks, evidence gaps, and 30-day action steps.',
    icon: FileSearch,
  },
  {
    name: '2. Claim Record',
    desc: 'Dated record of a single claim, showing what is stated, what support was visible, what is missing, and a safer copy alternative.',
    icon: ShieldCheck,
  },
  {
    name: '3. AI Visibility Snapshot',
    desc: 'A check of how your entity appears across search engines, GBP, ChatGPT, Perplexity, and AI Overview surfaces.',
    icon: Eye,
  },
  {
    name: '4. Contento Brief',
    desc: 'Structured instructions for copywriters, outlining approved claim bounds and safer framing guides.',
    icon: FileText,
  },
  {
    name: '5. Recovery Brief',
    desc: 'The ledger of re-engaged bookings, missed inquiries, and staff-approved follow-ups.',
    icon: LayoutGrid,
  },
  {
    name: '6. Reputation Surface Map',
    desc: 'A structural visual map of your directory listings, reviews, and client-facing responses.',
    icon: Compass,
  },
  {
    name: '7. Proof Page',
    desc: 'Clean public-facing evidence pages displaying credentials, studies, and documented outcomes.',
    icon: FileText,
  },
  {
    name: '8. Badge / Review Page',
    desc: 'Conservative "Reviewed by AuditGPT" badge pages detailing the audit date, claim categories checked, cleanup status, and next rescan.',
    icon: BadgeCheck,
  },
  {
    name: '9. Sealed Audit Trail',
    desc: 'Monthly proof binder and tamper-evident chronology of claims, evidence, approvals, and remediation history.',
    icon: Lock,
  },
];

const proofSequence = [
  ['01', 'Claim Intelligence Report', 'A dated receipt and static reviewed-badge summary are available immediately after the $299 report.'],
  ['02', 'Claim Cleanup Record', 'Priority claims are rewritten, evidence is linked, and the cleanup decisions are documented.'],
  ['03', 'Claim Drift Monitoring', 'Monthly review keeps new copy, AI answer distortion, and badge status from drifting silently.'],
  ['04', 'Proof Page', 'Only after cleanup do public proof pages show stronger evidence, remediated claims, and review history.'],
] as const;

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-sage-deep mb-3">System Outputs</p>
          <h1 className="font-display text-5xl md:text-7xl text-espresso tracking-tight leading-tight">
            Proof artifacts, <span className="italic text-sage-deep font-sans">not marketing theater.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-relaxed">
            Scrutexity turns audits, receipts, reviewed badges, content strategy, AI visibility reviews, reputation surfaces, and recovery workflows into visual reports your team can act on.
          </p>
        </div>

        {/* Proof Sequence */}
        <div className="mt-12 mb-16 bg-bone border border-sand-deep/30 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="max-w-2xl mb-7">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sage-deep mb-3">Proof sequence</p>
            <h2 className="font-display text-3xl text-espresso tracking-tight">Receipt first. Stronger proof after cleanup.</h2>
            <p className="mt-3 text-sm text-mist leading-relaxed">
              The entry tier does not pretend a claim is approved or compliant. It creates a dated review artifact your team can use on day one, then upgrades as remediation happens.
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

        {/* Proof Designer Section */}
        <div className="mt-16 bg-cream-deep border border-sand-deep/45 rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="max-w-2xl relative z-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sage-deep block mb-3">Proof Designer Widget</span>
            <h2 className="font-display text-3xl md:text-4xl text-espresso tracking-tight leading-tight mb-4">
              Proof Designer
            </h2>
            <p className="text-sm md:text-base text-mist leading-relaxed mb-6">
              Proof Designer turns claims, visibility gaps, reputation signals, and recovery data into charts, risk maps, before/after cards, priority matrices, and client-ready briefs. It is not a website builder. It makes the truth visible.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/claim-audit" className="px-6 py-3 bg-sage-deep hover:bg-espresso text-cream text-xs font-bold font-mono tracking-wider rounded-lg transition-colors">
                Try Proof Designer via AuditGPT
              </Link>
              <Link href="/proof/sealed-audit-trail" className="px-6 py-3 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso text-xs font-bold font-mono tracking-wider rounded-lg transition-colors">
                View Sealed Audit Trail
              </Link>
              <span className="text-xs font-mono text-mist">Available in all Full &amp; Agency audit plans.</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center border-t border-sand-deep/15 pt-16">
          <h2 className="font-display text-3xl text-espresso mb-4">Start with the audit. Make your claims verifiable.</h2>
          <p className="text-sm text-mist max-w-lg mx-auto mb-8">
            Run AuditGPT to diagnose your unsupported claims, AI visibility gaps, and demand leakage.
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Link href="/claim-audit" className="px-6 py-3.5 bg-sage-deep hover:bg-espresso text-cream text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-colors shadow-xs">
              Run AuditGPT
            </Link>
            <Link href="/sample-report" className="px-6 py-3.5 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-colors shadow-xs">
              View Sample Report
            </Link>
          </div>
        </div>

        {/* Footer Disclaimer/Alignment */}
        <div className="mt-16 pt-8 border-t border-sand-deep/20 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-mist">
          <span className="flex items-center gap-1.5"><Lock size={12} /> BAA on request · SHA-256 seals available</span>
          <span>No autonomous clinical advice. Verification is structural only.</span>
        </div>

      </main>
    </div>
  );
}
