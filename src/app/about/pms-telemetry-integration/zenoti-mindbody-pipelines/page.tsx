import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenoti vs. Mindbody Data Pipelines: Live Telemetry Extraction | Scrutexity",
  description: "Comparative guide to extracting live operational telemetry from Zenoti and Mindbody for revenue optimization and demand governance.",
  alternates: {
    canonical: "/about/pms-telemetry-integration/zenoti-mindbody-pipelines",
  },
};

export default function ZenotiMindbodyPipelines() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">PMS Telemetry & Integration</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Zenoti vs. Mindbody Data Pipelines: How to Extract Live Telemetry for Revenue Optimization
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Technical comparison of data extraction patterns from the two largest wellness and medspa PMS platforms.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Zenoti: Modern API, Webhook-First</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Zenoti is owned by PE (Apax Partners) and has invested heavily in API infrastructure. It provides both REST and GraphQL endpoints, native webhook support, and role-based access control. This makes telemetry extraction straightforward and low-latency.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Zenoti Integration Pattern</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ OAuth 2.0 authentication</li>
            <li>✓ Real-time webhooks for all events (booking, message, payment)</li>
            <li>✓ Comprehensive REST API for historical backfill</li>
            <li>✓ Rate limits: 1000 requests/hour per API key</li>
            <li>✓ Data latency: 0–5 minutes (webhook events)</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Mindbody: Legacy Architecture, Polling-Based</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Mindbody is an older system with API endpoints added later. It does not have native webhooks, so telemetry extraction requires polling endpoints at regular intervals. This creates higher API overhead and introduces latency.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Mindbody Integration Pattern</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ API key authentication (bearer token)</li>
            <li>✓ No native webhooks—polling required</li>
            <li>✓ REST API for clients, appointments, transactions</li>
            <li>✓ Rate limits: 50 requests/second (tiered by account)</li>
            <li>✓ Data latency: 5–15 minutes (polling interval)</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Comparative Performance</h2>

          <table className="w-full text-lg text-text-muted border-collapse border border-border-muted mb-8">
            <thead>
              <tr className="bg-warm-card">
                <th className="border border-border-muted p-4 text-left font-semibold">Metric</th>
                <th className="border border-border-muted p-4 text-left font-semibold">Zenoti</th>
                <th className="border border-border-muted p-4 text-left font-semibold">Mindbody</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-muted p-4">Real-time Events</td>
                <td className="border border-border-muted p-4">Webhooks (native)</td>
                <td className="border border-border-muted p-4">Polling only</td>
              </tr>
              <tr>
                <td className="border border-border-muted p-4">Data Latency</td>
                <td className="border border-border-muted p-4">&lt; 5 min</td>
                <td className="border border-border-muted p-4">5–15 min</td>
              </tr>
              <tr>
                <td className="border border-border-muted p-4">API Complexity</td>
                <td className="border border-border-muted p-4">GraphQL + REST</td>
                <td className="border border-border-muted p-4">REST only</td>
              </tr>
              <tr>
                <td className="border border-border-muted p-4">Setup Effort</td>
                <td className="border border-border-muted p-4">Low (webhooks)</td>
                <td className="border border-border-muted p-4">Medium (polling)</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Revenue Optimization Implication</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            For revenue recovery infrastructure, latency matters. A Zenoti operator can detect a missed inquiry and trigger re-engagement quickly via webhooks; a Mindbody operator relying on polling may detect it somewhat later. All else equal, a slower detection window tends to reduce how much demand is still recoverable.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This is not a fault of Mindbody—it's a legacy architecture constraint. But it means portfolio operators must be intentional about latency tradeoffs when mixing systems.
          </p>
        </section>
      </div>
    </article>
  );
}
