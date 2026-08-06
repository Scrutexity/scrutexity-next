import type { Metadata } from "next";
import {
  PageHero,
  Section,
  DeliverableList,
  BoundaryNote,
  CTABand,
  RelatedRail,
  Kicker,
  MONO,
} from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "Claim Exposure Diagnostic | Scrutexity",
  description:
    "A focused, dated intelligence review for teams that need to understand exposure before commissioning a broader assessment. $1,500–$2,500.",
  alternates: { canonical: "/claim-exposure-diagnostic" },
  keywords: ["public claim audit", "regulatory exposure assessment", "claim substantiation intelligence"],
  openGraph: {
    title: "Claim Exposure Diagnostic | Scrutexity",
    description: "A focused, dated intelligence review. Is there enough here to justify a deeper review?",
    url: "/claim-exposure-diagnostic",
    type: "website",
  },
};

const deliverables = [
  "Defined public claim sample",
  "Evidence-gap map",
  "Pattern-match review",
  "AI narrative snapshot",
  "Priority findings",
  "Safer language examples",
  "Dated PDF receipt",
  "Executive summary",
];

export default function ClaimExposureDiagnosticPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Entry product"
        title="Claim Exposure Diagnostic"
        subtitle="A focused, dated intelligence review for teams that need to understand exposure before commissioning a broader assessment."
        body="$1,500–$2,500, depending on the number of surfaces and claims in scope."
        primary={{ label: "Request a Diagnostic", href: "/private-assessment?intent=diagnostic&source=diagnostic" }}
        secondary={{ label: "View a Sample Diligence File", href: "/sample-report" }}
      />

      <Section kicker="Purpose" title="The Diagnostic answers one question.">
        <div className="rounded-xl border border-clay/40 bg-clay/[0.07] p-8 sm:p-12">
          <p className="max-w-3xl font-display text-3xl leading-snug text-espresso md:text-4xl">
            &ldquo;Is there enough here to justify a deeper review?&rdquo;
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-bark">
            It is deliberately bounded. A defined sample of public claims, tested against
            visible evidence, with the findings dated and sourced. Enough to make the next
            decision responsibly — not a full assessment, and not presented as one.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "Bounded scope", b: "A defined claim sample agreed before work begins. No open-ended review, no scope drift." },
            { t: "Dated record", b: "Every observation carries its source and the date it was captured, so the finding stays checkable." },
            { t: "A real decision", b: "The output either justifies a broader assessment or it does not. Both are useful answers." },
          ].map(({ t, b }) => (
            <article key={t} className="rounded-xl border border-sand-deep/50 bg-bone p-7">
              <h3 className="font-display text-2xl leading-snug text-espresso">{t}</h3>
              <p className="mt-4 text-sm leading-6 text-mist">{b}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="bone"
        kicker="Deliverables"
        title="What you receive"
        lede="One dated file, sized to be read in a sitting and forwarded without explanation."
      >
        <DeliverableList items={deliverables} />
      </Section>

      <Section
        kicker="Where it leads"
        title="The bridge into a broader engagement."
        lede="Most Diagnostics resolve one of three ways. Each has a defined next step, and none of them is a sales call you cannot decline."
      >
        <ol className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/40 bg-sand-deep/40 md:grid-cols-3">
          {[
            { n: "01", t: "Narrow and fixable", b: "A small number of claims need substantiation or rewriting. You take the safer language examples and handle it internally." },
            { n: "02", t: "Broader than expected", b: "The sample suggests the pattern repeats across entities or locations. An Enterprise Exposure Assessment is the proportionate next step." },
            { n: "03", t: "Transaction-relevant", b: "The findings bear on a pending deal. AI & Regulatory Diligence scopes the full target surface against the transaction calendar." },
          ].map(({ n, t, b }) => (
            <li key={n} className="bg-bone p-7">
              <span className="text-[10px] font-semibold text-clay" style={{ fontFamily: MONO }}>
                {n}
              </span>
              <h3 className="mt-6 font-display text-2xl leading-snug text-espresso">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="bone" bordered={false}>
        <div className="rounded-xl border border-sand-deep/50 bg-cream p-8 sm:p-10">
          <Kicker>The instrument behind it</Kicker>
          <p className="mt-4 max-w-3xl text-base leading-7 text-bark">
            The Diagnostic is produced using AuditGPT, the public-claim diagnostic instrument
            powered by Scrutexity. The instrument captures and structures the claim surface;
            the analysis, confidence labels, and priority findings are reviewed by a person
            before anything is delivered.
          </p>
        </div>

        <div className="mt-8">
          <BoundaryNote
            lines={[
              "Not a legal opinion, and not legal advice.",
              "Not a determination of liability or non-compliance.",
              "Not a full assessment of the organization.",
              "Bounded to the claim sample agreed at the outset.",
              "Findings are observations with sources and dates attached.",
              "Safer language examples should be reviewed by counsel before publication.",
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Request a Diagnostic"
        body="Tell us which surfaces you want sampled and what decision the result needs to support."
        primary={{ label: "Request a Diagnostic", href: "/private-assessment?intent=diagnostic&source=diagnostic-cta" }}
        secondary={{ label: "See engagement levels", href: "/pricing" }}
      />

      <RelatedRail
        links={[
          { label: "Enterprise Exposure Assessment", href: "/enterprise" },
          { label: "Diligence", href: "/diligence" },
          { label: "Sample Report", href: "/sample-report" },
          { label: "Methodology", href: "/methodology" },
          { label: "Pricing", href: "/pricing" },
        ]}
      />
    </div>
  );
}
