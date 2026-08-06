import type { Metadata } from "next";
import {
  PageHero,
  Section,
  ItemGrid,
  BoundaryNote,
  CTABand,
  RelatedRail,
  Kicker,
} from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "For Counsel | Evidence Intelligence | Scrutexity",
  description:
    "Scrutexity organizes the public record — exact language, sources, dated captures, AI outputs — so counsel can focus on the legal questions that matter.",
  alternates: { canonical: "/counsel" },
  robots: { index: false, follow: false },
  keywords: [
    "regulatory exposure assessment",
    "public claim audit",
    "claim substantiation intelligence",
    "general counsel risk review",
  ],
  openGraph: {
    title: "Evidence intelligence for General Counsel and outside counsel | Scrutexity",
    description: "Scrutexity organizes the public record so counsel can focus on the legal questions that matter.",
    url: "/counsel",
    type: "website",
  },
};

const documented = [
  "Exact public language",
  "Source URLs",
  "Dated captures",
  "AI answer outputs",
  "Enforcement-pattern matches",
  "Evidence gaps",
  "Claim history",
  "Changes over time",
];

const uses = [
  "Identify issues for legal review",
  "Prioritize investigation",
  "Prepare remediation",
  "Organize evidence",
  "Track changes",
  "Support internal risk discussions",
  "Inform diligence",
  "Establish a repeatable review record",
];

export default function CounselPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Counsel Intelligence"
        title="Evidence intelligence for General Counsel and outside counsel."
        subtitle="Scrutexity organizes the public record so counsel can focus on the legal questions that matter."
        body="Reviewing a company's public claim surface is largely a collection problem before it is a legal one. We do the collection, with sources and dates attached, and hand counsel a structured record."
        primary={{ label: "Discuss a Counsel-Directed Review", href: "/private-assessment?intent=counsel&source=counsel" }}
        secondary={{ label: "View a Sample Diligence File", href: "/sample-report" }}
      />

      <Section
        kicker="The record"
        title="We document"
        lede="Every item is captured verbatim, attributed to a source, and stamped with the date it was observed. Nothing is paraphrased into a finding."
      >
        <ItemGrid items={documented} />
      </Section>

      <Section
        tone="bone"
        kicker="Application"
        title="Counsel uses the record to"
        lede="The output is an organized evidentiary base. What it means, and what follows from it, stays with counsel."
      >
        <ItemGrid items={uses} />
      </Section>

      <Section
        kicker="Working method"
        title="Counsel-directed, and privilege-aware."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Counsel sets the scope",
              b: "You define the entities, surfaces, and claim categories in scope. We do not expand the review or contact third parties without instruction.",
            },
            {
              t: "We do not publish findings",
              b: "Findings are delivered only to the commissioning party. Scrutexity does not publish, report, or share third-party findings with anyone else.",
            },
            {
              t: "Structured for review",
              b: "Each item carries its source, capture date, and confidence label, so a reviewer can verify an observation without reconstructing our work.",
            },
          ].map(({ t, b }) => (
            <article key={t} className="rounded-xl border border-sand-deep/50 bg-bone p-7">
              <h3 className="font-display text-2xl leading-snug text-espresso">{t}</h3>
              <p className="mt-4 text-sm leading-6 text-mist">{b}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="bone" bordered={false}>
        <div className="rounded-xl border border-clay/40 bg-clay/[0.07] p-8 sm:p-10">
          <Kicker>The boundary</Kicker>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-espresso">
            Scrutexity does not provide legal advice. It creates structured intelligence that
            counsel can evaluate.
          </p>
        </div>

        <div className="mt-8">
          <BoundaryNote
            lines={[
              "Not a law firm, and not a substitute for one.",
              "No attorney-client relationship is created.",
              "No determination of liability or non-compliance.",
              "No opinion on the merits of any claim or dispute.",
              "Findings are observations, not conclusions of law.",
              "Escalation and remediation decisions rest with counsel.",
            ]}
            note="We describe findings as pattern matches, documented inconsistencies, evidence gaps, and potential exposure. Where a determination requires an attorney, we mark it as requiring professional review and stop there."
          />
        </div>
      </Section>

      <CTABand
        title="Discuss a Counsel-Directed Review"
        body="Tell us the entities and surfaces in scope and what decision the review needs to support."
        primary={{ label: "Discuss a Counsel-Directed Review", href: "/private-assessment?intent=counsel&source=counsel-cta" }}
        secondary={{ label: "Read the methodology", href: "/methodology" }}
      />

      <RelatedRail
        links={[
          { label: "Methodology", href: "/methodology" },
          { label: "Sample Report", href: "/sample-report" },
          { label: "Proof", href: "/proof" },
          { label: "Diligence", href: "/diligence" },
          { label: "Enterprise", href: "/enterprise" },
        ]}
      />
    </div>
  );
}
