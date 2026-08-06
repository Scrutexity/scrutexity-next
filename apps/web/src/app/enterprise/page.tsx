"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldAlert, CheckCircle } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const PORTFOLIO = [
  {
    id: "brand-a",
    name: "Brand A — Aesthetics Platform (12 Locations)",
    claims: 84,
    changed: 3,
    missing: 6,
    status: "Current",
    diff: {
      url: "https://brand-a.com/treatments/laser",
      oldText: '"FDA-Approved Laser Rejuvenation Protocol"',
      newText: '"FDA-Cleared Laser Device Technology"',
      reason: "Corrected unapproved treatment level approval language.",
    },
  },
  {
    id: "brand-b",
    name: "Brand B — Telehealth Wellness (5 States)",
    claims: 47,
    changed: 0,
    missing: 2,
    status: "Current",
    diff: {
      url: "https://brand-b.com/glp1",
      oldText: '"Guaranteed 20% weight loss in 30 days"',
      newText: '"Patients observed average weight loss in clinical trials"',
      reason: "Removed absolute timeframe and outcome guarantee.",
    },
  },
  {
    id: "brand-c",
    name: "Brand C — Longevity Clinic Network (28 Locations)",
    claims: 109,
    changed: 11,
    missing: 9,
    status: "Review Due",
    diff: {
      url: "https://brand-c.com/peptides",
      oldText: '"FDA-Approved Peptide Anti-Aging Therapy"',
      newText: '"Custom Compounded Peptide Therapy (FDA 503A Compliant)"',
      reason: "Fixed compounding approval status misrepresentation.",
    },
  },
];

export default function EnterprisePage() {
  const [selectedBrandId, setSelectedBrandId] = useState("brand-c");
  const selectedBrand = PORTFOLIO.find((b) => b.id === selectedBrandId) || PORTFOLIO[2];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      {/* Hero */}
      <section className="border-b border-sand-deep bg-paper-light px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-3" style={{ fontFamily: MONO }}>
            ENTERPRISE INTELLIGENCE // PORTFOLIO SURVEILLANCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-tight">
            Portfolio claim surveillance for multi-location brands &amp; PE.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-muted">
            Inspect public claim surfaces, language drift, and evidentiary gaps across dozens of operating brands in one unified dashboard.
          </p>
        </div>
      </section>

      {/* Portfolio Surveillance Table Visual */}
      <section className="bg-paper px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-bureau-sage block mb-2" style={{ fontFamily: MONO }}>
              Interactive Surveillance Visual
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
              Click any brand row to inspect its latest language-diff receipt.
            </h2>
          </div>

          <div className="bg-paper-light border border-sand-deep p-6 sm:p-8 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono" style={{ fontFamily: MONO }}>
                <thead>
                  <tr className="border-b border-sand-deep text-muted">
                    <th className="pb-3 pr-4 font-normal">OPERATING COMPANY</th>
                    <th className="pb-3 px-4 font-normal">CLAIMS</th>
                    <th className="pb-3 px-4 font-normal">CHANGED</th>
                    <th className="pb-3 px-4 font-normal">MISSING PROOF</th>
                    <th className="pb-3 pl-4 font-normal">RECORD STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-deep/40 text-ink">
                  {PORTFOLIO.map((brand) => {
                    const isSelected = selectedBrandId === brand.id;
                    return (
                      <tr
                        key={brand.id}
                        onClick={() => setSelectedBrandId(brand.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-paper font-semibold" : "hover:bg-paper/60"
                        }`}
                      >
                        <td className="py-4 pr-4 flex items-center gap-2">
                          <ChevronRight size={14} className={isSelected ? "text-bureau-sage" : "text-muted"} />
                          <span>{brand.name}</span>
                        </td>
                        <td className="py-4 px-4">{brand.claims}</td>
                        <td className="py-4 px-4">{brand.changed}</td>
                        <td className="py-4 px-4 text-review-amber">{brand.missing}</td>
                        <td className="py-4 pl-4">
                          <span
                            className={`px-2.5 py-0.5 border text-[10px] uppercase font-semibold ${
                              brand.status === "Review Due"
                                ? "border-exposure-red/30 bg-exposure-red/10 text-exposure-red"
                                : "border-bureau-sage/30 bg-paper text-bureau-sage"
                            }`}
                          >
                            {brand.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Language-Diff Inspection Panel */}
            <div className="mt-8 pt-6 border-t border-sand-deep">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase text-muted mb-3" style={{ fontFamily: MONO }}>
                <span>LANGUAGE-DIFF RECEIPT // {selectedBrand.name}</span>
                <span className="text-bureau-sage">SRC: {selectedBrand.diff.url}</span>
              </div>

              <div className="bg-paper border border-sand-deep p-5 space-y-3 font-mono text-xs" style={{ fontFamily: MONO }}>
                <div>
                  <span className="text-[10px] text-muted block uppercase">Previous Public Copy:</span>
                  <p className="line-through text-muted bg-paper-light p-2.5 border border-sand-deep/40 mt-1">
                    {selectedBrand.diff.oldText}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-bureau-sage block uppercase">Remediated Language:</span>
                  <p className="text-ink font-semibold bg-paper-light p-2.5 border border-bureau-sage/40 mt-1">
                    {selectedBrand.diff.newText}
                  </p>
                </div>

                <div className="pt-2 text-muted text-[11px]">
                  <span className="text-ink font-semibold">Remediation Rationale:</span> {selectedBrand.diff.reason}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-sand-deep bg-paper-light px-5 py-20 sm:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
            Request an Enterprise Exposure Assessment
          </h2>
          <p className="mt-3 text-sm text-muted">
            Custom quote ($7,500 – $25,000+) based on portfolio size, locations, and review depth.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/private-assessment?intent=enterprise&source=enterprise"
              className="inline-flex items-center gap-2 bg-ink text-paper-light px-8 py-3.5 text-xs font-mono font-semibold tracking-wider uppercase hover:bg-clay-deep"
              style={{ fontFamily: MONO }}
            >
              Request Private Assessment <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
