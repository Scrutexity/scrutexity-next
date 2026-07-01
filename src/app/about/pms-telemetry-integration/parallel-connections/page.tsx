import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parallel Data Connections: Boulevard & Mangomint Integration | Scrutexity",
  description: "How to establish parallel, read-only data connections with Boulevard and Mangomint without disrupting active PMS workflows.",
  alternates: {
    canonical: "/about/pms-telemetry-integration/parallel-connections",
  },
};

export default function ParallelConnections() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">PMS Telemetry & Integration</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Bridging the Ingress Gap: Parallel Data Connections with Boulevard and Mangomint
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Technical walkthrough of establishing parallel, read-only telemetry connections for popular PMS platforms.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Boulevard Architecture</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Boulevard exposes a GraphQL API that allows authenticated clients to query patient data, bookings, messages, and transactions. To establish a parallel connection: (1) create a service account with read-only permissions, (2) authenticate via OAuth, (3) subscribe to webhook events for real-time updates, (4) poll the GraphQL endpoint for historical backfill.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Key Boulevard Endpoints</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li><strong>Clients:</strong> Patient demographic data, contact info, booking history</li>
            <li><strong>Appointments:</strong> Scheduled services, status, duration, staff assignment</li>
            <li><strong>Messages:</strong> SMS, email, push notifications, messenger conversations</li>
            <li><strong>Transactions:</strong> Payments, deposits, refunds, revenue tracking</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Mangomint Architecture</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Mangomint uses a REST API with bearer token authentication. Data extraction requires polling endpoints for clients, appointments, and transaction logs. Mangomint does not have native webhook support, so real-time updates require more frequent polling.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Key Mangomint Endpoints</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li><strong>/api/clients:</strong> Patient data and booking history</li>
            <li><strong>/api/appointments:</strong> Scheduled services and status</li>
            <li><strong>/api/transactions:</strong> Financial records and revenue</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Parallel Connection Best Practices</h2>
          <ul className="space-y-4 text-lg text-text-muted mb-8">
            <li>✓ Use separate API credentials for telemetry connections (separate from front-desk systems)</li>
            <li>✓ Implement exponential backoff for API failures</li>
            <li>✓ Cache API responses in your own database to reduce repeated queries</li>
            <li>✓ Monitor API response times and alert on degradation</li>
            <li>✓ Document the sync frequency and expected latency</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Data Normalization</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Once data is extracted from Boulevard and Mangomint, normalize it into a platform-agnostic schema. This allows you to query across both systems as if they were a single unified database—essential for portfolio-level operators.
          </p>
        </section>
      </div>
    </article>
  );
}
