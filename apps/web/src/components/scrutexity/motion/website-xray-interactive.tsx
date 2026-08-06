"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const CLAIMS = [
  {
    id: 1,
    tag: "BIOLOGICAL MECHANISM",
    observed: "Clinically proven to reverse cellular aging in 14 days.",
    status: "SUPPORT INCOMPLETE",
    statusType: "amber",
    support: "No peer-reviewed clinical study or NCT registration link present.",
    gap: "FTC Section 5 vector: Unsubstantiated biological mechanism and timeframe claim.",
    rewrite: "Formulated with cellular nutrients observed to support skin hydration and metabolic resilience.",
  },
  {
    id: 2,
    tag: "FINANCIAL ROI GUARANTEE",
    observed: "100% safe & guaranteed 5x return on investment.",
    status: "EXPOSURE HIGH",
    statusType: "red",
    support: "No disclaimers or baseline sample methodology cited.",
    gap: "FTC Business Opportunity & Section 5 vector: Deceptive absolute outcome promise.",
    rewrite: "Case study participants experienced measurable operational yield improvements based on historical clinic data.",
  },
  {
    id: 3,
    tag: "REGULATORY APPROVAL",
    observed: "FDA-Approved GLP-1 compounding protocol.",
    status: "REGULATORY MISMATCH",
    statusType: "red",
    support: "Compounded formulations are not individually FDA-approved.",
    gap: "FDA Section 503A vector: Misrepresenting compounding regulatory status as FDA approval.",
    rewrite: "Custom compounded GLP-1 formulations prepared in compliance with FDA 503A pharmacy standards.",
  },
];

export function WebsiteXRayInteractive() {
  const [selectedClaimId, setSelectedClaimId] = useState(1);
  const [scanned, setScanned] = useState(false);
  const reduced = useReducedMotion();

  const selected = CLAIMS.find((c) => c.id === selectedClaimId) || CLAIMS[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2" style={{ fontFamily: MONO }}>
          Main Conversion Artifact // Website X-Ray
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
          See what answer systems and regulators extract from your URL.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Select any highlighted claim in the browser simulation to inspect its evidence support, regulatory gap, and safer rewrite.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Realistic Browser Frame */}
        <div className="lg:col-span-7 bg-paper-light border border-sand-deep shadow-xs relative overflow-hidden">
          {/* Browser Address Bar */}
          <div className="bg-paper border-b border-sand-deep px-4 py-3 flex items-center justify-between text-xs font-mono text-muted" style={{ fontFamily: MONO }}>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
            </div>
            <div className="bg-paper-light border border-sand-deep px-3 py-1 text-[11px] text-ink truncate max-w-xs">
              https://vitalitymedspa.com/landing
            </div>
            <div className="text-[10px] text-bureau-sage">LIVE SURFACE</div>
          </div>

          {/* Page Content Simulation */}
          <div className="p-6 sm:p-8 space-y-6 relative min-h-[380px]">
            {/* Single Scan Line Pass (Runs ONCE) */}
            {!reduced && !scanned && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                onAnimationComplete={() => setScanned(true)}
                className="absolute left-0 right-0 h-0.5 bg-bureau-sage z-20 pointer-events-none opacity-60 shadow-xs"
              />
            )}

            <div className="border-b border-sand-deep/40 pb-4">
              <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
                VITALITY CLINICAL WELLNESS // AESTHETICS &amp; LONGEVITY
              </span>
              <h3 className="font-display text-2xl text-ink mt-1">
                Advanced Regenerative Therapies
              </h3>
            </div>

            {/* Simulated Page Text with Interactive Claim Highlights */}
            <div className="space-y-4 text-sm text-ink leading-relaxed">
              <p>
                Our flagship longevity protocol delivers deep biological transformation.{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(1)}
                  className={`text-left transition-all px-1.5 py-0.5 border ${
                    selectedClaimId === 1
                      ? "bg-amber-bg border-review-amber text-review-amber font-medium"
                      : "bg-paper border-sand-deep text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;Clinically proven to reverse cellular aging in 14 days.&rdquo;
                  <span className="ml-1 text-[9px] font-mono text-review-amber" style={{ fontFamily: MONO }}>[CLAIM #01]</span>
                </button>
              </p>

              <p>
                Partner clinics experience unmatched commercial performance with our turnkey system.{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(2)}
                  className={`text-left transition-all px-1.5 py-0.5 border ${
                    selectedClaimId === 2
                      ? "bg-exposure-red/10 border-exposure-red text-exposure-red font-medium"
                      : "bg-paper border-sand-deep text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;100% safe &amp; guaranteed 5x return on investment.&rdquo;
                  <span className="ml-1 text-[9px] font-mono text-exposure-red" style={{ fontFamily: MONO }}>[CLAIM #02]</span>
                </button>
              </p>

              <p>
                All patient treatments utilize our proprietary{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(3)}
                  className={`text-left transition-all px-1.5 py-0.5 border ${
                    selectedClaimId === 3
                      ? "bg-exposure-red/10 border-exposure-red text-exposure-red font-medium"
                      : "bg-paper border-sand-deep text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;FDA-Approved GLP-1 compounding protocol.&rdquo;
                  <span className="ml-1 text-[9px] font-mono text-exposure-red" style={{ fontFamily: MONO }}>[CLAIM #03]</span>
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Evidence Inspector Side Panel */}
        <div className="lg:col-span-5 bg-paper border border-sand-deep p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-sand-deep/60 text-[10px] font-mono uppercase text-muted" style={{ fontFamily: MONO }}>
            <span>EVIDENCE INSPECTOR // CLAIM #{selected.id}</span>
            <span className="text-bureau-sage">{selected.tag}</span>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted mb-1" style={{ fontFamily: MONO }}>
              Observed Copy
            </div>
            <p className="text-sm font-normal text-ink bg-paper-light p-3 border border-sand-deep/50">
              &ldquo;{selected.observed}&rdquo;
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted" style={{ fontFamily: MONO }}>
                Support &amp; Evidence Gap
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 border uppercase font-semibold ${
                  selected.statusType === "red"
                    ? "border-exposure-red/30 bg-exposure-red/10 text-exposure-red"
                    : "border-review-amber/30 bg-amber-bg text-review-amber"
                }`}
                style={{ fontFamily: MONO }}
              >
                {selected.status}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed p-3 border border-sand-deep/40 bg-paper-light">
              {selected.gap}
            </p>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-bureau-sage mb-1" style={{ fontFamily: MONO }}>
              Safer Institutional Rewrite
            </div>
            <p className="text-xs text-ink leading-relaxed p-3 border border-bureau-sage/30 bg-paper-light">
              &ldquo;{selected.rewrite}&rdquo;
            </p>
          </div>

          <div className="pt-3 border-t border-sand-deep/60">
            <Link
              href="/snapshot"
              className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper-light py-3 px-6 text-xs font-semibold hover:bg-clay-deep transition-colors"
            >
              X-Ray My Page <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebsiteXRayInteractive;
