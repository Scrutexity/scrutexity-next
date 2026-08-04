"use client";

import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const premiumPlans = [
  {
    name: "Founder’s Audit",
    price: "From $750",
    outcome: "Full trust and positioning picture",
    scope: "Claims, positioning, offer clarity, and trust architecture",
    buyer: "Founder-led teams",
    turnaround: "Confirmed before work begins",
    cta: "Request a Founder’s Audit",
    href: "/contact?intent=founders-audit&source=pricing",
  },
  {
    name: "Agency Claim QA",
    price: "From $1,500",
    outcome: "Repeatable claim QA for client delivery",
    scope: "Client sites, campaigns, case studies, and launch review",
    buyer: "Agencies",
    turnaround: "Confirmed per engagement",
    cta: "Discuss an Agency Pilot",
    href: "/contact?intent=agency-claim-qa&source=pricing",
  },
  {
    name: "Agent Evidence Pack",
    price: "From $2,500",
    outcome: "Dated evidence review of supplied agent outputs",
    scope: "Transcripts, grounding, escalation, and policy drift",
    buyer: "Teams deploying customer-facing agents",
    turnaround: "Confirmed per evidence pack",
    cta: "Request an Agent Review",
    href: "/contact?intent=agent-evidence-pack&source=pricing",
  },
];

export default function PricingContent() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-18 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            Public starting prices
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">
            Pay for a defined review, not vague access to a dashboard.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist">
            Each scope ends with concrete findings, visible evidence notes, safer framing drafts, and a prioritized next step. No certification or outcome guarantee is included.
          </p>
          <Link
            href="/contact?intent=claim-support-review&source=scrutexity-pricing"
            onClick={() => trackEvent("cta_click", { cta_label: "Get a Claim Snapshot", destination: "/contact?intent=claim-support-review&source=scrutexity-pricing", section: "pricing-hero" })}
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
          >
            Get a Claim Snapshot
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p id="premium-engagements" className="scroll-mt-32 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Premium engagements</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso md:text-5xl">Choose the review outcome, then confirm the scope.</h2>

          <div className="mt-10 hidden overflow-hidden border border-sand-deep/45 lg:block">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-sand-deep/45 bg-bone">
                  <th className="w-[17%] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist" style={{ fontFamily: MONO }}>Compare</th>
                  {premiumPlans.map((plan) => (
                    <th key={plan.name} className="border-l border-sand-deep/35 px-5 py-5 align-top">
                      <span className="block font-display text-2xl font-normal text-espresso">{plan.name}</span>
                      <span className="mt-2 block text-sm font-semibold text-espresso">{plan.price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Outcome", "outcome"],
                  ["Scope", "scope"],
                  ["Buyer", "buyer"],
                  ["Target turnaround", "turnaround"],
                ].map(([label, field]) => (
                  <tr key={field} className="border-b border-sand-deep/30">
                    <th className="bg-bone px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{label}</th>
                    {premiumPlans.map((plan) => (
                      <td key={plan.name} className="border-l border-sand-deep/30 px-5 py-4 text-sm leading-6 text-mist">{plan[field as keyof typeof plan]}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="bg-bone px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>Next step</th>
                  {premiumPlans.map((plan) => (
                    <td key={plan.name} className="border-l border-sand-deep/30 px-5 py-4">
                      <Link href={plan.href} onClick={() => trackEvent("pricing_plan_click", { plan_name: plan.name, destination: plan.href, section: "pricing" })} className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2">
                        {plan.cta}<ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 lg:hidden">
            {premiumPlans.map((plan) => (
              <article key={plan.name} className="border border-sand-deep/45 bg-bone p-6">
                <div className="border-b border-sand-deep/30 pb-5 sm:flex sm:items-start sm:justify-between sm:gap-6">
                  <h3 className="font-display text-3xl text-espresso">{plan.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-espresso sm:mt-1">{plan.price}</p>
                </div>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Outcome", plan.outcome],
                    ["Scope", plan.scope],
                    ["Buyer", plan.buyer],
                    ["Target turnaround", plan.turnaround],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{label}</dt>
                      <dd className="mt-2 text-sm leading-6 text-mist">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={plan.href} onClick={() => trackEvent("pricing_plan_click", { plan_name: plan.name, destination: plan.href, section: "pricing" })} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2">
                  {plan.cta}<ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-12 border-y border-sand-deep/45 bg-cream px-6 py-8 md:flex md:items-center md:justify-between md:gap-10" aria-labelledby="entry-review-heading">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Start with one page</p>
              <h2 id="entry-review-heading" className="scroll-mt-32 mt-3 font-display text-3xl text-espresso">Claim Support Review · $99</h2>
              <p className="mt-3 text-sm leading-6 text-mist">Focused review · 48-hour target turnaround</p>
            </div>
            <Link href="/contact?intent=claim-support-review&source=pricing" onClick={() => trackEvent("pricing_plan_click", { plan_name: "Claim Support Review", destination: "/contact?intent=claim-support-review&source=pricing", section: "pricing" })} className="mt-6 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 md:mt-0">
              Start a Claim Review<ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>

          <aside className="mt-8 rounded-lg border border-sand-deep/45 bg-cream p-7 md:flex md:items-center md:justify-between md:gap-8">
            <div className="flex gap-4">
              <Clock3 className="mt-1 h-5 w-5 shrink-0 text-sage-deep" aria-hidden="true" />
              <div>
                <h2 className="font-display text-2xl text-espresso">Monitoring pilots</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-mist">
                  Available after an initial review for selected customers. Contact us to discuss scope.
                </p>
              </div>
            </div>
            <Link href="/contact?intent=monitoring&source=pricing" className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso md:mt-0">
              Discuss a monitoring pilot
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Unsure which scope fits?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            Start with the $99 Claim Support Review when one public page is the question. Use a broader audit when the issue crosses positioning, customer-facing AI, or multiple client surfaces.
          </p>
          <a href="mailto:nick@scrutexity.com?subject=Help%20choosing%20a%20Scrutexity%20review" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md border border-sand-deep bg-bone px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">
            Email Nick
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
