import type { Metadata } from "next";
import {
  PageHero,
  Section,
  ItemGrid,
  BoundaryNote,
  CTABand,
  RelatedRail,
  MONO,
} from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "Scrutexity Watch | Ongoing Claim and AI Narrative Monitoring",
  description:
    "Monitor claim drift, evidence changes, AI narrative shifts, and newly emerging risk patterns after the initial review. $1,500 per month.",
  alternates: { canonical: "/watch" },
  keywords: ["narrative monitoring", "claim drift", "AI narrative integrity", "public claim intelligence"],
  openGraph: {
    title: "Scrutexity Watch | Ongoing Intelligence",
    description: "Claims change. Evidence changes. AI systems re-summarize. Watch documents what moved, and when.",
    url: "/watch",
    type: "website",
  },
};

const monitored = [
  "Claim drift across public surfaces",
  "New or amended claims",
  "Evidence added, changed, or removed",
  "AI narrative shifts between captures",
  "Answer drift across systems and phrasings",
  "Newly emerging regulatory-pattern matches",
  "Changes following a remediation cycle",
  "Dated change log across the monitoring period",
];

export default function WatchPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <PageHero
        kicker="Ongoing Intelligence"
        title="Scrutexity Watch"
        subtitle="Monitor claim drift, evidence changes, AI narrative shifts, and newly emerging risk patterns after the initial review."
        body="$1,500 per month. Scope is set at the start of the engagement and adjusted as entities and surfaces are added."
        primary={{ label: "Request a Private Assessment", href: "/private-assessment?intent=monitoring&source=watch" }}
        secondary={{ label: "See engagement levels", href: "/pricing" }}
      />

      <Section kicker="Why monitoring" title="A review is a photograph. The record keeps moving.">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="space-y-5 text-base leading-7 text-bark">
            <p>
              An assessment describes a company&apos;s public claim surface on the day it was
              captured. Marketing pages get edited. New locations publish their own language.
              A supporting study is taken down. An answer system re-summarizes the company
              from a different source.
            </p>
            <p>
              None of those changes announce themselves. Without a baseline, there is no way
              to tell what moved, when it moved, or whether a remediation actually held.
            </p>
            <p className="border-l-2 border-clay pl-5 text-espresso">
              Watch keeps the baseline current and documents the deltas against it.
            </p>
          </div>

          <div className="rounded-xl border border-sand-deep/50 bg-bone p-7 sm:p-9">
            <p
              className="mb-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist"
              style={{ fontFamily: MONO }}
            >
              Monitoring cycle
            </p>
            <ol className="space-y-5">
              {[
                ["Baseline", "The prior assessment or diagnostic becomes the reference record."],
                ["Recapture", "Surfaces and AI representations are re-captured on an agreed cadence."],
                ["Compare", "Each capture is diffed against the baseline, not re-reviewed from scratch."],
                ["Report", "Material changes are documented, dated, and prioritized. Quiet periods report as quiet."],
              ].map(([t, b], index) => (
                <li key={t} className="flex gap-4">
                  <span
                    className="mt-0.5 text-[10px] font-semibold text-clay"
                    style={{ fontFamily: MONO }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-espresso">{t}</p>
                    <p className="mt-1 text-sm leading-6 text-mist">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section
        tone="bone"
        kicker="Coverage"
        title="What Watch monitors"
        lede="Scope is set at the start of the engagement and adjusted as entities and surfaces are added."
      >
        <ItemGrid items={monitored} />
      </Section>

      <Section bordered={false}>
        <BoundaryNote
          lines={[
            "Not continuous surveillance of any individual.",
            "Not a guarantee that every change will be detected.",
            "No control over AI system behavior or output.",
            "Monitoring is point-in-time capture on an agreed cadence.",
            "Findings are observations, not determinations of law.",
            "Escalation decisions rest with counsel and the client.",
          ]}
          note="Watch observes publicly available surfaces and answer-system outputs. Coverage is bounded by what is publicly visible at each capture, and we report the boundaries of a capture alongside its findings."
        />
      </Section>

      <CTABand
        title="Keep the record current."
        body="Watch is usually commissioned after a Diagnostic, an Enterprise Exposure Assessment, or a diligence engagement."
        primary={{ label: "Request a Private Assessment", href: "/private-assessment?intent=monitoring&source=watch-cta" }}
        secondary={{ label: "Explore AI Narrative Integrity", href: "/ai-narrative-integrity" }}
      />

      <RelatedRail
        links={[
          { label: "Enterprise", href: "/enterprise" },
          { label: "AI Narrative Integrity", href: "/ai-narrative-integrity" },
          { label: "Claim Exposure Diagnostic", href: "/claim-exposure-diagnostic" },
          { label: "Methodology", href: "/methodology" },
          { label: "Pricing", href: "/pricing" },
        ]}
      />
    </div>
  );
}
