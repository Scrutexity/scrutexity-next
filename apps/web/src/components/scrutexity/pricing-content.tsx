"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, Check, Shield } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';
const SNAPSHOT_URL = "/snapshot";

export default function PricingContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      {/* Header */}
      <section className="border-b border-sand-deep bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-3" style={{ fontFamily: MONO }}>
            PRICING // CONNECTED BUYER PATH
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
            Clear, step-by-step intelligence options.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-muted">
            Start with a free snapshot, upgrade to a comprehensive audit, then choose your ongoing monitoring level.
          </p>
        </div>
      </section>

      {/* Connected Path Flow */}
      <section className="bg-paper px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Step 1 & Step 2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Step 1: Free Snapshot */}
            <div className="bg-paper-light border border-sand-deep p-8 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                  <span>STEP 01 // TRIAGE</span>
                  <span className="text-bureau-sage font-semibold">FREE ENTRY</span>
                </div>
                <h3 className="font-display text-2xl text-ink">Free Snapshot</h3>
                <p className="mt-2 text-3xl font-medium text-ink">$0</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Automated 3-point point-in-time public copy preview. Delivered in 3 minutes via email.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-muted font-mono" style={{ fontFamily: MONO }}>
                  <li>+ 3 key claim flags</li>
                  <li>+ Evidence gap indication</li>
                  <li>+ Confidential PDF preview</li>
                </ul>
              </div>
              <Link
                href={SNAPSHOT_URL}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-paper border border-sand-deep py-3 px-6 text-xs font-semibold text-ink hover:border-ink transition-colors font-mono"
                style={{ fontFamily: MONO }}
              >
                Run Free Snapshot <ArrowRight size={14} />
              </Link>
            </div>

            {/* Step 2: Comprehensive Audit */}
            <div className="bg-paper-light border-2 border-bureau-sage p-8 shadow-xs relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-bureau-sage text-paper-light px-3 py-0.5 text-[10px] font-mono uppercase font-semibold" style={{ fontFamily: MONO }}>
                RECOMMENDED ENTRY AUDIT
              </div>
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                  <span>STEP 02 // COMPREHENSIVE AUDIT</span>
                  <span className="text-bureau-sage font-semibold">ONE-TIME</span>
                </div>
                <h3 className="font-display text-2xl text-ink">Claim Support Audit</h3>
                <p className="mt-2 text-3xl font-medium text-ink">$497 <span className="text-xs text-muted font-normal">one-time</span></p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Full multi-surface audit report detailing exact claims, evidence gaps, FTC/FDA vector matches, and counsel-ready safer rewrites.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-muted font-mono" style={{ fontFamily: MONO }}>
                  <li>+ Up to 50 public claims analyzed</li>
                  <li>+ Complete evidence gap mapping</li>
                  <li>+ Counsel-ready replacement matrix</li>
                  <li>+ Stamped SHA-256 review record</li>
                </ul>
              </div>
              <Link
                href="/checkout"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-ink text-paper-light py-3 px-6 text-xs font-semibold hover:bg-clay-deep transition-colors font-mono"
                style={{ fontFamily: MONO }}
              >
                Order $497 Audit <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Branch Header */}
          <div className="text-center my-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted border-t border-b border-sand-deep/60 py-2 px-4 inline-block" style={{ fontFamily: MONO }}>
              STEP 03 // SELECT YOUR CONTINUOUS MONITORING BRANCH
            </span>
          </div>

          {/* Branch Options: Watch vs Guardian */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Branch A: Watch */}
            <div className="bg-paper-light border border-sand-deep p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-muted mb-2 uppercase" style={{ fontFamily: MONO }}>
                  BRANCH A // RECURRING
                </div>
                <h3 className="font-display text-xl text-ink">Scrutexity Watch</h3>
                <p className="mt-2 text-2xl font-medium text-ink">$297 <span className="text-xs text-muted font-normal">/ mo</span></p>
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  Monitor key public surfaces for language changes, link removals, and claim drift.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 w-full inline-flex items-center justify-center bg-paper border border-sand-deep py-2.5 px-4 text-xs font-mono font-semibold text-ink hover:border-ink"
                style={{ fontFamily: MONO }}
              >
                Select Watch ($297/mo)
              </Link>
            </div>

            {/* Branch B: Guardian */}
            <div className="bg-paper-light border border-sand-deep p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-muted mb-2 uppercase" style={{ fontFamily: MONO }}>
                  BRANCH B // FULL RECORD
                </div>
                <h3 className="font-display text-xl text-ink">Scrutexity Guardian</h3>
                <p className="mt-2 text-2xl font-medium text-ink">$1,497 <span className="text-xs text-muted font-normal">/ mo</span></p>
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  Maintain complete hash-chained claim record, monthly evidence diffs, and AI distortion watch.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 w-full inline-flex items-center justify-center bg-paper border border-sand-deep py-2.5 px-4 text-xs font-mono font-semibold text-ink hover:border-ink"
                style={{ fontFamily: MONO }}
              >
                Select Guardian ($1,497/mo)
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-paper-light border border-sand-deep p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-muted mb-2 uppercase" style={{ fontFamily: MONO }}>
                  ENTERPRISE // MULTI-BRAND
                </div>
                <h3 className="font-display text-xl text-ink">Portfolio Surveillance</h3>
                <p className="mt-2 text-2xl font-medium text-ink">Custom</p>
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  Dedicated diligence and portfolio-wide monitoring for PE firms, M&amp;A, and multi-location platforms.
                </p>
              </div>
              <Link
                href="/enterprise"
                className="mt-6 w-full inline-flex items-center justify-center bg-ink text-paper-light py-2.5 px-4 text-xs font-mono font-semibold hover:bg-clay-deep"
                style={{ fontFamily: MONO }}
              >
                Request Enterprise Quote
              </Link>
            </div>
          </div>

          {/* Expandable Detailed Feature Comparison Drawer */}
          <div className="mt-12 border border-sand-deep bg-paper-light">
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="w-full p-6 flex justify-between items-center text-left hover:bg-paper transition-colors"
            >
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-ink font-semibold" style={{ fontFamily: MONO }}>
                Detailed Feature &amp; Scope Comparison Matrix
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-muted" style={{ fontFamily: MONO }}>
                {drawerOpen ? "COLLAPSE MATRIX" : "EXPAND MATRIX"}
                {drawerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {drawerOpen && (
              <div className="p-6 border-t border-sand-deep overflow-x-auto">
                <table className="w-full text-left text-xs font-mono" style={{ fontFamily: MONO }}>
                  <thead>
                    <tr className="border-b border-sand-deep text-muted">
                      <th className="pb-3 pr-4 font-normal">FEATURE / SCOPE</th>
                      <th className="pb-3 px-4 font-normal">SNAPSHOT ($0)</th>
                      <th className="pb-3 px-4 font-normal">AUDIT ($497)</th>
                      <th className="pb-3 px-4 font-normal">WATCH ($297/MO)</th>
                      <th className="pb-3 pl-4 font-normal">GUARDIAN ($1,497/MO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-deep/40 text-ink">
                    <tr>
                      <td className="py-3 pr-4">Public Claim Analysis Scope</td>
                      <td className="py-3 px-4">3 Claims</td>
                      <td className="py-3 px-4">50 Claims</td>
                      <td className="py-3 px-4">Limited Surfaces</td>
                      <td className="py-3 pl-4">Full Footprint</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">FTC / FDA Regulatory Vector Map</td>
                      <td className="py-3 px-4">High Level</td>
                      <td className="py-3 px-4">Detailed</td>
                      <td className="py-3 px-4">Continuous</td>
                      <td className="py-3 pl-4">Continuous + AI</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Counsel-Ready Replacement Matrix</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4">Included</td>
                      <td className="py-3 px-4">Included</td>
                      <td className="py-3 pl-4">Included + Priority</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Hash-Chained Ledger Record</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4">Included</td>
                      <td className="py-3 px-4">Monthly Diffs</td>
                      <td className="py-3 pl-4">Realtime + S-Mark</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
