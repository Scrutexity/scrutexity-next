import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim-Safe Lead Capture & Risk Mitigation | Scrutexity",
  description: "How to automate lead capture for missed-demand recovery while maintaining CPOM and FTC compliance.",
  alternates: {
    canonical: "/about/revenue-recovery-infrastructure/claim-safe-lead-capture",
  },
};

export default function ClaimSafeLeadCapture() {
  return (
    <article className="min-h-screen py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wide mb-4">Revenue Recovery Infrastructure</p>
          <h1 className="text-5xl font-display font-semibold mb-6 text-charcoal leading-tight tracking-tight">
            Automating Claim-Safe Lead Capture: Risk Mitigation in Medspa Re-engagement Engines
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            How to identify and contact missed-demand patients without making unqualified claims about results or guarantees.
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Compliance Baseline</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            The FTC regulates claims about revenue recovery, patient outcomes, and financial results. The CPOM rules restrict automated patient communication. The intersection creates operational constraints: you can identify missed demand, but you must be surgical about how you communicate the opportunity to re-engage.
          </p>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">The Claim-Safe Approach</h2>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">What You Can Say</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✓ "We noticed your inquiry about [service] — let's finish the conversation."</li>
            <li>✓ "Your appointment from [date] can be rescheduled for [dates]."</li>
            <li>✓ "We've identified availability that matches your requested timeframe."</li>
          </ul>

          <h3 className="text-2xl font-display font-semibold mb-4 text-charcoal mt-8">What You Cannot Say</h3>
          <ul className="space-y-3 text-lg text-text-muted mb-8">
            <li>✗ "You'll recover $X in missed bookings."</li>
            <li>✗ "This system guarantees revenue increase."</li>
            <li>✗ "Automated recovery of your lost patients."</li>
            <li>✗ "AI will find every missed appointment."</li>
          </ul>

          <h2 className="text-3xl font-display font-semibold mb-6 text-charcoal mt-12">Technical Implementation</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            Claim-safe lead capture requires three components: (1) accurate detection of missed-demand patterns in your PMS data, (2) human review before any outreach is initiated, (3) compliant messaging templates that describe the facts (an inquiry was made, a booking was abandoned) without overstating the intervention.
          </p>

          <p className="text-lg text-text-muted leading-relaxed mb-6">
            This is why revenue recovery is a 14-day pilot, not an automation. The first two weeks establish whether the re-engagement actually works, under human supervision, before scaling to full automation.
          </p>
        </section>
      </div>
    </article>
  );
}
