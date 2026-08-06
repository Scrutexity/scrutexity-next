import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  PageHero,
  Section,
  CTABand,
  RelatedRail,
  Kicker,
  MONO,
} from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'Proof | What Proof Means at Scrutexity',
  description:
    'We do not ask you to trust a score. We show you the record behind the finding. Verified, illustrative, and in-development work kept strictly separate.',
  alternates: { canonical: '/proof' },
  keywords: ['public claim intelligence', 'claim substantiation intelligence', 'evidence record'],
  openGraph: {
    title: 'Proof | What Proof Means at Scrutexity',
    description: 'We do not ask you to trust a score. We show you the record behind the finding.',
    url: '/proof',
    type: 'website',
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   THREE LEVELS, NEVER MIXED.

   VERIFIED     — real client work, published only with written permission.
   ILLUSTRATIVE — fictional examples that demonstrate methodology.
   IN DEVELOPMENT — systems that do not exist yet, described as such.

   Nothing moves up a level until the artifact actually exists. An empty
   Verified section is the honest state until a client consents to publication.
   ───────────────────────────────────────────────────────────────────────── */

const illustrative = [
  {
    name: 'Sample Diligence File',
    desc: 'One finding traced end to end — claim, evidence, pattern match, AI distortion, risk interpretation, recommended action — against a fictional company.',
    href: '/sample-report',
  },
  {
    name: 'Claim record structure',
    desc: 'The field format every finding uses: verbatim source text, capture timestamp, evidence assessment, and an explicit confidence label.',
    href: '/methodology',
  },
  {
    name: 'AI narrative comparison',
    desc: 'A captured answer set against the visible record, showing how a qualified statement becomes an unqualified one in summary.',
    href: '/ai-narrative-integrity',
  },
];

const inDevelopment = [
  {
    name: 'Independent validation study',
    desc: 'A multi-domain review with published scope, method, and limitations. Not yet conducted. No results exist to report.',
  },
  {
    name: 'Public verification endpoint',
    desc: 'A route for confirming that a delivered record matches the copy held by Scrutexity. Partially built; not yet a published guarantee.',
  },
  {
    name: 'Longitudinal drift dataset',
    desc: 'Aggregate, anonymized measurement of how AI representations shift over time. Requires a monitoring base that does not yet exist.',
  },
];

export default function ProofPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Proof"
        title="What proof means at Scrutexity."
        subtitle="We do not ask you to trust a score. We show you the record behind the finding."
        body="Proof claims are separated into three levels and never mixed. Nothing is presented as verified until it is."
        primary={{ label: 'View a Sample Diligence File', href: '/sample-report' }}
        secondary={{ label: 'Read the methodology', href: '/methodology' }}
      />

      {/* ── Level 1: Verified ── */}
      <Section
        kicker="Level 01 · Verified"
        title="Real client work, published with permission."
      >
        <div className="rounded-xl border border-sand-deep/50 bg-bone p-8 sm:p-10">
          <span
            className="inline-flex rounded-full border border-sand-deep bg-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist"
            style={{ fontFamily: MONO }}
          >
            No published entries
          </span>
          <p className="mt-6 max-w-3xl text-base leading-7 text-bark">
            Scrutexity engagements are confidential by default. We do not publish, report, or
            share third-party findings — including as marketing. A verified case study appears
            here only when a client has given written permission to publish specific,
            attributable work.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-mist">
            We would rather show an empty section than a fabricated one. If this section is
            empty, it means no client has consented to publication yet — not that no work has
            been done.
          </p>
        </div>
      </Section>

      {/* ── Level 2: Illustrative ── */}
      <Section
        tone="bone"
        kicker="Level 02 · Illustrative"
        title="Fictional examples that show the methodology."
        lede="These demonstrate structure and rigor using constructed subjects. Every one is labeled illustrative wherever it appears on the site."
      >
        <div className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/40 bg-sand-deep/40 md:grid-cols-3">
          {illustrative.map(({ name, desc, href }) => (
            <article key={name} className="flex flex-col bg-cream p-7">
              <span
                className="w-fit rounded-full border border-clay/40 bg-clay/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-clay"
                style={{ fontFamily: MONO }}
              >
                Illustrative
              </span>
              <h3 className="mt-5 font-display text-2xl leading-snug text-espresso">{name}</h3>
              <p className="mt-4 flex-1 text-sm leading-6 text-mist">{desc}</p>
              <Link
                href={href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-clay"
              >
                View
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Level 3: In development ── */}
      <Section
        kicker="Level 03 · In development"
        title="Systems that do not exist yet."
        lede="Listed so the roadmap is legible, and so nothing here is mistaken for a capability we currently offer."
      >
        <ul className="divide-y divide-sand-deep/35 overflow-hidden rounded-xl border border-sand-deep/50 bg-bone">
          {inDevelopment.map(({ name, desc }) => (
            <li key={name} className="px-7 py-6 sm:px-9">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl text-espresso">{name}</h3>
                <span
                  className="rounded-full border border-sand-deep bg-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist"
                  style={{ fontFamily: MONO }}
                >
                  In development
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-mist">{desc}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl text-sm leading-6 text-mist">
          None of the above is available today. No statistics, validation results, or archive
          figures are published from these systems, because none exist yet.
        </p>
      </Section>

      {/* ── The standard ── */}
      <Section tone="bone" bordered={false}>
        <div className="rounded-xl border border-clay/40 bg-clay/[0.07] p-8 sm:p-10">
          <Kicker>The standard we hold ourselves to</Kicker>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-espresso">
            We sell the claim that a public record can be checked. That only works if our own
            record survives the same test.
          </p>
          <ul className="mt-7 grid gap-x-10 gap-y-3 text-sm leading-6 text-mist sm:grid-cols-2">
            {[
              'No client logos without written permission.',
              'No testimonials that are not attributable and consented.',
              'No metrics we have not measured.',
              'No validation results before the validation exists.',
              'No engagement counts we cannot substantiate.',
              'Illustrative material labeled illustrative, every time.',
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTABand
        title="Check the record yourself."
        body="The sample file shows exactly what a finding looks like, including where we decline to draw a conclusion."
        primary={{ label: 'View a Sample Diligence File', href: '/sample-report' }}
        secondary={{ label: 'Request a Private Assessment', href: '/private-assessment?source=proof' }}
      />

      <RelatedRail
        links={[
          { label: 'Methodology', href: '/methodology' },
          { label: 'Sample Report', href: '/sample-report' },
          { label: 'Verify a Record', href: '/verify' },
          { label: 'Diligence', href: '/diligence' },
          { label: 'For Counsel', href: '/counsel' },
        ]}
      />
    </div>
  );
}
