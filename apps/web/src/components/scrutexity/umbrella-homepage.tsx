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

const SNAPSHOT_URL = "/contact?intent=claim-support-review&source=scrutexity-home";
const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const reviewSteps = [
  {
    number: "01",
    title: "Capture",
    body: "Review public pages or supplied customer-facing agent transcripts.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Ground",
    body: "Match material claims to evidence a buyer can actually see and check.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Prioritize",
    body: "Return the support gaps, trust issues, safer framing drafts, and next actions that matter most.",
    icon: Layers3,
  },
];

const offers = [
  {
    name: "Claim Support Review",
    price: "$99 one-time",
    description: "A focused review of the public claims on one priority page.",
    includes: [
      "Material public claims",
      "Visible evidence and support gaps",
      "Priority findings",
      "Safer framing drafts",
      "48-hour target turnaround",
    ],
    cta: "Start a Claim Review",
    href: "/contact?intent=claim-support-review&source=home",
  },
  {
    name: "Founder’s Audit",
    price: "From $750",
    description: "A broader business review for founders tightening how the company earns trust.",
    includes: [
      "Claims and evidence",
      "Positioning and differentiation",
      "Offer clarity and buyer friction",
      "Trust architecture",
      "30-day action plan",
    ],
    cta: "Request a Founder’s Audit",
    href: "/contact?intent=founders-audit&source=home",
  },
  {
    name: "Agency Claim QA",
    price: "Pilot from $1,500",
    description: "A repeatable review layer for client launches, campaigns, and case studies.",
    includes: [
      "Agency client-site reviews",
      "Client-ready findings",
      "Launch and onboarding QA",
      "Case-study claim review",
      "Repeatable per-client workflow",
    ],
    cta: "Discuss an Agency Pilot",
    href: "/contact?intent=agency-claim-qa&source=home",
  },
  {
    name: "Agent Evidence Pack",
    price: "Pilot from $2,500",
    description: "Transcript-based review for customer-facing agents making consequential promises.",
    includes: [
      "Supplied transcript testing",
      "Unsupported-promise findings",
      "Grounding and escalation gaps",
      "Policy drift",
      "Dated remediation priorities",
    ],
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
      <section className="border-b border-sand-deep/30 bg-cream px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep"
            style={{ fontFamily: MONO }}
          >
            Scrutexity · Evidence-grounded business review
          </p>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-espresso sm:text-6xl lg:text-7xl">
                Find the claims and AI outputs your buyers can’t verify.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-mist">
                Scrutexity reviews public claims and customer-facing AI outputs, maps them to visible evidence, and gives you the fixes that matter first. Powered by AuditGPT.
              </p>
            </div>

            <div className="border-l-2 border-sage-deep/45 pl-5">
              <p className="text-sm leading-6 text-bark">
                For AI/SaaS teams, agencies, medical and wellness operators, and companies deploying customer-facing agents.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              View a Sample Report
              <ArrowRight size={16} aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>
              Claim-drift demonstration
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">
              Keep the wording, evidence, and review history in the same record.
            </h2>
            <p className="mt-5 text-sm leading-7 text-mist">
              Sample fixture with illustrative data. It is not live customer output.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-lg border border-sand-deep/45 bg-white lg:grid-cols-3">
            <article className="border-b border-sand-deep/30 p-6 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>
                01 · Source wording
              </p>
              <blockquote className="mt-5 font-display text-2xl leading-8 text-espresso">
                “In a 30-day internal pilot, average first-response time fell from 11 minutes to 4 minutes.”
              </blockquote>
              <p className="mt-6 text-xs leading-5 text-mist">Source captured · 2026-08-04 · Fictional example</p>
            </article>

            <article className="border-b border-sand-deep/30 bg-cream-deep/45 p-6 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-deep" style={{ fontFamily: MONO }}>
                02 · Changed wording
              </p>
              <blockquote className="mt-5 font-display text-2xl leading-8 text-espresso">
                “Cut customer response time by 64%.”
              </blockquote>
              <div className="mt-6 rounded-md border border-clay/35 bg-bone p-4">
                <p className="text-xs font-semibold text-clay-deep">Support gap detected</p>
                <p className="mt-2 text-xs leading-5 text-mist">The broader statement drops the pilot scope and internal-test context.</p>
              </div>
            </article>

            <article className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>
                03 · Review record updated
              </p>
              <p className="mt-5 text-sm font-semibold text-espresso">Safer framing draft</p>
              <p className="mt-3 text-sm leading-6 text-mist">
                “In a 30-day internal pilot, average first-response time fell from 11 minutes to 4 minutes. Results may vary by team and workflow.”
              </p>
              <p className="mt-6 text-xs leading-5 text-mist">Dated review note · evidence requirement retained</p>
            </article>
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
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-sand-deep/35 bg-sand-deep/35 md:grid-cols-3">
            {reviewSteps.map(({ number, title, body, icon: Icon }) => (
              <li key={title} className="bg-bone p-7">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-mist" style={{ fontFamily: MONO }}>{number}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl text-espresso">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
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

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.name} className="flex flex-col rounded-lg border border-sand-deep/45 bg-bone p-7">
                <div className="flex flex-col gap-2 border-b border-sand-deep/30 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-3xl text-espresso">{offer.name}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-mist">{offer.description}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-sage-deep">{offer.price}</p>
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-bark sm:grid-cols-2">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={offer.href}
                  label={offer.cta}
                  section="offers"
                  className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-sand-deep bg-white px-4 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
                >
                  {offer.cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </TrackedLink>
              </article>
            ))}
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

          <article className="rounded-lg border border-cream/15 bg-cream p-6 text-bark md:p-8">
            <div className="flex flex-col gap-2 border-b border-sand-deep/40 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep" style={{ fontFamily: MONO }}>
                  Sample · illustrative data, not live customer output
                </p>
                <h3 className="mt-2 font-display text-3xl text-espresso">Claim Support Record</h3>
              </div>
              <span className="text-xs text-mist">Reviewed 2026-08-04</span>
            </div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["Executive verdict", "Material claim needs narrower wording or visible support."],
                ["Exact reviewed claim", "“Resolve 80% of support tickets automatically.”"],
                ["Visible evidence", "Product page names the feature; no public evaluation method is linked."],
                ["Support gap", "No test set, sample size, exclusions, or definition of resolved."],
                ["Business impact", "A buyer cannot reproduce or qualify the headline result."],
                ["Recommended next step", "Publish the evaluation method or narrow the claim to the tested context."],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage-deep" style={{ fontFamily: MONO }}>{term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-mist">{value}</dd>
                </div>
              ))}
            </dl>
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

      <section id="pricing" className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Pricing</p>
              <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">Starting prices, stated plainly.</h2>
            </div>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep hover:text-espresso">
              Compare scopes
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-sand-deep/45 bg-bone">
            {[
              ["Claim Support Review", "$99"],
              ["Founder’s Audit", "from $750"],
              ["Agency Claim QA Pilot", "from $1,500"],
              ["Agent Evidence Pack", "from $2,500"],
              ["Monitoring", "Later option · contact"],
            ].map(([name, price]) => (
              <div key={name} className="flex flex-col gap-1 border-b border-sand-deep/30 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-espresso">{name}</span>
                <span className="text-sm text-mist">{price}</span>
              </div>
            ))}
          </div>
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
