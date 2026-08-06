import type { Metadata } from "next";
import {
  PageHero,
  Section,
  ItemGrid,
  DeliverableList,
  BoundaryNote,
  CTABand,
  RelatedRail,
  Kicker,
  MONO,
} from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "AI & Regulatory Diligence | Scrutexity",
  description:
    "Decision-quality intelligence before the deal closes. We examine a target's public claims, evidence gaps, AI narrative, and regulatory-pattern exposure.",
  alternates: { canonical: "/diligence" },
  robots: { index: false, follow: false },
  keywords: [
    "AI due diligence",
    "AI regulatory diligence",
    "PE AI diligence",
    "M&A AI risk",
    "claim substantiation intelligence",
  ],
  openGraph: {
    title: "AI & Regulatory Diligence | Scrutexity",
    description: "Decision-quality intelligence before the deal closes.",
    url: "/diligence",
    type: "website",
  },
};

const examined = [
  "Public marketing claims",
  "Product and service representations",
  "AI-generated company narratives",
  "Unsupported or weakly supported claims",
  "Regulatory-pattern matches",
  "Evidence gaps",
  "Public inconsistencies",
  "Claim history and changes",
  "AI misrepresentation",
  "Potential diligence questions for counsel",
];

const deliverables = [
  "Dated diligence file",
  "Claim inventory",
  "Evidence map",
  "AI narrative snapshot",
  "Enforcement-pattern analysis",
  "Priority findings",
  "Recommended diligence questions",
  "Remediation priorities",
  "Clear methodology and confidence labels",
];

const vocabulary = [
  ["Pattern match", "The language resembles claims that have drawn regulatory challenge elsewhere. Not a finding of wrongdoing."],
  ["Potential exposure", "A commercially material risk worth escalating. Scope and severity are for counsel to determine."],
  ["Documented inconsistency", "Two public statements that cannot both be accurate, each captured and dated."],
  ["Evidence gap", "A testable claim with no visible supporting evidence in the public record."],
  ["Requires professional review", "The question is legal, clinical, or technical, and sits outside what observation can settle."],
];

export default function DiligencePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Transaction Intelligence"
        title="AI & Regulatory Diligence"
        subtitle="Decision-quality intelligence before the deal closes."
        body="Scrutexity examines the gap between what a target company publicly claims, what its evidence supports, and what AI systems and third-party sources say about it."
        primary={{ label: "Request a Private Diligence Brief", href: "/private-assessment?intent=diligence&source=diligence" }}
        secondary={{ label: "View a Sample Diligence File", href: "/sample-report" }}
      />

      <Section
        kicker="Scope"
        title="What we examine"
        lede="A target's public surface is larger than its website. We inventory what a buyer, a regulator, or an answer system could find, and test each claim against the evidence available to support it."
      >
        <ItemGrid items={examined} />
      </Section>

      <Section
        tone="bone"
        kicker="Language discipline"
        title="How findings are described"
        lede="We do not call a finding a violation. That determination belongs to a qualified attorney. Our vocabulary is deliberately bounded so the record stays usable in a diligence process."
      >
        <dl className="divide-y divide-sand-deep/35 overflow-hidden rounded-xl border border-sand-deep/50 bg-cream">
          {vocabulary.map(([term, meaning]) => (
            <div key={term} className="grid gap-2 px-7 py-6 sm:grid-cols-[230px_1fr] sm:gap-8">
              <dt
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay"
                style={{ fontFamily: MONO }}
              >
                {term}
              </dt>
              <dd className="text-sm leading-6 text-bark">{meaning}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        kicker="Deliverable"
        title="What the buyer receives"
        lede="One dated file, structured so a deal team can route findings to the right reviewer without re-reading the whole document."
      >
        <DeliverableList items={deliverables} />

        <div className="mt-10 rounded-xl border border-clay/40 bg-clay/[0.07] p-8">
          <Kicker>Position</Kicker>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-espresso">
            The report is decision-support intelligence. It is built to be read alongside
            counsel&apos;s review, financial diligence, and technical diligence — not in place
            of any of them.
          </p>
        </div>
      </Section>

      <Section tone="bone" bordered={false}>
        <BoundaryNote
          title="What this engagement is not"
          lines={[
            "Not a legal opinion.",
            "Not a valuation opinion.",
            "Not a substitute for professional diligence.",
            "Not a determination of liability or non-compliance.",
            "Not a guarantee of any transaction outcome.",
            "Designed to complement counsel, financial diligence, and technical review.",
          ]}
          note="Scrutexity documents what is publicly observable and organizes it for the professionals qualified to evaluate it. Findings are observations with sources and dates attached, not conclusions of law."
        />

        <div className="mt-8 rounded-xl border border-sand-deep/50 bg-cream p-8 sm:p-10">
          <Kicker>Engagement scope</Kicker>
          <p className="mt-4 max-w-3xl text-base leading-7 text-bark">
            Engagements typically begin in the five-figure range. Scope depends on transaction
            size, number of entities, and review depth.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-mist">
            Timelines are set against the transaction calendar and agreed before work begins.
            Every engagement is covered by a confidentiality agreement, and findings are shared
            only with the commissioning party.
          </p>
        </div>
      </Section>

      <CTABand
        title="Request a Private Diligence Brief"
        body="Tell us what you are evaluating and on what timeline. We will confirm whether a diligence file is the right instrument before anything is scoped."
        primary={{ label: "Request a Private Diligence Brief", href: "/private-assessment?intent=diligence&source=diligence-cta" }}
        secondary={{ label: "See engagement levels", href: "/pricing" }}
      />

      <RelatedRail
        links={[
          { label: "Methodology", href: "/methodology" },
          { label: "Sample Report", href: "/sample-report" },
          { label: "Proof", href: "/proof" },
          { label: "For Counsel", href: "/counsel" },
          { label: "AI Narrative Integrity", href: "/ai-narrative-integrity" },
        ]}
      />
    </div>
  );
}
