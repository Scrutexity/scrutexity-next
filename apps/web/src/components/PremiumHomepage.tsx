import React from "react";
import { ScanAnimation } from "./ScanAnimation";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { ModuleFlow } from "./ModuleFlow";

export default function PremiumHomepage() {
  return (
    <div className="w-full min-h-screen bg-ivory text-charcoal">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="data-pill text-terracotta border-terracotta bg-terracotta/5 mb-4">
            SCRUTEXITY V2.0 // GOVERNED GROWTH INFRASTRUCTURE
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            The Claim Intelligence <br /> Platform
          </h1>
          <p className="font-sans text-lg md:text-xl text-charcoal-muted max-w-2xl mt-4">
            Every business makes claims. Scrutexity runs a Claim Audit to find the unsupported, overstated, and risky ones — then shows you how to fix them.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <button className="btn-primary">Deploy AuditGPT</button>
            <button className="btn-secondary">View Telemetry Proof</button>
          </div>
        </div>
      </section>

      {/* Interactive Scan Section */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-ivory">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-4xl">Continuous claim auditing for $300M+ ARR platforms.</h2>
            <p className="font-sans text-ivory/70 text-lg">
              We intercept marketing claims before they become operational liabilities. Our scanner identifies compliance risks, unsubstantiated claims, and revenue leakage points.
            </p>
            <ul className="flex flex-col gap-4 mt-4 font-mono text-sm text-ivory/60 uppercase tracking-widest">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage-deep"></div>
                Public claim audit scope
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage-deep"></div>
                Evidence gap analysis
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage-deep"></div>
                Enforcement pattern cross-reference
              </li>
            </ul>
          </div>
          <div className="w-full">
            <ScanAnimation />
          </div>
        </div>
      </section>

      {/* Infrastructure Modules */}
      <section className="py-24 px-6 md:px-12 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl text-charcoal mb-16 text-center">Governed Infrastructure Layers</h2>
          
          <div className="flex justify-center">
            <ModuleFlow 
              steps={[
                { title: "AuditGPT", description: "The front door to your claim intelligence. We ingest your entire digital footprint and map every claim to its underlying evidence base." },
                { title: "Contento", description: "Embedded governed content production. Deploy validated claims into your operational workflows without introducing new risk." },
                { title: "Recovery", description: "Recapture missed demand. Apply our validated claims matrix to selected pilot campaigns for immediate ROI." }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-24 px-6 md:px-12 bg-ivory border-t border-charcoal/10 flex justify-center">
        <ExecutiveSummary 
          title="MedSpa Pilot Results (Redacted)"
          metrics={[
            { label: "Claims Audited", value: "14,209", trend: "+12%" },
            { label: "Risk Eliminated", value: "$4.2M", trend: "Projected Liability" },
            { label: "Net Revenue Retained", value: "98.4%", trend: "+2.1% YoY" }
          ]}
        />
      </section>
    </div>
  );
}
