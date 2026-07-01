import React from "react";
import type { Metadata } from "next";
import { ScanAnimation } from "@/components/ScanAnimation";
import { RiskMatrix } from "@/components/RiskMatrix";
import { LayerIndicator, SystemPositionCard, ArtifactDock, GovernedDocument, DataLedger, getLayer } from "@/components/scrutexity/os";

const layer = getLayer("auditgpt")!;

export const metadata: Metadata = {
  title: "AuditGPT — Find what is unsupported | Scrutexity",
  description:
    "AuditGPT is Layer 1 of the Scrutexity Operating System. It reviews your website, claims, AI visibility, and follow-up paths, then outputs a claim scan, risk map, and 30-day priority plan.",
  alternates: { canonical: "/auditgpt" },
};

export default function AuditGPTPage() {
  return (
    <div className="min-h-screen bg-bone text-bark pt-nav-offset">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* ── Operating System position ── */}
        <LayerIndicator currentMove="Find" className="mb-8" />
        <SystemPositionCard layer={layer} className="mb-12" />

        {/* ── Hero: purpose, input, output, next ── */}
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sage-deep font-mono">
            Layer 1 · Find
          </span>
          <h1 className="mt-4 font-display text-5xl text-espresso tracking-[-0.02em] leading-[1.05]">
            AuditGPT — diagnostic &amp; gap analysis
          </h1>
          <p className="mt-5 font-sans text-lg text-mist max-w-2xl leading-relaxed">
            AuditGPT reviews your website, claims, visibility, and follow-up paths. Find what is
            unsupported, invisible, or leaking — then hand the findings to the rest of the system.
          </p>
        </div>

        {/* ── Artifact Dock: the outputs of this layer ── */}
        <ArtifactDock artifacts={layer.artifacts} className="mb-16" />

        {/* ── Sample artifacts: the tangible receipts ── */}
        <section className="mb-24 space-y-8">
          <span className="block text-[10px] uppercase tracking-[0.18em] text-sage-deep font-mono">
            Sample artifacts · what the scan produces
          </span>
          <GovernedDocument title="Risk Map" date="RM-204 · Jun 30 2026">
            <p className="mb-4">
              Three claims on the audited page require evidence before they can stand behind a buyer&rsquo;s scrutiny.
              Each is mapped to its gap and a safer frame.
            </p>
            <ul className="space-y-2 text-sm text-espresso/80">
              <li>
                <strong className="text-espresso">Critical —</strong> Unsubstantiated &ldquo;FDA-approved&rdquo; phrasing on landing page A.
              </li>
              <li>
                <strong className="text-espresso">High —</strong> Numeric outcome stated as a guarantee, with no cohort or qualification.
              </li>
              <li>
                <strong className="text-espresso">Medium —</strong> &ldquo;24/7 support&rdquo; conflicts with documented SLA hours.
              </li>
            </ul>
            <p className="mt-4 text-xs italic text-espresso/50">
              Illustrative artifact · placeholder data · requires verification.
            </p>
          </GovernedDocument>

          <DataLedger filename="claim_scan.json" />
        </section>

        {/* ── Interactive scan + telemetry ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <ScanAnimation />
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl text-espresso mb-6">Live Claim Telemetry</h2>
            <p className="font-sans text-mist mb-8 leading-relaxed">
              We extract every declarative statement from your properties, cross-reference it against
              our validation engine, and score the compliance risk.
            </p>
            <button className="btn-primary w-fit">Initiate Scrutexity Audit</button>
          </div>
        </div>

        {/* ── Illustrative findings ── */}
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <h2 className="font-display text-3xl text-espresso mb-2">Risk Discoveries</h2>
          <p className="text-sm text-mist mb-8" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
            Illustrative · redacted
          </p>
          <RiskMatrix risks={[
            { id: "RSK-092", category: "Regulatory/Compliance", severity: "Critical", description: "Unsubstantiated 'FDA-approved' claim on landing page A" },
            { id: "RSK-104", category: "Financial/ROI", severity: "High", description: "Guaranteeing 300% ROI without disclaimer or historic data link" },
            { id: "RSK-118", category: "Operational", severity: "Medium", description: "Claiming 24/7 support while SLA documentation states 9-5 EST" },
          ]} />
        </div>
      </div>
    </div>
  );
}
