import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Demand Governance | Scrutexity",
  description: "The architecture of Clinical Demand Governance: scaling medical aesthetic infrastructure to capture missed patient demand while maintaining compliance.",
  alternates: {
    canonical: "/about/clinical-demand-governance",
  },
  openGraph: {
    title: "Clinical Demand Governance Architecture",
    description: "How to scale medical aesthetic infrastructure and capture missed patient demand.",
    url: "https://scrutexity.com/about/clinical-demand-governance",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": "https://scrutexity.com/about/clinical-demand-governance#article",
  "headline": "The Architecture of Clinical Demand Governance: Scaling Medical Aesthetic Infrastructure",
  "description": "Deep technical guide to clinical demand governance frameworks, implementation patterns, and infrastructure design for high-volume medspas.",
  "url": "https://scrutexity.com/about/clinical-demand-governance",
  "author": {
    "@type": "Organization",
    "name": "Scrutexity",
    "url": "https://scrutexity.com"
  },
  "datePublished": new Date().toISOString().split('T')[0],
  "articleSection": "Technical Infrastructure",
  "keywords": "clinical demand governance, medspa infrastructure, patient demand routing, clinical exception handling"
};

export default function ClinicalDemandGovernance() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            The Architecture of Clinical Demand Governance
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Scaling medical aesthetic infrastructure to capture missed patient demand while maintaining strict compliance and operator control.
          </p>
        </header>

        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">What is Clinical Demand Governance?</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Clinical Demand Governance is the operational framework that ensures patient inquiries—across all channels—reach the right clinical staff member at the right time, without automating clinical decisions or bypassing medical director oversight.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            It is not patient acquisition. It is not demand generation. It is the infrastructure layer that prevents high-volume medspas and aesthetic practices from losing patient-initiated demand that already exists—calls, forms, DMs, chat—to processing delays, channel fragmentation, and routing ambiguity.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Three Pillars of the Framework</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">1. Unified Demand Ingress</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Normalize inbound patient signals across email, phone, SMS, Instagram DM, web forms, and PMS internal messaging into a single canonicalized view. This eliminates channel-specific bottlenecks and ensures that a voicemail in phone and a form submission are recognized as the same patient inquiry, not two separate signals.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">2. Clinical Exception Routing</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Route complex, ambiguous, or out-of-scope inquiries directly to licensed clinical staff—not to algorithmic rules, not to chatbots. Preserve human judgment for medical and clinical decisions. Automate only data presentation and notification.
          </p>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">3. Auditable Decision Trail</h3>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Maintain a tamper-evident, independently verifiable record of every patient inquiry, every routing decision, and every clinical sign-off. This is critical for PE diligence, regulatory compliance, and internal operational audits.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Why This Matters at Scale</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            A single-location practice can lose a few patient inquiries each week to delays or missed channels. Across a multi-location MSO operating Boulevard or Zenoti, that compounds into a meaningful monthly volume—because the front desk can only answer one phone at a time, and web forms get buried in email. The exact count is something to measure per practice, not assume.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            At that scale, demand governance is not a feature—it is operational infrastructure. And it must be read-only, non-invasive, and clinically conservative.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Governance in Practice</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Clinical Demand Governance does not replace medical directors, nurse advisors, or operations teams. It augments them by ensuring that every patient inquiry—wherever it arrives—gets surfaced, documented, and routed to the right decision-maker with full context.
          </p>
        </section>

        <section className="mt-16 pt-12 border-t border-border-muted">
          <h3 className="text-2xl font-display font-semibold mb-6 text-charcoal">Related Topics</h3>
          <ul className="space-y-4 text-lg">
            <li>
              <a href="/about/clinical-demand-governance/patient-leakage-audit" className="text-terracotta hover:text-[#a36b5d] font-medium">
                Quantifying Patient Leakage: A Technical Audit of Missed Inquiries
              </a>
            </li>
            <li>
              <a href="/about/clinical-demand-governance/ai-ingress-protocols" className="text-terracotta hover:text-[#a36b5d] font-medium">
                The Role of AI Ingress Protocols in Protecting Clinical Lead Integrity
              </a>
            </li>
            <li>
              <a href="/about/clinical-demand-governance/medical-director-sign-off" className="text-terracotta hover:text-[#a36b5d] font-medium">
                Balancing Patient Acquisition and Medical Director Sign-Off Frameworks
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
