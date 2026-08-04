"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const plans = [
  {
    name: "Claim Support Review",
    price: "$99",
    cadence: "one-time",
    summary: "For one priority public page with claims a buyer may question.",
    includes: [
      "Review of material public claims",
      "Visible evidence and support gaps",
      "Priority findings",
      "Safer framing drafts",
      "48-hour target turnaround",
    ],
    cta: "Start a Claim Review",
    href: "/contact?intent=claim-support-review&source=pricing",
  },
  {
    name: "Founder’s Audit",
    price: "From $750",
    cadence: "scoped engagement",
    summary: "For founders who need the full trust and positioning picture, not one isolated page.",
    includes: [
      "Claims and visible evidence",
      "Positioning and differentiation",
      "Offer clarity",
      "Trust architecture and buyer friction",
      "Competitor context",
      "30-day action plan",
    ],
    cta: "Request a Founder’s Audit",
    href: "/contact?intent=founders-audit&source=pricing",
  },
  {
    name: "Agency Claim QA",
    price: "From $1,500",
    cadence: "pilot",
    summary: "For agencies adding a documented claim-review step to client delivery.",
    includes: [
      "Agency client-site reviews",
      "Campaign and case-study claim QA",
      "Client-ready findings",
      "Launch and onboarding QA",
      "Repeatable per-client workflow",
    ],
    cta: "Discuss an Agency Pilot",
    href: "/contact?intent=agency-claim-qa&source=pricing",
  },
  {
    name: "Agent Evidence Pack",
    price: "From $2,500",
    cadence: "pilot",
    summary: "For teams reviewing customer-facing agent outputs against approved sources and policies.",
    includes: [
      "Supplied transcript testing",
      "Unsupported-promise findings",
      "Grounding failures",
      "Missing escalation and policy drift",
      "Dated evidence and remediation priorities",
    ],
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
          <div className="grid gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className="flex flex-col rounded-lg border border-sand-deep/45 bg-bone p-7">
                <div className="border-b border-sand-deep/30 pb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>{plan.cadence}</p>
                  <h2 className="mt-3 font-display text-3xl text-espresso">{plan.name}</h2>
                  <p className="mt-3 text-2xl font-semibold text-espresso">{plan.price}</p>
                  <p className="mt-4 text-sm leading-6 text-mist">{plan.summary}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-bark">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  onClick={() => trackEvent("pricing_plan_click", { plan_name: plan.name, destination: plan.href, section: "pricing" })}
                  className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-sage-deep px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
                >
                  {plan.cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <aside className="mt-8 rounded-lg border border-sand-deep/45 bg-cream p-7 md:flex md:items-center md:justify-between md:gap-8">
            <div className="flex gap-4">
              <Clock3 className="mt-1 h-5 w-5 shrink-0 text-sage-deep" aria-hidden="true" />
              <div>
                <h2 className="font-display text-2xl text-espresso">Monitoring is a later option.</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-mist">
                  Ongoing monitoring is scoped only where the workflow and update cadence are operationally supported. It is not presented as a self-serve product.
                </p>
              </div>
            </div>
            <Link href="/contact?intent=monitoring&source=pricing" className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso md:mt-0">
              Ask about monitoring
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
