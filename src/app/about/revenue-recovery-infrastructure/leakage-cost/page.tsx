import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Cost of Delayed Response: Leakage Analysis | Scrutexity",
  description: "How to calculate the real operational cost of delayed inbound patient response times and analyze revenue leakage patterns.",
  alternates: {
    canonical: "/about/revenue-recovery-infrastructure/leakage-cost",
  },
};

export default function LeakageCost() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Revenue Recovery Infrastructure</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Evaluating the True Leakage Cost of Delayed Inbound Patient Response Times
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            A financial framework for measuring the operational cost of unanswered inquiries and slow response cycles.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Leakage Calculation</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Leakage cost is not abstract. It is the product of three measurable variables:
          </p>

          <div className="bg-warm-card border border-border-muted rounded-2xl p-8 my-8">
            <p className="text-lg font-mono text-charcoal mb-4">
              Leakage = (Missed Inquiries/Month) × (Conversion Rate) × (Avg Service Value) × (Response Latency Factor)
            </p>
            <p className="text-sm text-text-muted">
              Response Latency Factor: 1.0 if answered within 2 hours; 0.7 at 4–8 hours; 0.4 at 24+ hours; 0 if never answered.
            </p>
          </div>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Illustrative Example: A 5-Location Group</h2>
          <p className="text-base text-text-muted leading-relaxed mb-6 italic">
            The figures below are illustrative and require verification against your own data. They are a worked example of the methodology — not a claim about any specific practice. Actual numbers vary widely.
          </p>
          <ul className="space-y-6 mb-8 text-lg text-text-muted">
            <li>
              <strong>Monthly inquiries per location:</strong> 300
            </li>
            <li>
              <strong>Total portfolio inquiries:</strong> 1,500
            </li>
            <li>
              <strong>Baseline conversion rate:</strong> 35% (industry standard)
            </li>
            <li>
              <strong>Average service value:</strong> $500
            </li>
            <li>
              <strong>Response latency factor:</strong> 0.6 (many inquiries answered after 8+ hours)
            </li>
          </ul>

          <p className="text-lg text-text-muted leading-relaxed mb-6 font-semibold">
            Illustrative leakage = 1,500 × 0.35 × $500 × 0.6 ≈ $157,500/month
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            In this illustrative scenario, the modeled leakage works out to roughly $1.9M per year. These numbers are an estimate of opportunity and require manual verification against your own inquiry and booking data before they mean anything for your practice.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Recovery Window</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Not all missed demand is recoverable indefinitely. As a general pattern, a patient contacted within a few hours of inquiring tends to re-engage at a meaningfully higher rate than one contacted days later, and the likelihood of recovery declines the longer the inquiry sits unanswered.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This recovery window is the critical operational constraint for revenue recovery infrastructure. The system must surface missed demand immediately—not daily, not weekly—to maximize recoverability.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Operational Implication</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Reducing response latency surfaces more of the leakage as recoverable opportunity. In the illustrative example above, a faster response could surface a portion of that modeled leakage each month — an estimate that requires verification, and that comes without new patient acquisition or marketing spend. Scrutexity charges $0 if missed-demand recovery isn&rsquo;t demonstrated.
          </p>
        </section>
      </div>
    </article>
  );
}
