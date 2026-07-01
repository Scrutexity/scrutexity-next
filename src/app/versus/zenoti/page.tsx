import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrutexity vs. Zenoti: Clinical Governance & Revenue Recovery | Scrutexity",
  description: "Comparison: Zenoti for scheduling vs. Scrutexity for clinical demand governance and parallel revenue recovery infrastructure.",
  alternates: {
    canonical: "/versus/zenoti",
  },
  openGraph: {
    title: "Scrutexity vs. Zenoti",
    description: "How Scrutexity complements (not replaces) your Zenoti investment.",
    url: "https://scrutexity.com/versus/zenoti",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ComparisonChart",
  "itemA": {
    "@type": "SoftwareApplication",
    "name": "Scrutexity",
    "url": "https://scrutexity.com"
  },
  "itemB": {
    "@type": "SoftwareApplication",
    "name": "Zenoti",
    "url": "https://zenoti.com"
  }
};

export default function VsZenoti() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Scrutexity vs. Zenoti: Beyond Basic Scheduling
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Why clinical demand governance and parallel revenue recovery are different systems from practice management.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Introduction: Beyond Baseline Scheduling</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Zenoti is an excellent system of record. It schedules appointments, manages staff, tracks revenue, and handles integrations with payment processors and marketing platforms. It is designed to be the authoritative source for your business operations.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Scrutexity is not a replacement for Zenoti. It is a parallel system of optimization. It operates on top of Zenoti—reading data from your Zenoti database in real time, surfacing missed-demand signals, and enabling clinical decision-making without modifying how Zenoti operates.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Architectural Comparison: System of Record vs. System of Optimization</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Zenoti: The System of Record</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ Single source of truth for bookings, staff, revenue</li>
            <li>✓ Handles payment processing and financial reconciliation</li>
            <li>✓ Integrates with marketing and CRM platforms</li>
            <li>✓ Built-in reporting on historical performance</li>
            <li>✓ Required by franchise agreements and PE operators</li>
          </ul>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Scrutexity: System of Optimization</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ Real-time detection of missed-demand patterns</li>
            <li>✓ Clinical governance routing for complex inquiries</li>
            <li>✓ Portfolio-level benchmarking and comparison</li>
            <li>✓ Automated recovery workflows (human-reviewed)</li>
            <li>✓ Audit trail for PE diligence and compliance</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Integration Mechanics: Zero-Downtime Telemetry</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Why Read-Only Infrastructure Matters</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Scrutexity connects to Zenoti via a read-only API connection. Your Zenoti database is never modified. Your booking workflows are never interrupted. Scrutexity receives a stream of data about missed inquiries, abandoned bookings, and patient engagement patterns—and routes that intelligence to your clinical team.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            If Scrutexity fails, Zenoti continues to operate normally. You can disconnect Scrutexity instantly with zero downtime. This is the foundation of operator trust: if you adopt clinical demand governance, you retain full control of your data and workflows.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Operational Governance and Risk Mitigation</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Maintaining Compliance Protocols at the Ingress Point</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Zenoti does not claim to handle clinical decision-making or CPOM compliance. It is a scheduling and business management system. Scrutexity explicitly addresses clinical governance: which patient inquiries are routed to whom, who has authority to approve clinical actions, and how every decision is audited.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This distinction matters for PE operators and franchise groups. You need both systems—Zenoti for operations, Scrutexity for clinical intelligence and compliance infrastructure.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Bottom Line</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Many Zenoti operators miss a portion of patient demand to processing delays and channel fragmentation. Scrutexity is designed to surface and help recover that missed demand without replacing Zenoti or disrupting your existing workflows — the recoverable amount is an estimate that requires verification, and the pilot is $0 if missed-demand recovery isn&rsquo;t demonstrated. You keep your platform of record; you add a layer of optimization on top.
          </p>
        </section>
      </div>
    </article>
  );
}
