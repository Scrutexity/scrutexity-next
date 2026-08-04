"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  FileCheck2,
  FileSearch,
  Layers3,
  ScanSearch,
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { SourceReference } from "@/components/scrutexity/source-reference";

const SNAPSHOT_URL = "/contact?intent=claim-support-review&source=scrutexity-home";
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const reviewSteps = [
  {
    number: "01",
    title: "Capture",
    body: "Review public pages or supplied customer-facing agent transcripts.",
    exampleLabel: "Captured source",
    example: "Homepage hero · exact wording retained",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Ground",
    body: "Match material claims to evidence a buyer can actually see and check.",
    exampleLabel: "Visible support",
    example: "Internal pilot result · scope recorded",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Prioritize",
    body: "Return the support gaps, trust issues, safer framing drafts, and next actions that matter most.",
    exampleLabel: "Priority action",
    example: "Restore pilot scope or publish the method",
    icon: Layers3,
  },
];

const premiumOffers = [
  {
    name: "Founder’s Audit",
    price: "From $750",
    outcome: "Full trust and positioning picture",
    scope: "Claims, positioning, offer clarity, and trust architecture",
    buyer: "Founder-led teams",
    turnaround: "Confirmed before work begins",
    cta: "Request a Founder’s Audit",
    href: "/contact?intent=founders-audit&source=home",
  },
  {
    name: "Agency Claim QA",
    price: "From $1,500",
    outcome: "Repeatable claim QA for client delivery",
    scope: "Client sites, campaigns, case studies, and launch review",
    buyer: "Agencies",
    turnaround: "Confirmed per engagement",
    cta: "Discuss an Agency Pilot",
    href: "/contact?intent=agency-claim-qa&source=home",
  },
  {
    name: "Agent Evidence Pack",
    price: "From $2,500",
    outcome: "Dated evidence review of supplied agent outputs",
    scope: "Transcripts, grounding, escalation, and policy drift",
    buyer: "Teams deploying customer-facing agents",
    turnaround: "Confirmed per evidence pack",
    cta: "Request an Agent Review",
    href: "/contact?intent=agent-evidence-pack&source=home",
  },
];

function TrackedLink({
  href,
  label,
  section,
  className,
  children,
}: {
  href: string;
  label: string;
  section: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackEvent("cta_click", {
          cta_label: label,
          destination: href,
          section,
        })
      }
    >
      {children}
    </Link>
  );
}

export default function UmbrellaHomepage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-cream px-5 pb-16 pt-24 sm:px-8 md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep"
              style={{ fontFamily: MONO }}
            >
              Scrutexity · Evidence-grounded business review
            </p>
            <h1 className="mt-7 max-w-4xl font-display text-5xl leading-[1.08] text-espresso sm:text-6xl lg:text-[4rem]">
              Find the claims and AI outputs your buyers can’t verify.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-mist md:text-lg md:leading-8">
              Scrutexity reviews public claims and customer-facing AI outputs, maps them to visible evidence, and gives you the fixes that matter first. Powered by AuditGPT.
            </p>
            <p className="mt-6 border-l border-sand-deep pl-4 text-sm leading-6 text-bark">
              For AI/SaaS teams, agencies, medical and wellness operators, and companies deploying customer-facing agents.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href={SNAPSHOT_URL}
                label="Get a Claim Snapshot"
                section="hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
              >
                Get a Claim Snapshot
                <ArrowRight size={16} aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/sample-report"
                label="View a Sample Report"
                section="hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-white px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
              >
                View a Sample Report
                <ArrowRight size={16} aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <div id="exhibit-claim-drift" className="border border-sand-deep/55 bg-bone p-3 sm:p-4">
            <div className="flex flex-col gap-2 border-b border-sand-deep/35 px-2 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>
                  Claim-drift exhibit
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-espresso">One claim, kept in context.</h2>
              </div>
              <p className="text-[10px] leading-5 text-mist" style={{ fontFamily: MONO }}>
                Illustrative data · reviewed Aug. 4, 2026
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <article id="exhibit-01" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>01 · Source wording</p>
                <p className="mt-4 border-l border-sage-deep/55 pl-4 font-mono text-[15px] leading-7 text-espresso">
                  “In a 30-day internal pilot, average first-response time fell from 11 minutes to 4 minutes.”
                </p>
                <SourceReference surface="Homepage hero" className="mt-4 pl-4" />
              </article>

              <article id="exhibit-02" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>02 · Changed wording</p>
                <p className="mt-4 border-l border-sand-deep pl-4 font-mono text-[15px] leading-7 text-espresso">
                  “Cut customer response time by 64%.”
                </p>
                <SourceReference surface="Campaign summary" className="mt-4 pl-4" />
              </article>

              <article id="exhibit-03" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>03 · Support gap</p>
                <p className="mt-4 text-[15px] leading-7 text-bark">
                  The broader statement drops the pilot scope and internal-test context.
                </p>
                <SourceReference surface="Scrutexity comparison note" className="mt-4" />
                <p className="mt-2 font-mono text-[10px] leading-5 text-mist">Classification: Narrow · Scope: Illustrative homepage and campaign-summary wording compared Aug. 4, 2026.</p>
              </article>

              <article id="exhibit-04" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>04 · Suggested framing</p>
                <p className="mt-4 border-l border-sage-deep/55 pl-4 font-mono text-[15px] leading-7 text-espresso">
                  “In a 30-day internal pilot, average first-response time fell from 11 minutes to 4 minutes. Results may vary by team and workflow.”
                </p>
                <SourceReference surface="Scrutexity review note" className="mt-4 pl-4" />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              What Scrutexity does
            </p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">A clear review path from source to action.</h2>
          </div>
          <ol className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-0 before:absolute before:left-[16.66%] before:right-[16.66%] before:top-9 before:hidden before:h-px before:bg-sand-deep md:before:block">
            {reviewSteps.map(({ number, title, body, exampleLabel, example, icon: Icon }) => (
              <li key={title} className="relative border border-sand-deep/45 bg-bone p-7 md:border-r-0 md:last:border-r">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center border border-sand-deep bg-white">
                    <Icon className="h-4 w-4 text-sage-deep" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] font-semibold text-mist" style={{ fontFamily: MONO }}>{number}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl text-espresso">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
                <div className="mt-6 border-t border-sand-deep/35 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{exampleLabel}</p>
                  <p className="mt-2 text-xs leading-5 text-bark">{example}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="offers" className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
                Product offers
              </p>
              <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">Start with the scope you actually need.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-mist lg:justify-self-end">
              The review is the product. Every scope ends with concrete findings, visible evidence notes, safer framing drafts, and a prioritized next step.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Premium engagements</p>
            <div className="mt-4 hidden overflow-hidden border border-sand-deep/45 bg-white lg:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b border-sand-deep/45 bg-bone">
                    <th className="w-[17%] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist" style={{ fontFamily: MONO }}>Compare</th>
                    {premiumOffers.map((offer) => (
                      <th key={offer.name} className="border-l border-sand-deep/35 px-5 py-4 align-top">
                        <span className="block font-display text-2xl font-normal text-espresso">{offer.name}</span>
                        <span className="mt-2 block text-sm font-semibold text-espresso">{offer.price}</span>
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
                    <tr key={field} className="border-b border-sand-deep/30 last:border-b-0">
                      <th className="bg-bone px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{label}</th>
                      {premiumOffers.map((offer) => (
                        <td key={offer.name} className="border-l border-sand-deep/30 px-5 py-4 text-sm leading-6 text-mist">{offer[field as keyof typeof offer]}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th className="bg-bone px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>Next step</th>
                    {premiumOffers.map((offer) => (
                      <td key={offer.name} className="border-l border-sand-deep/30 px-5 py-4">
                        <TrackedLink href={offer.href} label={offer.cta} section="offers" className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2">
                          {offer.cta}<ArrowRight size={14} aria-hidden="true" />
                        </TrackedLink>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-4 lg:hidden">
              {premiumOffers.map((offer) => (
                <article key={offer.name} className="border border-sand-deep/45 bg-white p-6">
                  <div className="flex flex-col gap-2 border-b border-sand-deep/30 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-display text-3xl text-espresso">{offer.name}</h3>
                    <p className="text-sm font-semibold text-espresso">{offer.price}</p>
                  </div>
                  <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Outcome", offer.outcome],
                      ["Scope", offer.scope],
                      ["Buyer", offer.buyer],
                      ["Target turnaround", offer.turnaround],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{label}</dt>
                        <dd className="mt-2 text-sm leading-6 text-mist">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <TrackedLink href={offer.href} label={offer.cta} section="offers" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2">
                    {offer.cta}<ArrowRight size={14} aria-hidden="true" />
                  </TrackedLink>
                </article>
              ))}
            </div>

            <aside className="mt-8 border-y border-sand-deep/45 bg-bone px-6 py-7 md:flex md:items-center md:justify-between md:gap-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>Start with one page</p>
                <h3 className="mt-3 font-display text-3xl text-espresso">Claim Support Review · $99</h3>
                <p className="mt-3 text-sm leading-6 text-mist">Focused review · 48-hour target turnaround</p>
              </div>
              <TrackedLink href="/contact?intent=claim-support-review&source=home" label="Start a Claim Review" section="offers" className="mt-6 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 md:mt-0">
                Start a Claim Review<ArrowRight size={15} aria-hidden="true" />
              </TrackedLink>
            </aside>
          </div>
        </div>
      </section>

      <section id="sample-report" className="border-b border-sand-deep/30 bg-espresso px-5 py-20 text-cream sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-soft" style={{ fontFamily: MONO }}>
              Sample report
            </p>
            <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">See the finding, evidence, gap, and next move.</h2>
            <p className="mt-5 text-sm leading-7 text-cream/70">
              The sample is a transparent fixture built to show the report format. No customer, traction, or outcome is implied.
            </p>
            <TrackedLink
              href="/sample-report"
              label="View the Sample Report"
              section="sample-report"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-cream px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-sage-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-soft focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              View the Sample Report
              <ArrowRight size={15} aria-hidden="true" />
            </TrackedLink>
          </div>

          <article id="exhibit-05" className="scroll-mt-32 border border-cream/20 bg-white p-6 text-bark md:p-8">
            <div className="flex flex-col gap-2 border-b border-sand-deep/40 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>
                  Illustrative data · not live customer output
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-espresso">Primary finding · Claim Support Record</h3>
              </div>
              <time dateTime="2026-08-04" className="text-xs text-mist">Reviewed Aug. 4, 2026</time>
            </div>
            <dl className="mt-6 divide-y divide-sand-deep/30 border-y border-sand-deep/30">
              <div className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Executive verdict</dt>
                <dd className="text-sm font-semibold leading-6 text-espresso">Material claim needs narrower wording or visible support.</dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>Exact claim</dt>
                <dd>
                  <p className="border-l border-sage-deep/55 pl-4 font-mono text-[15px] leading-7 text-espresso">“Resolve 80% of support tickets automatically.”</p>
                  <SourceReference surface="Homepage hero" className="mt-3 pl-4" />
                  <p className="mt-2 pl-4 font-mono text-[10px] leading-5 text-mist">Scope: Visible homepage copy reviewed on Aug. 4, 2026.</p>
                </dd>
              </div>
              {[
                ["Visible support", "Product page names the feature; no public evaluation method is linked."],
                ["Classification", "Partial — related capability is described, but the numeric result is not visibly supported."],
                ["Why it matters", "A buyer cannot reproduce or qualify the headline result from the public material."],
                ["Next action", "Publish the evaluation method or narrow the claim to the tested context."],
              ].map(([term, value]) => (
                <div key={term} className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>{term}</dt>
                  <dd className="text-sm leading-6 text-mist">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/sample-report" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2">
              Open the permanent sample report <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section id="agencies" className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>For agencies</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl text-espresso md:text-5xl">
              Add claim QA to every client launch without building an internal audit team.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-mist">
              Review websites, campaigns, and case-study claims before launch, then hand the client a clear record of what was checked and what needs approval.
            </p>
            <TrackedLink
              href="/agency"
              label="Explore Agency Claim QA"
              section="agencies"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-sage-deep px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Explore Agency Claim QA
              <ArrowRight size={15} aria-hidden="true" />
            </TrackedLink>
          </div>
          <div className="rounded-lg border border-sand-deep/40 bg-bone p-7">
            <Building2 className="h-6 w-6 text-sage-deep" aria-hidden="true" />
            <ul className="mt-7 divide-y divide-sand-deep/30">
              {["Website and campaign reviews", "Case-study claim reviews", "Client-ready reports", "Fixed turnaround", "Pilot pricing from $1,500"].map((item) => (
                <li key={item} className="flex items-center gap-3 py-4 text-sm font-medium text-espresso">
                  <Check className="h-4 w-4 text-sage-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="methodology" className="border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Methodology</p>
              <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">Ground every finding in a source a buyer can inspect.</h2>
              <ul className="mt-8 grid gap-3 text-sm text-bark sm:grid-cols-2">
                {["Source-grounded extraction", "Visible-evidence matching", "Support-gap classification", "Safety-language scanning", "Safer framing drafts", "Dated report metadata"].map((item) => (
                  <li key={item} className="flex gap-2">
                    <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/methodology" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso">
                Read the methodology
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <aside className="rounded-lg border border-sand-deep/45 bg-white p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-deep" style={{ fontFamily: MONO }}>Boundaries</p>
              <h3 className="mt-4 font-display text-3xl text-espresso">What the review is, and what it is not.</h3>
              <p className="mt-5 text-sm leading-7 text-mist">
                Scrutexity provides evidence-grounded business review. It does not provide legal advice, clinical advice, certification, or guaranteed outcomes. Findings are based on reviewed public material, supplied transcripts, and visible support.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-bone px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Founder-reviewed, not blindly generated.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist">
            Scrutexity was built by Nick, who personally reviews every paid Claim Support Review and Founder’s Audit before delivery.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Bot className="mx-auto h-7 w-7 text-sage-deep" aria-hidden="true" />
          <h2 className="mt-6 font-display text-4xl text-espresso md:text-6xl">Start with one claim your buyers may question.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            AuditGPT handles the first-pass snapshot. Scrutexity turns the important findings into a prioritized business review.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={SNAPSHOT_URL}
              label="Get a Claim Snapshot"
              section="final-cta"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Get a Claim Snapshot
              <ArrowRight size={16} aria-hidden="true" />
            </TrackedLink>
            <a
              href="mailto:nick@scrutexity.com?subject=Scrutexity%20review%20inquiry"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Email Nick
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
