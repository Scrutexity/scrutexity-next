import Link from "next/link";
import { ArrowRight, Check, FileSearch, ScanText, SquarePen, TriangleAlert } from "lucide-react";
import { CopyLinkButton } from "@/components/scrutexity/copy-link-button";
import { PrintReportButton } from "@/components/scrutexity/print-report-button";

const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const steps = [
  { title: "Capture the reviewed surface", body: "Record the public URL or supplied transcript set, the wording in context, and the review date.", icon: ScanText },
  { title: "Extract material claims", body: "Separate testable business promises from ordinary description so each claim can be reviewed on its own terms.", icon: FileSearch },
  { title: "Match visible support", body: "Look for evidence a buyer can inspect on the reviewed surface or through a directly linked source.", icon: Check },
  { title: "Classify the gap", body: "Record whether support is present, partial, missing, too narrow for the wording, or dependent on undefined terms.", icon: TriangleAlert },
  { title: "Draft safer framing", body: "Provide a narrower draft that stays closer to the evidence without pretending to replace owner, counsel, or clinical approval.", icon: SquarePen },
];

const classifications = [
  ["Present", "The reviewed surface includes visible support that directly matches the wording."],
  ["Partial", "Related support is visible, but it does not fully support the scope or specificity of the claim."],
  ["Missing", "No visible support was found within the reviewed surface or its directly linked sources."],
  ["Narrow", "The visible support covers a smaller population, condition, timeframe, or outcome than the claim."],
  ["Undefined", "A material term is not defined clearly enough for a buyer to evaluate the claim."],
] as const;

export default function MethodologyV1Content({ canonicalPath = "/methodology" }: { canonicalPath?: "/methodology" | "/methodology/v1" }) {
  return (
    <div className="print-document min-h-screen bg-cream text-bark">
      <section className="border-b border-sand-deep/30 bg-bone px-5 pb-20 pt-28 sm:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Methodology</p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-espresso md:text-6xl">Every finding should point back to something a buyer can inspect.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist">The Scrutexity method keeps the reviewed wording, visible support, stated gap, safer framing draft, and next action together in one dated report.</p>
          <p className="mt-6 text-xs leading-5 text-mist" style={{ fontFamily: MONO }}>
            Method v1.0 · Published Aug. 4, 2026 · Last updated Aug. 4, 2026 · 6 min read
          </p>
          <div className="mt-7 flex justify-center"><PrintReportButton label="Print methodology" /></div>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ol className="grid gap-px overflow-hidden rounded-lg border border-sand-deep/35 bg-sand-deep/35 lg:grid-cols-5">
            {steps.map(({ title, body, icon: Icon }, index) => (
              <li key={title} className="bg-bone p-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-sage-deep" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-mist" style={{ fontFamily: MONO }}>0{index + 1}</span>
                </div>
                <h2 className="mt-7 font-display text-2xl text-espresso">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="print-page-break border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8 md:py-24" aria-labelledby="classification-heading">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Classification system</p>
          <h2 id="classification-heading" className="mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso md:text-5xl">Five descriptive support states.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist">These labels describe the relationship between wording and visible support. They are not risk scores, legal conclusions, or approval marks.</p>
          <dl className="mt-10 divide-y divide-sand-deep/35 border-y border-sand-deep/45 bg-white">
            {classifications.map(([label, explanation]) => {
              const anchor = `classification-${label.toLowerCase()}`;
              return (
                <div key={label} id={anchor} tabIndex={-1} className="scroll-mt-32 px-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep sm:px-6">
                  <div className="grid gap-3 sm:grid-cols-[140px_1fr_auto] sm:items-start">
                    <dt className="font-mono text-[13px] font-semibold text-espresso">{label}</dt>
                    <dd className="text-sm leading-6 text-mist">{explanation}</dd>
                    <CopyLinkButton canonicalPath={canonicalPath} anchor={anchor} />
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="border-b border-sand-deep/30 bg-cream px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Shipped capabilities</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">The report contains the useful parts.</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Source-grounded extraction", "Visible-evidence matching", "Support-gap classification", "Safety-language scanning", "Safer framing drafts", "Dated report metadata"].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-bark"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <aside className="rounded-lg border border-sand-deep/45 bg-white p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay-deep" style={{ fontFamily: MONO }}>Boundaries</p>
            <h2 className="mt-4 font-display text-3xl text-espresso">A business review, not a substituted professional opinion.</h2>
            <p className="mt-5 text-sm leading-7 text-mist">Scrutexity does not provide legal advice, clinical advice, certification, or guaranteed outcomes. It does not determine whether a claim is legal or compliant. Findings describe reviewed public material or supplied transcripts and the support visible within the agreed scope.</p>
          </aside>
        </div>
      </section>

      <section id="changelog" className="scroll-mt-32 border-b border-sand-deep/30 bg-bone px-5 py-20 sm:px-8 md:py-24" aria-labelledby="changelog-heading">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-deep" style={{ fontFamily: MONO }}>Method changelog</p>
          <h2 id="changelog-heading" className="mt-4 font-display text-4xl text-espresso md:text-5xl">A public record of method changes.</h2>
          <article className="mt-9 border-y border-sand-deep/45 py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl text-espresso">Method v1.0</h3>
              <p className="font-mono text-xs text-mist">Published Aug. 4, 2026</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-mist"><strong className="text-espresso">Summary:</strong> Established capture, material-claim extraction, visible-support matching, five descriptive classifications, safer framing, and dated reporting.</p>
            <p className="mt-2 text-sm leading-7 text-mist"><strong className="text-espresso">Reason:</strong> Initial public method.</p>
          </article>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center sm:px-8 md:py-24" data-print-hidden>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">See the method in report form.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist">The sample uses fictional data and labels every field required to understand the finding and act on it.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/sample-report" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-sage-deep">View a Sample Report <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep">Review Pricing <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <p className="hidden border-t border-sand-deep/35 pt-4 font-mono text-[9pt] print:block">
        Scrutexity · Method v1.0 · https://www.scrutexity.com{canonicalPath} · published Aug. 4, 2026
      </p>
    </div>
  );
}
