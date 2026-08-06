import type { Metadata } from "next";
import PrivateAssessmentForm from "@/components/scrutexity/private-assessment-form";
import { Kicker, MONO, RelatedRail } from "@/components/scrutexity/intel-kit";

export const metadata: Metadata = {
  title: "Request a Private Assessment | Scrutexity",
  description:
    "Tell us what you need to understand. Every Scrutexity engagement is scoped against the decision it needs to support. Confidential by default.",
  alternates: { canonical: "/private-assessment" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Request a Private Assessment | Scrutexity",
    description: "Tell us what you need to understand.",
    url: "/private-assessment",
    type: "website",
  },
};

export default async function PrivateAssessmentPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; source?: string }>;
}) {
  const params = await searchParams;
  const intent = typeof params.intent === "string" ? params.intent : "";
  const source = typeof params.source === "string" ? params.source : "private-assessment";

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="px-5 pb-24 pt-28 sm:px-8 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Kicker>Private Assessment</Kicker>
              <h1 className="mt-6 font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl">
                Tell us what you need to understand.
              </h1>
              <p className="mt-7 text-base leading-7 text-bark">
                Every engagement begins with a scoped conversation about the decision you are
                trying to make and the record that exists behind it.
              </p>

              <dl className="mt-10 space-y-6">
                {[
                  ["Confidential by default", "Requests are treated as confidential. We do not publish, report, or share third-party findings."],
                  ["Scoped before priced", "We confirm what is in scope — entities, surfaces, claims, and depth — before quoting anything."],
                  ["An honest no", "If a Scrutexity engagement is not the right instrument for your question, we will say so."],
                ].map(([term, value]) => (
                  <div key={term} className="border-t border-sand-deep/40 pt-5">
                    <dt
                      className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay"
                      style={{ fontFamily: MONO }}
                    >
                      {term}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-mist">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 text-xs leading-5 text-mist">
                Scrutexity is an intelligence and evidence company. It is not a law firm and does
                not provide legal advice.
              </p>
            </div>

            <PrivateAssessmentForm intent={intent} source={source} />
          </div>
        </div>
      </section>

      <RelatedRail
        links={[
          { label: "Diligence", href: "/diligence" },
          { label: "For Counsel", href: "/counsel" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "AI Narrative Integrity", href: "/ai-narrative-integrity" },
          { label: "Pricing", href: "/pricing" },
        ]}
      />
    </div>
  );
}
