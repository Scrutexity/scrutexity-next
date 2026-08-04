import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "What Scrutexity Does | Evidence-Grounded Business Review",
  description: "A plain-language explanation of Scrutexity’s public claim, visible evidence, and customer-facing AI output review services and boundaries.",
  alternates: { canonical: "/what-we-do" },
};

const rows = [
  ["Review material claims on public pages.", "Decide whether a claim is legal, compliant, or approved."],
  ["Review supplied customer-facing agent transcripts.", "Access private systems or customer data without an agreed scope."],
  ["Map claims to support a buyer can see or inspect.", "Treat hidden assertions as public evidence."],
  ["Classify support gaps and trust friction.", "Provide legal, clinical, regulatory, or underwriting opinions."],
  ["Draft narrower language and prioritize next actions.", "Certify a business or guarantee outcomes."],
];

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-cream px-5 pb-20 pt-28 text-bark sm:px-8 md:pb-28 md:pt-40">
      <main className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Operating boundary</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-espresso md:text-6xl">Evidence-grounded review, with the limits stated plainly.</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-mist">Scrutexity captures how AI answer engines describe a company, compares material statements with its published record, improves the sources the company controls, and reruns the same questions after 14 days.</p>
        </header>

        <section className="mt-12 overflow-hidden rounded-lg border border-sand-deep/45 bg-white">
          <div className="grid grid-cols-2 border-b border-sand-deep/35 bg-bone">
            <h2 className="px-5 py-4 text-sm font-semibold text-sage-deep sm:px-7">What we do</h2>
            <h2 className="border-l border-sand-deep/35 px-5 py-4 text-sm font-semibold text-clay-deep sm:px-7">What we do not do</h2>
          </div>
          {rows.map(([does, doesNot]) => (
            <div key={does} className="grid grid-cols-2 border-b border-sand-deep/30 last:border-b-0">
              <div className="flex gap-3 px-5 py-6 text-sm leading-6 text-mist sm:px-7">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                <p>{does}</p>
              </div>
              <div className="flex gap-3 border-l border-sand-deep/30 px-5 py-6 text-sm leading-6 text-mist sm:px-7">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-clay-deep" aria-hidden="true" />
                <p>{doesNot}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-lg border border-sand-deep/45 bg-bone p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl text-espresso">The simple test: can a buyer inspect the support behind the claim?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-mist">When the answer is unclear, the review records the exact wording, visible support, remaining gap, safer framing draft, and next action.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/sample-report" className="inline-flex min-h-11 items-center justify-center rounded-md border border-sand-deep bg-white px-5 py-2.5 text-sm font-semibold text-espresso">View a Sample Report</Link>
            <Link href="/contact?intent=buyer-narrative-alignment&source=what-we-do" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">Request an Alignment Sprint <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
