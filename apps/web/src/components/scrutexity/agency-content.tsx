import Link from "next/link";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const AGENCY_SPRINT_URL = "/contact?intent=buyer-narrative-alignment-sprint&source=agency";

const workflow = [
  ["Choose one company or effort", "Use the sprint for the agency’s own positioning, one selected client, one case study, or one launch or repositioning effort."],
  ["Send the public surfaces", "Provide up to five core public pages and the buyer questions that matter."],
  ["Review the narrative", "Scrutexity maps up to 15 material claims to visible support and identifies the three highest-priority gaps."],
  ["Use the decision document", "Nick returns replacement framing, leads the readout, and incorporates one revision."],
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
                Apply the same Buyer Narrative Alignment Sprint to one selected engagement.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-mist">
                Use the sprint for your agency’s positioning, one client, one case study, or one launch or repositioning effort. The scope and delivery standard remain the same.
              </p>
            </div>
            <div className="rounded-lg border border-sand-deep/45 bg-white p-6">
              <p className="text-sm font-semibold text-sage-deep">Buyer Narrative Alignment Sprint</p>
              <p className="mt-2 font-display text-4xl text-espresso">$1,500 fixed fee</p>
              <p className="mt-3 text-sm leading-6 text-mist">Up to five public pages and 15 material claims, with a five-business-day target turnaround.</p>
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={AGENCY_SPRINT_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">
              Request an Agency Sprint
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Bounded scope</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">One sprint, one selected commercial question.</h2>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-sand-deep/35 bg-sand-deep/35 md:grid-cols-2">
            {["Up to five core public pages", "Up to 15 material claims", "Three priority buyer-narrative gaps", "Replacement framing for priority findings", "One concise decision document", "One 30-minute founder readout", "Five-business-day target turnaround", "One revision"].map((item) => (
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
              <h2 className="mt-5 font-display text-4xl text-espresso">How the sprint runs.</h2>
              <p className="mt-4 text-sm leading-7 text-mist">No dashboard or portfolio commitment is required. Start with one consequential piece of work.</p>
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
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Use one upcoming buyer decision as the test.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">Send the selected company, public pages, buyer question, and deadline. Nick will confirm whether the fixed sprint is a useful fit.</p>
          <Link href="/contact?intent=buyer-narrative-alignment-sprint&source=agency-bottom" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-sage-deep px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-espresso">
            Request an Agency Sprint
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
