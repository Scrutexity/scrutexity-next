import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileSearch, Hash, Library, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scrutexity Methodology | Claim Record Transparency',
  description:
    'How Scrutexity reviews public claims: source capture, visible proof review, Claim Record Transparency, public digest references, and hash-chain verification.',
  alternates: { canonical: '/methodology' },
};

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const reviewSteps = [
  {
    title: 'Public surface capture',
    body: 'We review public pages, source URLs, screenshots or retained text extracts, timestamps, and the visible context around each claim.',
  },
  {
    title: 'Claim extraction',
    body: 'Claims are separated from ordinary copy so each statement can be reviewed as its own record with source location and category.',
  },
  {
    title: 'Visible proof review',
    body: 'We look for support that is publicly visible or directly linked near the claim. Hidden files and private assertions are not treated as public proof.',
  },
  {
    title: 'Safer wording',
    body: 'When a claim appears unsupported, overstated, or weakly evidenced, we provide a lower-exposure rewrite that stays closer to visible support.',
  },
  {
    title: 'Record and digest',
    body: 'When applicable, the record is assigned a digest reference so the retained artifact can be checked without exposing sensitive material.',
  },
];

const crtFields = [
  'source_url',
  'observed_claim',
  'surface_location',
  'visible_support',
  'proof_gap',
  'review_status',
  'safer_wording',
  'reviewed_at',
  'record_digest',
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <section className="max-w-4xl border-b border-sand-deep/20 pb-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            Scrutexity Methodology
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-[-0.03em] text-espresso md:text-7xl">
            Claim Record Transparency.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-mist md:text-lg">
            Scrutexity reviews public claims by asking what was stated, what support was visible,
            what gap remains, and what wording would stay closer to evidence. The output is a dated
            record, not a legal, medical, regulatory, financial, or ranking opinion.
          </p>
        </section>

        <section className="grid gap-6 border-b border-sand-deep/20 py-14 md:grid-cols-3">
          {[
            { icon: FileSearch, title: 'Public pages only', body: 'No login, no write access, no private systems.' },
            { icon: ShieldCheck, title: 'Evidence nearby', body: 'Visible support is reviewed in the context where the claim appears.' },
            { icon: Hash, title: 'Record integrity', body: 'Digest references and retained artifacts support later verification.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-sand-deep/25 bg-bone p-6">
              <Icon className="h-5 w-5 text-sage-deep" />
              <h2 className="mt-5 font-display text-2xl text-espresso">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 border-b border-sand-deep/20 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              Review Process
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">
              A record before a recommendation.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              The methodology is designed to make the review reproducible. Every finding should point
              back to a source URL, visible evidence, a stated gap, and a safer alternative.
            </p>
          </div>
          <ol className="divide-y divide-sand-deep/20 border-y border-sand-deep/20">
            {reviewSteps.map((step, index) => (
              <li key={step.title} className="grid gap-4 py-5 md:grid-cols-[64px_1fr]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl text-espresso">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-mist">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 border-b border-sand-deep/20 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              CRT Format
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">
              Claim Record Transparency is the common record.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              CRT is Scrutexity&apos;s structured format for claim review artifacts. It is intended
              to make the record portable across reports, public proof pages, internal review
              packets, and future verification workflows.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/proof" className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream">
                View proof library
                <ArrowRight size={13} />
              </Link>
              <Link href="/verify" className="inline-flex items-center gap-2 rounded-full border border-sand-deep/40 bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-espresso">
                Verify artifact
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="border border-sand-deep/25 bg-bone p-6">
            <div className="flex items-center gap-2 text-sage-deep">
              <Library size={18} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO }}>
                Core fields
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {crtFields.map((field) => (
                <div key={field} className="border border-sand-deep/20 bg-cream px-3 py-2 text-[11px] text-bark" style={{ fontFamily: MONO }}>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              Boundaries
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">
              What the method does not claim.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'It does not certify claims, pages, companies, treatments, products, or outcomes.',
              'It does not provide legal, medical, regulatory, financial, clinical, or investment advice.',
              'It does not guarantee rankings, AI answer changes, buyer behavior, approvals, or revenue.',
              'It does not replace counsel, clinical review, underwriting review, or diligence advisors.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 border border-sand-deep/25 bg-bone p-5 text-sm leading-7 text-mist">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sage-deep" />
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
