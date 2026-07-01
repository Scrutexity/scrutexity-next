import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quantifying Patient Leakage: Technical Audit of Missed Inquiries | Scrutexity",
  description: "How to measure and audit missed patient inquiries across all channels. Technical framework for identifying leakage points in medspa demand workflows.",
  alternates: {
    canonical: "/about/clinical-demand-governance/patient-leakage-audit",
  },
};

export default function PatientLeakageAudit() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Clinical Demand Governance</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Quantifying Patient Leakage: A Technical Audit of Missed Inquiries in High-Volume Medspas
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Measuring the operational cost of unanswered forms, voicemails, and abandoned chats.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Measurement Problem</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Most medspas have no systematic way to measure demand loss. They know they're busy, but they don't know how many patient inquiries arrive unanswered, unnoticed, or delayed past the point of conversion.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This is not a sales problem—it's a data visibility problem. The inquiries are real. The patients are real. But they live across five different systems: the phone, email, Instagram DM, web form, and—if the location uses Boulevard or Zenoti—buried in the PMS internal messaging queue.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Building the Audit</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            A technical audit requires reading from all five channels simultaneously and asking three questions:
          </p>

          <ol className="space-y-6 mb-8">
            <li className="text-lg text-text-muted leading-relaxed">
              <strong>Response latency:</strong> How long between inquiry arrival and first staff response?
            </li>
            <li className="text-lg text-text-muted leading-relaxed">
              <strong>Channel bias:</strong> Which channels get consistent response? Which are routinely ignored?
            </li>
            <li className="text-lg text-text-muted leading-relaxed">
              <strong>Conversion loss:</strong> Which inquiries were answered after they became unrecoverable?
            </li>
          </ol>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            The last metric is the hardest. It requires comparing inquiry timestamp to booking timestamp and estimating the window of recoverability (typically 4–72 hours depending on service type).
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Multi-Location Scale</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            At portfolio scale (10+ locations), the compounding effect becomes severe. If each location loses 15–25 inquiries per week to latency or channel fragmentation, a 20-location operator is losing 300–500 monthly inquiries—approximately $18K–$30K in lost revenue per month, assuming average service value of $400–$600.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            These are not new patients. They are patients who selected your practice, initiated contact, and then drifted because the response was too slow or the message was never surfaced.
          </p>
        </section>
      </div>
    </article>
  );
}
