"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const SPRINT_URL = "/contact?intent=buyer-narrative-alignment-sprint&source=pricing";

const included = [
  "Up to five core public pages",
  "Up to 15 material claims",
  "Visible evidence and support review",
  "Three highest-priority buyer-narrative gaps",
  "Replacement framing for priority findings",
  "One concise decision document",
  "One 30-minute founder readout",
  "One revision",
];

const excluded = [
  "Legal or clinical advice",
  "Certification or approval",
  "A guarantee of commercial outcomes",
  "Ongoing monitoring or unlimited revisions",
  "Private-system review outside the agreed inputs",
];

export default function PricingContent() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-18 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
            One defined engagement
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">
            Buyer Narrative Alignment Sprint
          </h1>
          <p className="mt-5 font-display text-4xl text-espresso">$1,500 fixed fee</p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist">
            A founder-reviewed analysis of what your company claims, what buyers can verify, where the story breaks, and what to change before the next sales conversation.
          </p>
          <Link
            href={SPRINT_URL}
            onClick={() => trackEvent("cta_click", { cta_label: "Request the $1,500 Sprint", destination: SPRINT_URL, section: "pricing-hero" })}
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
          >
            Request the $1,500 Sprint
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Who it is for</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">For a consequential buyer conversation.</h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              The sprint is designed for founder-led companies and agencies preparing one selected company, launch, case study, or repositioning effort for buyer scrutiny.
            </p>
            <dl className="mt-8 divide-y divide-sand-deep/35 border-y border-sand-deep/45">
              <div className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                <dt className="text-xs font-semibold text-sage-deep">Target turnaround</dt>
                <dd className="text-sm text-mist">Five business days after the agreed inputs are received</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                <dt className="text-xs font-semibold text-sage-deep">Founder involvement</dt>
                <dd className="text-sm text-mist">Nick reviews every material finding and leads the 30-minute readout</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                <dt className="text-xs font-semibold text-sage-deep">How to begin</dt>
                <dd className="text-sm text-mist">Send the company URL, buyer question, and relevant public pages for fit review</dd>
              </div>
            </dl>
          </div>

          <div className="border border-sand-deep/45 bg-bone p-7 md:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Included</p>
            <ul className="mt-6 grid gap-px overflow-hidden border border-sand-deep/35 bg-sand-deep/35 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex gap-3 bg-white p-5 text-sm leading-6 text-espresso">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-deep" style={{ fontFamily: MONO }}>Not included</p>
            <h2 className="mt-4 font-display text-4xl text-espresso">The boundary is explicit.</h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              The sprint is evidence-grounded strategic review. It is not legal advice, clinical advice, certification, or a guarantee of commercial outcomes.
            </p>
          </div>
          <ul className="divide-y divide-sand-deep/35 border-y border-sand-deep/45">
            {excluded.map((item) => (
              <li key={item} className="flex gap-3 py-5 text-sm leading-6 text-mist">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-clay-deep" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Start with the next buyer decision.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            Nick will review the company, requested scope, and whether the sprint is a useful fit. No payment is taken through the inquiry form.
          </p>
          <Link href={SPRINT_URL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
            Request the Buyer Narrative Alignment Sprint
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
