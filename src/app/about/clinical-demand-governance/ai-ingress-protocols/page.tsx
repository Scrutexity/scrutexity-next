import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ingress Protocols: Protecting Clinical Lead Integrity | Scrutexity",
  description: "How AI-powered ingress protocols surface patient demand while maintaining clinical compliance and medical director oversight.",
  alternates: {
    canonical: "/about/clinical-demand-governance/ai-ingress-protocols",
  },
};

export default function AIIngressProtocols() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Clinical Demand Governance</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            The Role of AI Ingress Protocols in Protecting Clinical Lead Integrity
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            How to normalize patient demand across channels without automating clinical decisions.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">AI as a Data Layer, Not a Decision Layer</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            The most dangerous misunderstanding in healthcare automation is treating AI as a decision-making system. In reality, AI-powered ingress protocols should operate as a data normalization and routing layer—collecting, organizing, and presenting information to humans who hold clinical authority.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Three Rules of Clinical Ingress</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Rule 1: Normalize, Never Modify</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Extract and canonicalize patient inquiry data (name, contact method, timestamp, service request) without rewriting or interpreting clinical content. If a patient says "Botox for frown lines," preserve that exact phrasing. Do not infer, generalize, or correct.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Rule 2: Route to Judgment, Not to Rules</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Send all complex or ambiguous inquiries to a licensed clinical staff member—not to a flowchart, not to an automated response. The clinical staff member decides whether the inquiry warrants immediate action, follow-up, or redirection.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Rule 3: Audit Everything</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Every normalization step, every routing decision, and every human action must be logged with full context. This creates accountability and enables post-hoc review for compliance and quality audits.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Compliance Implications</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This approach directly supports CPOM (Comprehensive Plan of Management) and FTC regulations. You are not offering medical advice. You are not automating clinical decisions. You are presenting information to the clinicians who are already responsible for those decisions.
          </p>
        </section>
      </div>
    </article>
  );
}
