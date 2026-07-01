import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Recovery Infrastructure | Scrutexity",
  description: "How to implement B2B revenue recovery layers in medical aesthetics platforms. Complete guide to missed-demand recovery without invasive modifications.",
  alternates: {
    canonical: "/about/revenue-recovery-infrastructure",
  },
  openGraph: {
    title: "Revenue Recovery Infrastructure Architecture",
    description: "Building revenue recovery systems for medical aesthetics operators.",
    url: "https://scrutexity.com/about/revenue-recovery-infrastructure",
    type: "article",
  },
};

export default function RevenueRecoveryInfrastructure() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Implementing B2B Revenue Recovery Layers in Medical Aesthetics Platforms
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            A complete guide to building non-invasive, parallel revenue recovery infrastructure that captures missed-demand value without disrupting existing workflows.
          </p>
        </header>

        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">What is Revenue Recovery Infrastructure?</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Revenue Recovery Infrastructure is not patient acquisition. It is not demand generation. It is the operational layer that identifies and routes missed-demand value—patients who already initiated contact but were not converted—back into the clinic's booking pipeline.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            It operates as a parallel system: your Boulevard or Zenoti database remains untouched. Your PMS continues to operate normally. But a read-only mirror of that data is analyzed in real time to surface missed-demand patterns and opportunities.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Four Pillars of Recovery</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">1. Visibility</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            You cannot recover what you cannot see. The first pillar is comprehensive visibility into all inbound patient signals—calls, forms, DMs, reviews—and their response status.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">2. Classification</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Missed demand is not random. It falls into identifiable categories: service not offered, price concern, booking issue, timing conflict, competitive loss. Each category requires a different recovery strategy.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">3. Targeted Action</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Not all missed demand is recoverable. An operator can focus resources on high-probability targets: patients who inquired recently, who match high-value service profiles, or who have prior history with the clinic.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">4. Auditable Outcome</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Every recovery attempt must be logged, dated, and tied to a financial outcome (booking, deposit, service completion). This data feeds portfolio benchmarking and PE diligence.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Why This Works at Scale</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            A single location might recover $5K–$12K per month from missed-demand re-engagement. A 10-location operator implementing revenue recovery infrastructure systematically can recover $50K–$120K monthly—without hiring additional staff, without patient acquisition costs, and without disrupting existing operations.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Zero-Downtime Implementation</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Revenue recovery infrastructure is read-only. It never modifies your PMS, never touches patient records, never disrupts booking workflows. It runs parallel to your existing systems, surfacing insights without changing how you operate day-to-day.
          </p>
        </section>

        <section className="mt-16 pt-12 border-t border-border-muted">
          <h3 className="text-2xl font-display font-semibold mb-6 text-charcoal">Related Topics</h3>
          <ul className="space-y-4 text-lg">
            <li>
              <a href="/about/revenue-recovery-infrastructure/claim-safe-lead-capture" className="text-terracotta hover:text-[#a36b5d] font-medium">
                Automating Claim-Safe Lead Capture
              </a>
            </li>
            <li>
              <a href="/about/revenue-recovery-infrastructure/recovery-pilot" className="text-terracotta hover:text-[#a36b5d] font-medium">
                The Anatomy of a Revenue Recovery Pilot
              </a>
            </li>
            <li>
              <a href="/about/revenue-recovery-infrastructure/leakage-cost" className="text-terracotta hover:text-[#a36b5d] font-medium">
                Evaluating the True Leakage Cost of Delayed Response Times
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
