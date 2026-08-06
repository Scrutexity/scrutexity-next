import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Kicker, MONO } from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'Trust & Boundaries | Scrutexity',
  description: 'Evidence first. Clear boundaries. How we generate findings and what we do not do.',
  alternates: { canonical: '/trust' },
};

const SECTIONS = [
  {
    title: "What we examine",
    body: "We review the public information you provide or direct us to. This includes your primary website, landing pages, marketing materials, and what public AI systems output when queried about your claims."
  },
  {
    title: "What we do not examine",
    body: "We do not review private internal documents, privileged communications, patient records, or any non-public data unless explicitly requested under a secure, scoped engagement."
  },
  {
    title: "How findings are generated",
    body: "We observe a claim, identify the evidence publicly linked to support it, and map any gaps. We use software to accelerate collection, but findings are based on observable language, not black-box inferences."
  },
  {
    title: "What requires human review",
    body: "We highlight areas where your claims lack clear public support. Deciding whether that gap represents a material business or legal risk requires review by a qualified human—typically your legal counsel or compliance officer."
  },
  {
    title: "What Scrutexity cannot conclude",
    body: "We do not determine legal violations, issue legal opinions, or guarantee compliance with any regulatory framework. We provide the intelligence; you provide the judgment."
  },
  {
    title: "Data handling",
    body: "The Free Snapshot and $99 Claim Support Review operate entirely on public data. We do not require or accept sensitive personal data (PII/PHI) for these public tiers."
  },
  {
    title: "Public-page boundaries",
    body: "Our standard tools do not bypass paywalls, login screens, or authentication barriers. We evaluate what is visible to a standard public visitor, counterparty, or regulator."
  },
  {
    title: "Legal boundaries",
    body: "Scrutexity is intelligence software, not a law firm. Using our tools does not create an attorney-client relationship. Our findings are observations, not legal advice."
  }
];

export default function TrustPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Trust</Kicker>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
            Evidence first. Clear boundaries.
          </h1>
          <p className="mt-7 text-lg leading-8 text-bark">
            We don&apos;t ask you to trust a score. We show you the record.
          </p>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <article key={section.title} className="p-6 sm:p-8 rounded-xl border border-sand-deep/40 bg-bone">
              <h2 className="font-display text-2xl text-espresso mb-3">{section.title}</h2>
              <p className="text-sm leading-6 text-mist">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bone px-5 py-24 sm:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl leading-tight text-espresso md:text-5xl">
            See the standard in action.
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/snapshot"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
            >
              Run Your Free Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
