import Link from "next/link";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const workflow = [
  ["Send the surface", "Provide the draft site, campaign, case study, or onboarding asset."],
  ["Review the claims", "Scrutexity maps material statements to support visible in the supplied or public material."],
  ["Return client-ready findings", "Your team receives priority issues, safer framing drafts, and approval questions."],
  ["Keep the decision record", "The final packet records what was reviewed, what changed, and what still needs client approval."],
];

export default function AgencyContent() {
  return (
    <div className="min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>For agencies</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h1 className="font-display text-5xl leading-tight text-espresso md:text-6xl">
                Add claim QA to every client launch without building an internal audit team.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-mist">
                Scrutexity reviews websites, campaigns, and case-study claims, then returns a client-ready record of the support gaps, safer framing drafts, and decisions still waiting on approval.
              </p>
            </div>
            <div className="rounded-lg border border-sand-deep/45 bg-white p-6">
              <p className="text-sm font-semibold text-sage-deep">Agency Claim QA</p>
              <p className="mt-2 font-display text-4xl text-espresso">From $1,500</p>
              <p className="mt-3 text-sm leading-6 text-mist">Three client sites, up to 15 material claims per site, with a 72-hour target turnaround.</p>
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact?intent=agency-claim-qa&source=agency" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
              Request Agency Claim QA
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/sample-report" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">
              View the Report Format
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Included in the pilot</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">A useful review layer around work you already deliver.</h2>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-sand-deep/35 bg-sand-deep/35 md:grid-cols-2">
            {[
              "Three client sites",
              "Up to 15 material claims per site",
              "Client-ready findings",
              "Safer framing drafts",
              "72-hour target turnaround",
              "One revision",
              "Co-branded delivery during the initial pilot",
              "Fully white-label delivery only by separate agreement",
            ].map((item) => (
              <li key={item} className="flex gap-3 bg-bone p-6 text-sm font-medium text-espresso">
                <Check className="h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <FileCheck2 className="h-6 w-6 text-sage-deep" aria-hidden="true" />
              <h2 className="mt-5 font-display text-4xl text-espresso">How the pilot runs.</h2>
              <p className="mt-4 text-sm leading-7 text-mist">No dashboard rollout is required. Start with a real client deliverable and judge the usefulness of the work.</p>
            </div>
            <ol className="overflow-hidden rounded-lg border border-sand-deep/45 bg-bone">
              {workflow.map(([title, body], index) => (
                <li key={title} className="grid gap-3 border-b border-sand-deep/30 p-6 last:border-b-0 sm:grid-cols-[40px_1fr]">
                  <span className="text-sm font-semibold text-sage-deep">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl text-espresso">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mist">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Use one upcoming launch as the test.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">Use the inquiry form and select Agency Claim QA. Send the three client URLs and deadline; Nick will confirm the scope before work begins.</p>
          <Link href="/contact?intent=agency-claim-qa&source=agency-bottom" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-sage-deep px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-espresso">
            Request Agency Claim QA
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
