import type { Metadata } from 'next';
import {
  PageHero,
  Section,
  ItemGrid,
  BoundaryNote,
  CTABand,
  RelatedRail,
  Kicker,
  MONO,
} from '@/components/scrutexity/intel-kit';

export const metadata: Metadata = {
  title: 'Enterprise Exposure Assessment | Scrutexity',
  description:
    'Public-claim intelligence for organizations that cannot afford surprises. See what you claim publicly, what you can support, and how AI represents you.',
  alternates: { canonical: '/enterprise' },
  robots: { index: false, follow: false },
  keywords: [
    'regulatory exposure assessment',
    'public claim intelligence',
    'healthcare marketing claim risk',
    'claim substantiation intelligence',
    'public claim audit',
  ],
  openGraph: {
    title: 'Enterprise Exposure Assessment | Scrutexity',
    description:
      'Public-claim intelligence for organizations that cannot afford surprises.',
    url: '/enterprise',
    type: 'website',
  },
};

const audiences = [
  'Multi-location healthcare groups',
  'Telehealth organizations',
  'Enterprise brands',
  'Regulated companies',
  'PE-backed operating companies',
  'Marketing and risk organizations',
];

const included = [
  'Multi-location review',
  'Claim inventory',
  'Evidence mapping',
  'Pattern analysis',
  'AI narrative assessment',
  'Prioritized remediation',
  'Executive briefing',
  'Optional monitoring',
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Enterprise Intelligence"
        title="Public-claim intelligence for organizations that cannot afford surprises."
        subtitle="Get a defensible picture of what your organization is saying publicly, what it can support, and how the market and AI systems represent it."
        body="$7,500–$25,000+ depending on scope."
        primary={{ label: 'Request a Private Assessment', href: '/private-assessment?intent=enterprise&source=enterprise' }}
        secondary={{ label: 'View a Sample Diligence File', href: '/sample-report' }}
      />

      <Section
        kicker="The problem at scale"
        title="Claim risk compounds with every location."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="space-y-5 text-base leading-7 text-bark">
            <p>
              A single organization rarely speaks with one voice. Location pages get written
              locally. Landing pages outlive the campaigns that produced them. An acquired
              entity arrives with its own claim history attached.
            </p>
            <p>
              The result is a public claim surface no one has read end to end — including the
              people accountable for it. When a regulator, a counterparty, or an answer system
              reads it, they read all of it at once.
            </p>
            <p className="border-l-2 border-clay pl-5 text-espresso">
              An Enterprise Exposure Assessment produces the first complete, dated inventory of
              what the organization is actually claiming, and what its evidence supports.
            </p>
          </div>

          <div className="rounded-xl border border-sand-deep/50 bg-bone p-7 sm:p-9">
            <p
              className="mb-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist"
              style={{ fontFamily: MONO }}
            >
              Typical findings pattern
            </p>
            <ul className="space-y-5">
              {[
                ['Inherited language', 'Claims that arrived with an acquisition and were never re-reviewed against current evidence.'],
                ['Local drift', 'Individual locations restating a corporate claim more strongly than the source permits.'],
                ['Orphaned pages', 'Campaign pages still live and indexed, still making claims the company has since retired.'],
                ['Evidence decay', 'A study, certification, or dataset that supported a claim is no longer visible or current.'],
              ].map(([t, b]) => (
                <li key={t} className="border-t border-sand-deep/40 pt-4 first:border-t-0 first:pt-0">
                  <p className="text-sm font-semibold text-espresso">{t}</p>
                  <p className="mt-1.5 text-sm leading-6 text-mist">{b}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-5 text-mist">
              Patterns we look for. Not a claim about any specific organization.
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="bone"
        kicker="Who this is for"
        title="Organizations with distributed claim surfaces."
        lede="The assessment is most useful where public language is produced in more than one place, by more than one team."
      >
        <ItemGrid items={audiences} />
      </Section>

      <Section
        kicker="Primary product"
        title="Enterprise Exposure Assessment"
        lede="$7,500–$25,000+ depending on scope. Scope is determined by number of entities, domains, locations, claims, and review depth."
      >
        <ItemGrid items={included} />

        <div className="mt-10 rounded-xl border border-clay/40 bg-clay/[0.07] p-8">
          <Kicker>The deliverable</Kicker>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-espresso">
            One dated record, plus an executive briefing that puts the priority findings in
            front of the people who decide what happens next.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-mist">
            Remediation is prioritized rather than exhaustive. We identify what to address
            first, what to escalate to counsel, and what can wait.
          </p>
        </div>
      </Section>

      <Section tone="bone" bordered={false}>
        <BoundaryNote
          lines={[
            'Not a legal opinion, and not legal advice.',
            'Not a determination of liability or non-compliance.',
            'Not a certification, accreditation, or seal.',
            'No guarantee of regulatory outcomes.',
            'No control over AI system behavior or output.',
            'Findings are observations with sources and dates attached.',
          ]}
          note="Remediation language and prioritization are recommendations for review, not instructions. Anything with legal consequence should be reviewed by counsel before publication."
        />
      </Section>

      <CTABand
        title="See what your organization is actually claiming."
        body="We start by agreeing the entities, domains, and surfaces in scope, then produce the inventory."
        primary={{ label: 'Request a Private Assessment', href: '/private-assessment?intent=enterprise&source=enterprise-cta' }}
        secondary={{ label: 'Start with a Diagnostic', href: '/claim-exposure-diagnostic' }}
      />

      <RelatedRail
        links={[
          { label: 'Claim Exposure Diagnostic', href: '/claim-exposure-diagnostic' },
          { label: 'AI Narrative Integrity', href: '/ai-narrative-integrity' },
          { label: 'Scrutexity Watch', href: '/watch' },
          { label: 'For Counsel', href: '/counsel' },
          { label: 'Methodology', href: '/methodology' },
        ]}
      />
    </div>
  );
}
