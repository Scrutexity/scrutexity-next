"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { ClaimFindingCard } from "@/components/scrutexity/motion/claim-finding-card";
import { ExhibitA } from "@/components/scrutexity/motion/exhibit-a";
import { DatedRecordTimeline } from "@/components/scrutexity/motion/dated-record-timeline";
import { DifferentiationCompare } from "@/components/scrutexity/motion/differentiation-compare";
import { ScanReviewRecordPipeline } from "@/components/scrutexity/motion/scan-review-record";
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const SNAPSHOT_URL = "/snapshot";
function IndexRule({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-medium tracking-[0.14em] text-mist" style={{ fontFamily: MONO }}>{index}</span>
      <span className="h-px w-8 bg-sand-deep" aria-hidden />
      <span className="text-[11px] font-semibold tracking-[0.14em] text-clay uppercase" style={{ fontFamily: MONO }}>{label}</span>
    </div>
  );
}
export default function UmbrellaHomepage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-bark">
      <section className="relative border-b border-sand-deep/25 bg-bone">
        <div className="border-b border-sand-deep/20 bg-cream/50">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 sm:px-8">
            <span className="text-[10px] tracking-[0.16em] text-mist uppercase" style={{ fontFamily: MONO }}>01 — Claim Intelligence Standard</span>
            <span className="hidden text-[10px] tracking-[0.16em] text-mist/70 uppercase sm:inline" style={{ fontFamily: MONO }}>EST. 2024 — New York &middot; Public pages only &middot; Source-linked</span>
            <span className="text-[10px] tracking-[0.16em] text-clay" style={{ fontFamily: MONO }}>DATED RECORD 063</span>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-20 lg:gap-16 lg:py-24">
            <div className="relative">
              <div className="absolute -left-6 top-1 hidden h-[84%] w-px bg-sand-deep/60 lg:block" aria-hidden />
              <p className="text-[11px] font-medium tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>Scrutexity — Forensic intelligence for public claims</p>
              <h1 className="mt-6 font-display text-[2.6rem] leading-[0.98] tracking-[-0.03em] text-espresso sm:text-[3.5rem] lg:text-[4.6rem]">
                Timestamped<span className="font-display italic font-normal text-clay"> evidence</span><br/>infrastructure<br/><span className="text-[0.72em] font-normal tracking-[-0.02em] text-mist">for public marketing claims.</span>
              </h1>
              <div className="mt-8 max-w-[44ch] border-l border-clay/30 pl-5">
                <p className="text-[15px] leading-7 text-bark">Scrutexity monitors public web copy, flags FTC/FDA pattern mismatches and AI claim distortions, and generates a dated, hash-chained audit record.</p>
                <p className="mt-3 text-[13px] leading-6 text-mist">Built for high-risk sectors — wellness / med-spa, GLP-1, aesthetic devices — deal teams, General Counsel, and growth leaders.</p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link href="#scanner" onClick={() => trackEvent("cta_click", { cta_label: "Run Free Scanner", section: "hero" })} className="inline-flex min-h-[44px] items-center gap-2 bg-espresso px-7 py-3 text-[13px] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-clay-deep">Scan public URL <ArrowRight size={14} aria-hidden="true" /></Link>
                <Link href="/methodology" className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] text-espresso underline decoration-sand-deep underline-offset-4 decoration-1 hover:decoration-clay">View methodology <ArrowUpRight size={14} aria-hidden="true" /></Link>
              </div>
              <div className="mt-10 flex items-center gap-3 border-t border-sand-deep/25 pt-4">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
                <span className="text-[11px] tracking-[0.08em] text-mist" style={{ fontFamily: MONO }}>Not a law firm · Not legal advice · Evidence first, always dated</span>
              </div>
            </div>
            <div className="relative lg:pl-4">
              <div className="relative border border-sand-deep bg-cream p-3">
                <div className="absolute -top-px left-6 right-6 h-px bg-clay/40" aria-hidden />
                <div className="flex items-center justify-between border-b border-sand-deep/30 px-3 py-2.5">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>Exhibit preview — 063</span>
                  <span className="border border-amber-badge/20 bg-amber-bg px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-badge" style={{ fontFamily: MONO }}>FLAGGED</span>
                </div>
                <div className="pt-3"><ClaimFindingCard /></div>
                <div className="mt-3 flex items-center justify-between px-1 text-[10px] tracking-[0.08em] text-mist/70" style={{ fontFamily: MONO }}><span>capture 2026-08-05 · hash-chained</span><span className="hidden sm:inline">scrutexity.com/verify</span></div>
              </div>
              <div className="absolute -bottom-1 left-4 right-4 h-px bg-espresso/5" aria-hidden />
            </div>
          </div>
        </div>
      </section>
      <section id="scanner" className="border-b border-sand-deep/25 bg-cream px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-[980px]">
          <div className="border border-sand-deep bg-bone">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-deep bg-cream px-6 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 border border-teal-deep/20 bg-teal-deep/10 flex items-center justify-center text-[11px] font-bold text-teal-deep" style={{ fontFamily: MONO }}>02</span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>Free scanner — powered by AuditGPT</p>
                  <h2 className="font-display text-[1.5rem] leading-none tracking-[-0.02em] text-espresso">Run an instant 3-point claim audit</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-sand-deep bg-bone px-2.5 py-1 text-[10px] tracking-wide text-mist" style={{ fontFamily: MONO }}>PUBLIC PAGES ONLY</span>
                <span className="border border-amber-badge/25 bg-amber-bg px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-badge" style={{ fontFamily: MONO }}>NOT LEGAL ADVICE</span>
              </div>
            </div>
            <div className="px-6 py-7 md:px-8 md:py-8">
              <form action={SNAPSHOT_URL} className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1 border-b border-sand-deep bg-cream focus-within:border-teal-deep">
                    <input type="url" name="url" required placeholder="https://yourbrand.com/landing-page" className="w-full bg-transparent px-4 py-4 text-[14px] text-espresso placeholder:text-mist/60 focus:outline-none" style={{ fontFamily: MONO }} />
                  </div>
                  <button type="submit" className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 bg-teal-deep px-8 text-[13px] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-teal-deep/90">Scan page <ArrowRight size={14} aria-hidden="true" /></button>
                </div>
                <div className="flex flex-wrap justify-between gap-2 px-1 text-[11px] text-mist" style={{ fontFamily: MONO }}><span><span className="text-teal-deep font-semibold">e.g.</span> https://yourbrand.com/landing-page</span><span>Encrypted · Delivered by email in 3 min · Dated record</span></div>
              </form>
              <div className="mt-7 border border-sand-deep/60 bg-cream px-4 py-4">
                <div className="flex items-center justify-between"><span className="text-[10px] font-semibold tracking-[0.12em] text-mist uppercase" style={{ fontFamily: MONO }}>Sample finding preview</span><span className="text-[10px] font-bold tracking-wide text-amber-badge" style={{ fontFamily: MONO }}>[FLAGGED]</span></div>
                <p className="mt-2 text-[13px] leading-6" style={{ fontFamily: MONO }}><span className="font-bold text-amber-badge">“Reverses aging at cellular level”</span><span className="text-mist"> → </span><span className="text-bark">FTC pattern match:</span> <span className="text-mist">Unsubstantiated biological mechanism claim.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="example" className="border-b border-sand-deep/25 bg-bone px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-start lg:gap-16">
            <div className="md:sticky md:top-28">
              <IndexRule index="03" label="What we find" />
              <h2 className="mt-4 font-display text-[2.2rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.8rem]">One claim.<br/>One evidence gap.<br/><span className="italic font-normal text-clay">One clearer path.</span></h2>
              <p className="mt-5 max-w-[32ch] border-l border-sand-deep pl-4 text-[14px] leading-7 text-mist">Not a risk score. A dated exhibit that names the claim, the gap, and the safer wording — with sources.</p>
              <Link href="/sample-report" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso underline decoration-sand-deep underline-offset-4 hover:decoration-clay">See full sample report <ArrowUpRight size={14} /></Link>
            </div>
            <div className="border border-sand-deep bg-cream p-4 md:p-5"><ExhibitA /></div>
          </div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px] grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <IndexRule index="04" label="Intelligence, not a score" />
            <h2 className="mt-4 font-display text-[2.1rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.6rem]">More than a<br/>risk score.</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-bark">
              <p>Most tools assign a mysterious “risk score” and leave you to interpret it.</p>
              <p className="border-l border-clay pl-4 text-espresso">Scrutexity shows what is missing and what to say instead. Claim, evidence gap, and a safer phrasing — dated and source-linked.</p>
            </div>
          </div>
          <div className="border border-sand-deep bg-bone p-4"><DifferentiationCompare /></div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-bone px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><IndexRule index="05" label="Process" /><h2 className="mt-4 font-display text-[2.1rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.6rem]">Three steps. Dated.</h2></div>
            <p className="max-w-[38ch] text-[13px] leading-6 text-mist" style={{ fontFamily: MONO }}>Scan → review → record. Every finding is hash-chained and verifiable at /verify.</p>
          </div>
          <div className="mt-10 border border-sand-deep bg-cream"><ScanReviewRecordPipeline /></div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px] grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <IndexRule index="06" label="The exposure" />
            <h2 className="mt-4 font-display text-[2.1rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.6rem]">Find the claim on page nine before the regulator does.</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-bark">
              <p>Claims used to live on pages people chose to read. Now they live inside answer systems that summarize, compress, and repeat them to buyers, counterparties, and regulators who never visit the site.</p>
              <p className="border-l border-clay pl-4 text-espresso">A weakly supported claim no longer sits quietly on page nine. It gets restated as fact, stripped of qualifiers, in a context you do not control.</p>
            </div>
          </div>
          <div className="border border-sand-deep bg-bone">
            <div className="border-b border-sand-deep bg-cream px-6 py-3.5"><p className="text-[11px] font-semibold tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>Automated trigger points</p></div>
            <ul className="divide-y divide-sand-deep/50">
              <li className="flex gap-4 px-6 py-5"><span className="text-[11px] font-medium tracking-wide text-clay" style={{ fontFamily: MONO }}>01</span><div><h4 className="text-[13px] font-semibold tracking-[0.01em] text-espresso">FTC Sec. 5 — Guarantees</h4><p className="mt-1 text-[13px] leading-6 text-mist">Absolute promises, “100% safe” language, unhedged outcomes.</p></div></li>
              <li className="flex gap-4 px-6 py-5"><span className="text-[11px] font-medium tracking-wide text-clay" style={{ fontFamily: MONO }}>02</span><div><h4 className="text-[13px] font-semibold tracking-[0.01em] text-espresso">Off-label & wellness</h4><p className="mt-1 text-[13px] leading-6 text-mist">Compounded drug marketing and unapproved device usage.</p></div></li>
              <li className="flex gap-4 px-6 py-5"><span className="text-[11px] font-medium tracking-wide text-clay" style={{ fontFamily: MONO }}>03</span><div><h4 className="text-[13px] font-semibold tracking-[0.01em] text-espresso">Financial ROI promises</h4><p className="mt-1 text-[13px] leading-6 text-mist">Guaranteed returns, revenue multiples, speculative outcomes.</p></div></li>
              <li className="flex gap-4 px-6 py-5"><span className="text-[11px] font-medium tracking-wide text-clay" style={{ fontFamily: MONO }}>04</span><div><h4 className="text-[13px] font-semibold tracking-[0.01em] text-espresso">AI-hallucinated endorsements</h4><p className="mt-1 text-[13px] leading-6 text-mist">When answer systems invent awards or approvals for your brand.</p></div></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-bone px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <IndexRule index="07" label="Trust & boundaries" />
          <h2 className="mt-4 font-display text-[2rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.4rem]">Evidence first. Clear boundaries.</h2>
          <div className="mt-10 grid border border-sand-deep bg-cream sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-sand-deep p-6 sm:border-b-0 sm:border-r lg:p-7"><span className="border border-teal-deep/15 bg-teal-deep/10 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>Public pages only</span><h3 className="mt-4 font-display text-[1.15rem] leading-none tracking-[-0.01em] text-espresso">Public scope</h3><p className="mt-2 text-[13px] leading-6 text-mist">We analyze the public information you provide.</p></div>
            <div className="border-b border-sand-deep p-6 sm:border-b-0 sm:border-r lg:p-7"><span className="border border-teal-deep/15 bg-teal-deep/10 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>Source-linked</span><h3 className="mt-4 font-display text-[1.15rem] leading-none tracking-[-0.01em] text-espresso">Evidence linked</h3><p className="mt-2 text-[13px] leading-6 text-mist">Findings tie to observable language and sources where available.</p></div>
            <div className="border-b border-sand-deep p-6 sm:border-b-0 sm:border-r lg:p-7"><span className="border border-teal-deep/15 bg-teal-deep/10 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>Human-readable</span><h3 className="mt-4 font-display text-[1.15rem] leading-none tracking-[-0.01em] text-espresso">Actionable output</h3><p className="mt-2 text-[13px] leading-6 text-mist">Claim, gap, and what to clarify — not a black-box score.</p></div>
            <div className="p-6 lg:p-7"><span className="border border-teal-deep/15 bg-teal-deep/10 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-teal-deep uppercase" style={{ fontFamily: MONO }}>Dated trail</span><h3 className="mt-4 font-display text-[1.15rem] leading-none tracking-[-0.01em] text-espresso">No legal theater</h3><p className="mt-2 text-[13px] leading-6 text-mist">Intelligence software — not a regulator or law firm.</p></div>
          </div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-6"><div><IndexRule index="08" label="Engage" /><h2 className="mt-4 font-display text-[2rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.6rem]">Start with what's visible.</h2></div><p className="max-w-[36ch] text-[13px] leading-6 text-mist">From a free 3-point snapshot to a dated diagnostic and ongoing watch.</p></div>
          <div className="mt-10 overflow-hidden border border-sand-deep bg-bone">
            <div className="grid md:grid-cols-[1fr_1.35fr]">
              <div className="border-b border-sand-deep p-7 md:border-b-0 md:border-r md:p-8">
                <p className="text-[11px] tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>Entry — Free</p><h3 className="mt-2 font-display text-[1.6rem] tracking-[-0.02em] text-espresso">Snapshot</h3><p className="mt-1 font-display text-[2rem] leading-none tracking-[-0.02em] text-espresso">$0</p>
                <ul className="mt-6 space-y-2 border-t border-sand-deep/50 pt-5 text-[13px] leading-6 text-mist"><li className="flex gap-2"><span className="text-clay">—</span> 3-point snapshot</li><li className="flex gap-2"><span className="text-clay">—</span> Identify key claims</li><li className="flex gap-2"><span className="text-clay">—</span> Highlight evidence gaps</li><li className="flex gap-2"><span className="text-clay">—</span> Delivered by email</li></ul>
                <Link href={SNAPSHOT_URL} className="mt-7 inline-flex min-h-[40px] w-full items-center justify-center border border-sand-deep bg-cream px-5 text-[13px] font-semibold text-espresso transition-colors hover:border-clay">Run free snapshot</Link>
              </div>
              <div className="bg-cream p-7 md:p-8">
                <div className="flex items-center gap-2"><span className="border border-clay/20 bg-clay/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-clay uppercase" style={{ fontFamily: MONO }}>Most chosen</span><span className="text-[11px] tracking-[0.1em] text-mist uppercase" style={{ fontFamily: MONO }}>Dated record</span></div>
                <h3 className="mt-2 font-display text-[1.6rem] tracking-[-0.02em] text-espresso">Claim Support Review</h3><p className="mt-1 font-display text-[2rem] leading-none tracking-[-0.02em] text-espresso">$99 <span className="align-middle text-[11px] font-sans font-normal tracking-normal text-mist">one-time</span></p>
                <ul className="mt-6 grid gap-2 border-t border-sand-deep/50 pt-5 text-[13px] leading-6 text-mist sm:grid-cols-2"><li className="flex gap-2"><span className="text-clay">—</span> One detailed Exhibit A</li><li className="flex gap-2"><span className="text-clay">—</span> Claim analysis</li><li className="flex gap-2"><span className="text-clay">—</span> Evidence gap</li><li className="flex gap-2"><span className="text-clay">—</span> Source context</li><li className="flex gap-2"><span className="text-clay">—</span> Safer wording</li><li className="flex gap-2"><span className="text-clay">—</span> Dated review record</li></ul>
                <Link href="/checkout" className="mt-7 inline-flex min-h-[42px] w-full items-center justify-center gap-2 bg-espresso px-6 text-[13px] font-semibold text-cream transition-colors hover:bg-clay-deep">Get the detailed review <ArrowRight size={14} /></Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-t border-sand-deep bg-bone px-7 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div><p className="text-[11px] tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>Recurring — Scrutexity Watch</p><p className="mt-1 font-display text-[1.35rem] tracking-[-0.02em] text-espresso">$1,500 <span className="text-[12px] font-sans font-normal text-mist">/ month</span> <span className="text-[12px] font-normal text-mist">— ongoing monitoring of claim drift, evidence changes, and AI narrative shifts.</span></p></div>
              <Link href="/contact" className="inline-flex min-h-[40px] shrink-0 items-center justify-center border border-sand-deep bg-cream px-6 text-[13px] font-semibold text-espresso transition-colors hover:border-clay">Request Watch access</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-sand-deep/25 bg-bone px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px] grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div><IndexRule index="09" label="The record" /><h2 className="mt-4 font-display text-[2rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.4rem]">We don’t just tell you something is wrong.</h2><p className="mt-4 max-w-[38ch] text-[14px] leading-7 text-mist">We create a dated, source-linked review record of what was observed and what changed. A clear history of your public claims and how you managed them.</p></div>
          <div className="border border-sand-deep bg-cream p-4"><DatedRecordTimeline /></div>
        </div>
      </section>
      <section className="bg-cream px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px] border border-sand-deep bg-bone px-6 py-10 sm:px-10 md:flex md:items-center md:justify-between md:py-12">
          <div><p className="text-[11px] tracking-[0.14em] text-mist uppercase" style={{ fontFamily: MONO }}>10 — Begin</p><h2 className="mt-3 font-display text-[1.9rem] leading-[0.95] tracking-[-0.03em] text-espresso sm:text-[2.4rem]">I wonder what<br/>Scrutexity would find <span className="italic font-normal text-clay">on my site.</span></h2></div>
          <div className="mt-6 md:mt-0"><Link href={SNAPSHOT_URL} onClick={() => trackEvent("cta_click", { cta_label: "Run Your Free Snapshot", section: "final-cta" })} className="inline-flex min-h-[44px] items-center gap-2 bg-espresso px-8 text-[13px] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-clay-deep">Run your free snapshot <ArrowRight size={14} aria-hidden="true" /></Link><p className="mt-3 text-[11px] tracking-wide text-mist" style={{ fontFamily: MONO }}>Public URL only · No login required</p></div>
        </div>
      </section>
    </div>
  );
}
