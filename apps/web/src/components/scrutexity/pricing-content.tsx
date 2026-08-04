"use client";

import Link from "next/link";
import { ArrowRight, Check, RefreshCw, Search, Wrench } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const deliverables = [
  "8–12 agreed buyer-intent questions",
  "Captured answers across ChatGPT, Perplexity, and Google",
  "Exact answer, citation, engine, query, and capture date",
  "Comparison against the company’s published record",
  "Material discrepancy and source-contribution map",
  "Recommended changes to controllable source surfaces",
  "A rerun of the same question set after 14 days",
  "Before-and-after evidence record",
];

const stages = [
  {
    title: "Capture",
    body: "Agree on the buyer questions and preserve the answer conditions across three major AI answer surfaces.",
    icon: Search,
  },
  {
    title: "Align",
    body: "Compare material statements with the published record and change the source pages the company controls.",
    icon: Wrench,
  },
  {
    title: "Retest",
    body: "Rerun the same questions after 14 days and document what changed, what persisted, and what remains outside company control.",
    icon: RefreshCw,
  },
];

export default function PricingContent() {
  const href = "/contact?intent=buyer-narrative-alignment&source=pricing";

  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-18 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            One defined first engagement
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">
            Buyer Narrative Alignment Sprint
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist">
            Capture how AI answer engines describe your company, compare material statements with the published record, improve the sources you control, and rerun the same questions after 14 days.
          </p>
          <p className="mt-7 font-display text-4xl text-espresso">$1,500</p>
          <p className="mt-2 text-sm text-mist">Fixed first engagement · scope confirmed before payment</p>
          <Link
            href={href}
            onClick={() => trackEvent("pricing_plan_click", { plan_name: "Buyer Narrative Alignment Sprint", destination: href, section: "pricing-hero" })}
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
          >
            Request an Alignment Sprint
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Included</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">A before-and-after record, not a risk score.</h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              The sprint documents observable discrepancies and source changes. It does not determine legal status, guarantee answer-engine changes, or claim access to proprietary ranking systems.
            </p>
          </div>
          <ul className="grid gap-px border border-sand-deep/40 bg-sand-deep/40 sm:grid-cols-2">
            {deliverables.map((item) => (
              <li key={item} className="flex gap-3 bg-bone p-5 text-sm leading-6 text-bark">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Engagement sequence</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso md:text-5xl">Capture, align, then rerun.</h2>
          <ol className="mt-10 grid gap-px border border-sand-deep/40 bg-sand-deep/40 md:grid-cols-3">
            {stages.map(({ title, body, icon: Icon }, index) => (
              <li key={title} className="bg-bone p-7">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                  <span className="font-mono text-xs text-mist">0{index + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl text-espresso">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Start with the questions your buyers ask.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            No subscription is required. Broader agency or multi-product work is scoped only after the first engagement establishes a useful baseline.
          </p>
          <Link href={href} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
            Request the $1,500 Sprint
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
