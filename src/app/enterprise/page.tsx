import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, FileArchive, FileSearch, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Insurers & Acquirers | Scrutexity',
  description:
    'How Scrutexity claim records can support underwriting, diligence, and portfolio surveillance workflows for high-trust public claim surfaces.',
  alternates: { canonical: '/enterprise' },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const useCases = [
  {
    title: 'Underwriting review support',
    body: 'Public claim records can help teams see what a business says, what support is visible, and where review questions may remain.',
  },
  {
    title: 'Acquisition diligence',
    body: 'Dated claim receipts give buyers a structured view of public-language risk before post-close marketing expansion.',
  },
  {
    title: 'Portfolio surveillance',
    body: 'Longitudinal review records can show claim drift, missing proof, and new public surfaces across operating companies.',
  },
];

const records = [
  'Public URL inventory',
  'Observed claim text',
  'Visible proof map',
  'Evidence gap notes',
  'Safer wording options',
  'Review timestamp',
  'Record digest reference',
  'Open remediation log',
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <header className="border-b border-sand-deep/20 pb-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            For Insurers &amp; Acquirers
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.04] tracking-[-0.03em] text-espresso md:text-7xl">
            Claim records for diligence, underwriting, and portfolio review.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-mist md:text-lg">
            Scrutexity maintains structured public-claim records for businesses where reputation,
            marketing language, and AI answer surfaces matter. The record is designed to inform
            institutional review workflows, not to replace counsel, underwriting judgment, or
            diligence advisors.
          </p>
        </header>

        <section className="grid gap-6 border-b border-sand-deep/20 py-14 md:grid-cols-3">
          {useCases.map((item) => (
            <article key={item.title} className="border border-sand-deep/25 bg-bone p-6">
              <Building2 className="h-5 w-5 text-sage-deep" />
              <h2 className="mt-5 font-display text-2xl text-espresso">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-mist">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 border-b border-sand-deep/20 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2 text-sage-deep">
              <FileArchive size={18} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO }}>
                Longitudinal Archive
              </p>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">
              The bureau value is the record over time.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              A one-time scan shows a surface at a moment in time. A Scrutexity archive shows how
              claim language, visible proof, and unresolved review notes change as a business grows,
              markets, raises, borrows, or acquires.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {records.map((record) => (
              <div key={record} className="border border-sand-deep/25 bg-bone p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-bark" style={{ fontFamily: MONO }}>
                  {record}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-sand-deep/20 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2 text-sage-deep">
              <FileSearch size={18} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO }}>
                Review Packet
              </p>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">
              Built to sit beside institutional review materials.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              Scrutexity records can accompany underwriting memos, diligence folders, portfolio
              monitoring reports, and agency launch records. The artifact shows observed public
              language and visible proof gaps; it does not make legal or regulatory determinations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/methodology" className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream">
                View methodology
                <ArrowRight size={13} />
              </Link>
              <Link href="/private-equity/claim-diligence" className="inline-flex items-center gap-2 rounded-full border border-sand-deep/40 bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-espresso">
                View diligence page
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="border border-sand-deep/25 bg-bone p-6">
            <ShieldAlert className="h-5 w-5 text-sage-deep" />
            <h3 className="mt-5 font-display text-2xl text-espresso">Boundary statement</h3>
            <p className="mt-3 text-sm leading-7 text-mist">
              Scrutexity outputs are structured public-claim review records. They are not legal
              opinions, valuation opinions, underwriting decisions, regulatory findings, clinical
              advice, or financial advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
