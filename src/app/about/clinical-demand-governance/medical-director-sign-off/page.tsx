import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Director Sign-Off Frameworks | Scrutexity",
  description: "How to balance automated patient routing with strict medical director oversight and clinical governance protocols.",
  alternates: {
    canonical: "/about/clinical-demand-governance/medical-director-sign-off",
  },
};

export default function MedicalDirectorSignOff() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Clinical Demand Governance</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Balancing Patient Acquisition and Medical Director Sign-Off Frameworks
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            How to maintain clinical control while scaling demand processing across multiple locations.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Tension</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Most medspa operators want to scale patient intake—but they also want to maintain strict control over which patients are routed where, who talks to whom, and what clinical guardrails are enforced at each location. These are not opposing goals. They require a clear, documented sign-off framework.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Three Levels of Sign-Off</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Level 1: Automated Routing (Pre-Approved Protocols)</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Patient inquiry for a service offered at the location, clear contact info, no red flags → route directly to scheduler or senior aesthetician with automated notification. Medical director has signed off on the protocol in advance.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Level 2: Conditional Review (Ambiguous Inquiries)</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Inquiry references a condition, comorbidity, or prior procedure that requires clinical judgment → surface to medical director or nurse advisor with full patient context. They decide routing.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">Level 3: Escalation (Contraindications)</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Inquiry signals potential contraindication, medication conflict, or medical complexity → flag for urgent medical director review. Do not route to scheduler.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Implementation at Scale</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Multi-location operators benefit from a centralized Medical Director Council that defines protocols across the portfolio while allowing regional customization for specific service lines or patient populations.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Every protocol must be documented, signed, dated, and traceable. This is not operational overhead—it is compliance infrastructure that protects the operator, the clinicians, and the patients.
          </p>
        </section>
      </div>
    </article>
  );
}
