"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  FileCheck2,
  FileSearch,
  Layers3,
  ScanSearch,
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { SourceReference } from "@/components/scrutexity/source-reference";

const SPRINT_URL = "/contact?intent=buyer-narrative-alignment&source=scrutexity-home";
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

const sprintDetails = [
  ["Question set", "8–12 agreed buyer-intent questions"],
  ["Surfaces", "ChatGPT, Perplexity, and Google"],
  ["Source work", "Published pages and citations the company can inspect"],
  ["Retest", "The same question set rerun after 14 days"],
] as const;

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
              See where AI answers and your published record diverge.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-mist md:text-lg md:leading-8">
              Scrutexity captures how major AI answer engines describe your company, compares material statements with the sources buyers can inspect, improves the pages you control, and reruns the same questions after 14 days.
            </p>
            <p className="mt-6 border-l border-sand-deep pl-4 text-sm leading-6 text-bark">
              Built for founder-led AI and software companies where buyer understanding matters during evaluation, diligence, and procurement.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href={SPRINT_URL}
                label="Request an Alignment Sprint"
                section="hero"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
              >
                Request an Alignment Sprint
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
                  Buyer-narrative exhibit
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-espresso">One captured discrepancy, bounded by evidence.</h2>
              </div>
              <p className="text-[10px] leading-5 text-mist" style={{ fontFamily: MONO }}>
                Illustrative data · reviewed Aug. 4, 2026
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <article id="exhibit-01" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>01 · Published record</p>
                <p className="mt-4 border-l border-sage-deep/55 pl-4 font-mono text-[15px] leading-7 text-espresso">
                  “Northstar routes support requests to the appropriate service queue.”
                </p>
                <SourceReference surface="Product page" className="mt-4 pl-4" />
              </article>

              <article id="exhibit-02" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>02 · Captured answer</p>
                <p className="mt-4 border-l border-sand-deep pl-4 font-mono text-[15px] leading-7 text-espresso">
                  “Northstar independently resolves customer support requests.”
                </p>
                <SourceReference surface="Illustrative AI answer capture" className="mt-4 pl-4" />
              </article>

              <article id="exhibit-03" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>03 · Observed discrepancy</p>
                <p className="mt-4 text-[15px] leading-7 text-bark">
                  The captured answer changes routing into autonomous resolution, a capability not found on the reviewed product page.
                </p>
                <SourceReference surface="Scrutexity comparison note" className="mt-4" />
                <p className="mt-2 font-mono text-[10px] leading-5 text-mist">Classification: Missing · Scope: Illustrative product wording and answer capture compared Aug. 4, 2026.</p>
              </article>

              <article id="exhibit-04" className="scroll-mt-32 border border-sand-deep/45 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso" style={{ fontFamily: MONO }}>04 · Next action</p>
                <p className="mt-4 border-l border-sage-deep/55 pl-4 font-mono text-[15px] leading-7 text-espresso">
                  Review the answer’s cited sources, clarify the routing boundary on the product page, then rerun the same question set.
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
                First engagement
              </p>
              <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">One defined sprint. One rerun.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-mist lg:justify-self-end">
              The Buyer Narrative Alignment Sprint creates a dated baseline, improves the public sources you control, and measures what changes after the same questions are asked again.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-sand-deep/45 bg-sand-deep/45 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="bg-espresso p-7 text-cream md:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-soft" style={{ fontFamily: MONO }}>Buyer Narrative Alignment Sprint</p>
              <p className="mt-5 font-display text-5xl">$1,500</p>
              <p className="mt-3 text-sm leading-6 text-cream/70">Fixed first engagement · scope confirmed before payment</p>
              <TrackedLink href={SPRINT_URL} label="Request an Alignment Sprint" section="offers" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-cream px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-sage-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-soft focus-visible:ring-offset-2 focus-visible:ring-offset-espresso">
                Request an Alignment Sprint<ArrowRight size={15} aria-hidden="true" />
              </TrackedLink>
            </div>
            <dl className="grid bg-white sm:grid-cols-2">
              {sprintDetails.map(([label, value]) => (
                <div key={label} className="border-b border-sand-deep/30 p-6 sm:border-r sm:last:border-r-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-deep" style={{ fontFamily: MONO }}>{label}</dt>
                  <dd className="mt-3 text-sm leading-6 text-mist">{value}</dd>
                </div>
              ))}
            </dl>
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
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Founder-led from capture through retest.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist">
            Nick Altstein leads every sprint, reviews each material discrepancy, and maintains the dated record of source changes and rerun results.
          </p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso">About the founder<ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <ScanSearch className="mx-auto h-7 w-7 text-sage-deep" aria-hidden="true" />
          <h2 className="mt-6 font-display text-4xl text-espresso md:text-6xl">Start with the questions your buyers already ask.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">
            Establish the current buyer narrative, improve the source material you control, and measure what changes after 14 days.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={SPRINT_URL}
              label="Request an Alignment Sprint"
              section="final-cta"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Request an Alignment Sprint
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
