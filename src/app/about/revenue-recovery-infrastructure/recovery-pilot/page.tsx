import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Recovery Pilot: Anatomy & Benchmarking | Scrutexity",
  description: "How to structure and measure a 14-day revenue recovery pilot. Realistic yield calculation and performance benchmarking.",
  alternates: {
    canonical: "/about/revenue-recovery-infrastructure/recovery-pilot",
  },
};

export default function RecoveryPilot() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Revenue Recovery Infrastructure</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            The Anatomy of a Revenue Recovery Pilot: Benchmarking Yield and Yield Calculations Realistically
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            How to structure, measure, and validate a 14-day pilot that proves revenue recovery value without marketing hype.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Pilot Structure</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            A revenue recovery pilot runs for 14 days. During this period, the operator identifies all missed-demand signals from the prior 90 days (calls, forms, DMs, abandoned bookings), surfaces them to the clinical team, and attempts re-engagement. Every contact and outcome is logged.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Four Metrics</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">1. Lead Identification Accuracy</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            How many missed-demand signals were correctly identified and surfaced? This is measured as a ratio: missed leads surfaced / total missed leads in the historical dataset.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">2. Contact Success Rate</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Of the leads that were identified and contacted, how many were reachable? This accounts for outdated phone numbers, closed email accounts, and unresponsive patients.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">3. Re-Engagement Conversion</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Of the reachable patients, how many agreed to re-enter the booking pipeline? This depends heavily on how long ago the original inquiry was made and on the nature of the service — and is measured per practice, not assumed.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">4. Booking Completion</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Of the re-engaged patients, how many actually booked and completed a service? This is the financial outcome metric: bookings × average service value = incremental revenue.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Realistic Yields</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            As an illustrative walk-through of the method: a mid-sized location reviews its inquiries over a 90-day lookback, surfaces the missed leads, contacts them, and books a share of those who re-engage. Multiplying the booked count by the location&rsquo;s own average service value gives the incremental revenue. Every input here is measured from your data during the pilot — these are estimates that require verification, not promised outcomes.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            If the pilot does not demonstrate this recovery, the operator owes nothing. The infrastructure is reversed, and the PMS returns to normal.
          </p>
        </section>
      </div>
    </article>
  );
}
