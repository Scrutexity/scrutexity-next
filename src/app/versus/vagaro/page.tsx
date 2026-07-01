import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrutexity vs. Vagaro: Enterprise Governance at Medspa Scale | Scrutexity",
  description: "Comparison: How Scrutexity provides clinical governance and PE-ready audit infrastructure for Vagaro operators.",
  alternates: {
    canonical: "/versus/vagaro",
  },
};

export default function VsVagaro() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Scrutexity vs. Vagaro: Enterprise Governance at Medspa Scale
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Why PE-backed and franchise medspa groups need Scrutexity's clinical governance layer alongside Vagaro.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Vagaro: Strong PMS, Limited Governance</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Vagaro is a modern, well-designed practice management system for salons, spas, and aesthetics. It handles scheduling, payments, inventory, and staff management effectively. However, Vagaro does not address clinical governance, portfolio-level demand intelligence, or compliance infrastructure for medical-grade operations.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            For traditional salons, this is fine. For medical aesthetics operators and medspa franchises, it is a blind spot.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Governance Gap</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">What Vagaro Does Well</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ Modern, intuitive booking interface</li>
            <li>✓ Strong payment processing and financial reporting</li>
            <li>✓ Staff scheduling and performance tracking</li>
            <li>✓ Client relationship management basics</li>
            <li>✓ Mobile app for clients and staff</li>
          </ul>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">What Vagaro Does Not Address</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✗ Clinical exception routing based on patient history or contraindications</li>
            <li>✗ Portfolio-level demand intelligence across multiple locations</li>
            <li>✗ Compliance audit trail for CPOM/FTC regulatory requirements</li>
            <li>✗ Medical director sign-off workflows</li>
            <li>✗ Missed-demand recovery infrastructure</li>
            <li>✗ PE due diligence documentation</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Scrutexity as the Governance Layer</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Scrutexity reads from your Vagaro database in real time, surfaces missed-demand patterns, and routes complex clinical inquiries to the appropriate medical director or nurse advisor. Your Vagaro system continues to manage scheduling, payments, and operations.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This division of responsibility is clean:
          </p>

          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li><strong>Vagaro:</strong> "Where will the patient sit, who will serve them, and how much will we charge?"</li>
            <li><strong>Scrutexity:</strong> "Who should we call, and is this inquiry safe to process?"</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">PE Diligence & Franchise Compliance</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Private equity operators and franchise groups need evidence of clinical governance. A PE diligence team will ask: Do you have a documented process for handling complex patient inquiries? Can you prove that medical directors are making clinical decisions? Do you have an audit trail?
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Vagaro does not provide this. Scrutexity does. The combination—Vagaro for operations, Scrutexity for governance—is what PE and franchise operators are looking for.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Portfolio Scaling</h2>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            As you grow from 1 location to 5, 10, or 50 locations, Vagaro can scale the operational side. But you need portfolio-level demand intelligence and governance across all locations. That requires Scrutexity.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            The result: a medspa group that operates like a modern, scaled business—with PE-ready governance infrastructure and clinical authority that is clear, auditable, and compliant.
          </p>
        </section>
      </div>
    </article>
  );
}
