"use client";

import { useState } from "react";
import { Metadata } from "next";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const STAGES = [
  {
    num: "01",
    title: "Observation & DOM Capture",
    body: "Scrutexity captures point-in-time public web copy and DOM structures from target URLs. Every observation is logged with UTC capture timestamps.",
    payload: {
      step: "01_OBSERVE",
      url: "https://vitalitymedspa.com/landing",
      capturedAt: "2026-08-06 T14:32:00Z",
      rawCopy: "Clinically proven to reverse cellular aging in 14 days.",
    },
  },
  {
    num: "02",
    title: "Substantive Claim Extraction",
    body: "NLP parsing isolates substantive marketing assertions from general decorative text, grouping claims by biological mechanism, ROI promises, or approval references.",
    payload: {
      step: "02_EXTRACT",
      claimId: "CLM-8942-A",
      type: "Biological Mechanism Claim",
      timeframe: "14 days",
    },
  },
  {
    num: "03",
    title: "Regulatory Vector Matching",
    body: "Extracted claims are cross-referenced against FTC Section 5, FDA 503A/503B compounding regulations, and NAD case histories.",
    payload: {
      step: "03_MATCH",
      vectorMatch: "FTC Sec. 5 Vector #84",
      riskLevel: "HIGH_EXPOSURE",
      issue: "Unsubstantiated biological mechanism & timeframe promise.",
    },
  },
  {
    num: "04",
    title: "Remediation Matrix Generation",
    body: "Scrutexity generates safer replacement copy calibrated to visible evidentiary support, maintaining commercial effectiveness without legal exposure.",
    payload: {
      step: "04_REMEDIATE",
      original: "Clinically proven to reverse cellular aging in 14 days.",
      saferText: "Formulated with cellular nutrients observed to support hydration.",
      counselApproved: true,
    },
  },
  {
    num: "05",
    title: "Cryptographic Hash-Chain Seal",
    body: "The final record payload is hashed using SHA-256 and committed to the Scrutexity verification ledger, creating an immutable audit trail.",
    payload: {
      step: "05_SEAL",
      recordId: "REC-2026-8942-B",
      sha256: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "SEALED_IMMUTABLE",
    },
  },
];

export default function MethodologyPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = STAGES[activeIdx];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      <section className="border-b border-sand-deep bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-3" style={{ fontFamily: MONO }}>
            METHODOLOGY // 5-STAGE SEQUENCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
            Institutional verification methodology.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-muted">
            How Scrutexity turns unverified web copy into a dated, hash-chained evidence record.
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: 5 Methodology Stages */}
            <div className="lg:col-span-6 space-y-6">
              {STAGES.map((s, i) => {
                const isActive = activeIdx === i;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`w-full p-6 text-left transition-all border ${
                      isActive
                        ? "bg-paper-light border-ink shadow-xs"
                        : "bg-paper border-sand-deep/60 hover:border-sand-deep"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono text-muted mb-2" style={{ fontFamily: MONO }}>
                      <span>STAGE {s.num}</span>
                      {isActive && <span className="text-bureau-sage font-semibold">ACTIVE</span>}
                    </div>
                    <h3 className="font-display text-xl text-ink font-normal">{s.title}</h3>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{s.body}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Sticky Transforming Claim Record Payload */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="bg-paper-light border border-sand-deep p-6 sm:p-8 shadow-xs">
                <div className="flex justify-between items-center pb-4 border-b border-sand-deep/60 text-[10px] font-mono uppercase text-muted" style={{ fontFamily: MONO }}>
                  <span>RECORD PAYLOAD TRANSFORMER</span>
                  <span className="text-bureau-sage">{activeStage.payload.step}</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-xs font-mono text-muted uppercase" style={{ fontFamily: MONO }}>
                    STAGE {activeStage.num} ACTIVE PAYLOAD:
                  </div>

                  <div className="bg-paper border border-sand-deep p-4 font-mono text-xs text-ink leading-relaxed" style={{ fontFamily: MONO }}>
                    <pre className="whitespace-pre-wrap break-words">
                      {JSON.stringify(activeStage.payload, null, 2)}
                    </pre>
                  </div>

                  <p className="text-xs text-muted pt-2 border-t border-sand-deep/40">
                    Click any stage on the left to see how the evidence record payload transforms through the pipeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
