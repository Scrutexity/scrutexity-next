import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrutexity vs. Mindbody: Revenue Recovery on Legacy PMS | Scrutexity",
  description: "Comparison: How Scrutexity adds clinical governance and revenue recovery to existing Mindbody deployments without migration.",
  alternates: {
    canonical: "/versus/mindbody",
  },
};

export default function VsMindbody() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Scrutexity vs. Mindbody: Parallel Governance Without Disruption
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Why Mindbody operators need a separate system for clinical demand governance and revenue recovery.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Mindbody: The Scaling Challenge</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Mindbody is designed for single-location and small multi-location operators. As medspa groups scale to 10, 20, or 50 locations, Mindbody's operational model—multiple isolated instances, limited cross-location visibility, polling-based API architecture—becomes a constraint.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Portfolio operators need portfolio-level demand intelligence. Mindbody was not built for this use case.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Core Problem: Fragmented Visibility</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Mindbody's Limitation</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✗ Each location has a separate Mindbody instance</li>
            <li>✗ No native cross-location demand aggregation</li>
            <li>✗ API polling creates latency (5–15 minutes)</li>
            <li>✗ No built-in clinical governance routing</li>
            <li>✗ Limited audit trail for PE/franchise compliance</li>
          </ul>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Scrutexity's Solution</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ Unified portfolio view across all locations and all Mindbody instances</li>
            <li>✓ Real-time missed-demand detection (polling optimized for Mindbody's architecture)</li>
            <li>✓ Clinical exception routing with medical director override</li>
            <li>✓ Tamper-evident audit trail for compliance and PE diligence</li>
            <li>✓ Portfolio benchmarking (location-to-location comparison)</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Data Pipeline: Mindbody to Scrutexity</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Scrutexity establishes a parallel read-only connection to each Mindbody instance. Data is normalized into a unified schema, aggregated at the portfolio level, and analyzed for missed-demand patterns. Your Mindbody system continues to operate independently.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This is not a Mindbody replacement. This is an operational intelligence layer on top of Mindbody.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Compliance Advantage</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Mindbody is a business management system. It does not address clinical governance or CPOM/FTC compliance at the inquiry routing level. Scrutexity adds this layer: patient inquiry → clinical routing decision → action audit.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            For PE-backed operators, this is a material advantage in due diligence. You have a documented, auditable clinical governance framework—separate from your PMS.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Why Not Upgrade to Zenoti?</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Migrating from Mindbody to Zenoti is a 4–8 week project per location. For a 20-location group, that is months of operational disruption, staff retraining, and potential data loss. Scrutexity runs parallel to Mindbody, adding intelligence without disruption.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            You can adopt clinical demand governance immediately, at scale, without migration risk.
          </p>
        </section>
      </div>
    </article>
  );
}
