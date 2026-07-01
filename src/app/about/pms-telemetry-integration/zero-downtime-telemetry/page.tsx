import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zero-Downtime, Read-Only Telemetry for Legacy Medspa Software | Scrutexity",
  description: "Technical guide to implementing non-invasive, parallel telemetry systems that operate independently of legacy PMS platforms.",
  alternates: {
    canonical: "/about/pms-telemetry-integration/zero-downtime-telemetry",
  },
};

export default function ZeroDowntimeTelemetry() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">PMS Telemetry & Integration</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Designing Zero-Downtime, Read-Only Telemetry for Legacy Medspa Software
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            How to extract operational telemetry from Boulevard, Zenoti, Mindbody, and Vagaro without touching production databases or disrupting active workflows.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Non-Invasive Principle</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Zero-downtime telemetry means: (1) you never write to the PMS database, (2) you never modify PMS code, (3) you never intercept PMS transactions, (4) you can disconnect instantly without affecting PMS operations.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Three Extraction Patterns</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Pattern 1: API-Based Polling</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Query the PMS API at regular intervals (every 5 minutes, every hour) to pull updated patient data, bookings, messages. This is the safest approach—you're using the PMS's intended interface. Downside: depends on API completeness and rate limits.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Pattern 2: Webhook-Based Events</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            The PMS sends webhook events to your external system when specific actions occur (new booking, message sent, deposit received). Your system processes and archives these events. Near-zero latency, minimal polling overhead.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Pattern 3: Database Replica (Read-Only)</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            For PMS systems that support it, create a read-only database replica. Query the replica instead of the primary. Zero impact on primary, real-time data, but requires PMS support.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Implementation Checklist</h2>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ Test extraction with at least 30 days of historical data before going live</li>
            <li>✓ Implement circuit breakers: if API fails, telemetry stops but PMS continues</li>
            <li>✓ Never cache credentials in your application—use OAuth or secure vaults</li>
            <li>✓ Log all API calls and processing steps for audit trail</li>
            <li>✓ Set up alerts for extraction latency or API errors</li>
            <li>✓ Document rollback procedure in case of issues</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Trust Equation</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Operators will only adopt zero-downtime telemetry if they can verify that (1) it doesn't slow down their PMS, (2) it can be disconnected instantly, (3) it doesn't leak data, and (4) it's transparent about what data it accesses. Every implementation must prove all four.
          </p>
        </section>
      </div>
    </article>
  );
}
