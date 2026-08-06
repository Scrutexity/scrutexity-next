import type { Metadata } from "next";
import {
  PageHero,
  Section,
  BoundaryNote,
  CTABand,
  RelatedRail,
  Kicker,
  MONO,
} from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "AI Narrative Integrity | Scrutexity",
  description:
    "Scrutexity measures how AI answer systems represent your company — and documents where the public narrative diverges from what your evidence supports.",
  alternates: { canonical: "/ai-narrative-integrity" },
  robots: { index: false, follow: false },
  keywords: [
    "AI narrative integrity",
    "AI misrepresentation",
    "answer engine accuracy",
    "public claim intelligence",
  ],
  openGraph: {
    title: "What does AI say about your company when you are not in the room?",
    description: "Scrutexity measures how AI answer systems represent your company and documents where the narrative diverges from what your evidence supports.",
    url: "/ai-narrative-integrity",
    type: "website",
  },
};

const measured = [
  { t: "Factual representation", b: "What answer systems state about your company, products, services, leadership, and competitors — captured verbatim." },
  { t: "Distortion", b: "Where a qualified statement is repeated as an absolute, or a narrow result is generalized into a broad capability." },
  { t: "Source-level inconsistency", b: "Where the sources an answer draws on disagree with each other, or with your own published record." },
  { t: "Missing context", b: "Where an accurate fact is repeated without the qualifier that made it accurate." },
  { t: "Answer drift", b: "How the representation changes over time, between systems, and between phrasings of the same question." },
];

const remediation = [
  { n: "01", t: "Source review", b: "Identify which visible sources the representation appears to rest on." },
  { n: "02", t: "Evidence gap", b: "Determine what the public record can and cannot support." },
  { n: "03", t: "Recommended correction", b: "Draft scoped, accurate replacement language for the sources you control." },
  { n: "04", t: "Retest", b: "Re-query after the correction is published and document what changed." },
];

export default function AiNarrativeIntegrityPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Enterprise Intelligence"
        title="What does AI say about your company when you are not in the room?"
        subtitle="Scrutexity measures how AI answer systems represent your company, products, services, leadership, and competitors — and documents where the public narrative diverges from the facts you can support."
        primary={{ label: "Request a Private Assessment", href: "/private-assessment?intent=ai-narrative&source=ai-narrative" }}
        secondary={{ label: "View a Sample Diligence File", href: "/sample-report" }}
      />

      <Section
        kicker="What we measure"
        title="Five things worth knowing about your AI narrative."
        lede="Answer systems compress. Compression is where accuracy is usually lost — not in outright invention, but in the qualifier that gets dropped on the way to a short answer."
      >
        <dl className="divide-y divide-sand-deep/35 overflow-hidden rounded-xl border border-sand-deep/50 bg-bone">
          {measured.map(({ t, b }) => (
            <div key={t} className="grid gap-2 px-7 py-6 sm:grid-cols-[240px_1fr] sm:gap-8">
              <dt className="font-display text-xl text-espresso">{t}</dt>
              <dd className="text-sm leading-6 text-mist">{b}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Illustrative comparison — fictional company, fictional answer. */}
      <Section
        tone="bone"
        kicker="Example"
        title="How a distortion is documented."
        lede="One captured answer, compared against the visible record, described in language that does not overstate what observation can establish."
      >
        <div className="overflow-hidden rounded-xl border border-sand-deep/50 bg-cream">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-deep/40 px-7 py-4">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mist"
              style={{ fontFamily: MONO }}
            >
              Illustrative example · Fictional company
            </span>
            <span
              className="rounded-full border border-clay/40 bg-clay/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-clay"
              style={{ fontFamily: MONO }}
            >
              Illustrative
            </span>
          </div>

          <div className="grid divide-y divide-sand-deep/35 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="p-7">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist"
                style={{ fontFamily: MONO }}
              >
                AI answer
              </span>
              <p className="mt-4 font-display text-xl leading-snug text-espresso">
                &ldquo;Company X is FDA-approved.&rdquo;
              </p>
            </div>

            <div className="p-7">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist"
                style={{ fontFamily: MONO }}
              >
                Source reality
              </span>
              <p className="mt-4 text-sm leading-6 text-bark">
                No visible evidence supporting that statement. No clearance, approval, or
                registration number located in the public record.
              </p>
            </div>

            <div className="bg-clay/[0.07] p-7">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay"
                style={{ fontFamily: MONO }}
              >
                Scrutexity finding
              </span>
              <p className="mt-4 text-sm font-semibold leading-6 text-espresso">
                Potentially unsupported AI representation.
              </p>
              <p className="mt-3 text-sm leading-6 text-mist">
                Requires professional review before any corrective claim is published.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs leading-5 text-mist">
          Illustrative example built to show the comparison structure. It does not represent a
          real company or a completed Scrutexity engagement.
        </p>
      </Section>

      <Section
        kicker="What happens next"
        title="From finding to retest."
        lede="We work on the layer we can actually affect: the factual public record that answer systems draw from."
      >
        <ol className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/40 bg-sand-deep/40 md:grid-cols-4">
          {remediation.map(({ n, t, b }) => (
            <li key={n} className="bg-bone p-7">
              <span className="text-[10px] font-semibold text-clay" style={{ fontFamily: MONO }}>
                {n}
              </span>
              <h3 className="mt-6 font-display text-2xl text-espresso">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="bone" bordered={false}>
        <div className="rounded-xl border border-clay/40 bg-clay/[0.07] p-8 sm:p-10">
          <Kicker>An honest limit</Kicker>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-espresso">
            Scrutexity does not promise to control AI systems. We measure how they represent
            you, and we improve the factual public record that influences them.
          </p>
        </div>

        <div className="mt-8">
          <BoundaryNote
            lines={[
              "No guaranteed AI rankings, placements, or citations.",
              "No control over any AI system's output.",
              "No guarantee a correction will change a given answer.",
              "Measurement is point-in-time and phrasing-dependent.",
              "Findings are observations, not determinations of fact.",
              "Corrective language should be reviewed by counsel before publication.",
            ]}
            note="Answer systems change without notice and return different results to different users. We document what we observed, when, and how we asked — so the record stays honest about its own limits."
          />
        </div>
      </Section>

      <CTABand
        title="See how AI represents your company."
        body="We start by capturing the current narrative and comparing it to what your evidence supports."
        primary={{ label: "Request a Private Assessment", href: "/private-assessment?intent=ai-narrative&source=ai-narrative-cta" }}
        secondary={{ label: "Explore Watch", href: "/watch" }}
      />

      <RelatedRail
        links={[
          { label: "Enterprise", href: "/enterprise" },
          { label: "Scrutexity Watch", href: "/watch" },
          { label: "Methodology", href: "/methodology" },
          { label: "Sample Report", href: "/sample-report" },
          { label: "Diligence", href: "/diligence" },
        ]}
      />
    </div>
  );
}
