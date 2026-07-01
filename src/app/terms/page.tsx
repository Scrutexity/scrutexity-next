import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mx-auto w-16 h-16 bg-terracotta/10 rounded-3xl flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-terracotta" />
          </div>
          <h1 className="text-5xl font-serif text-charcoal">Terms of Service</h1>
          <p className="mt-4 text-lg text-charcoal/70">Last updated: June 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-charcoal/80">
          <h2>1. Service Description</h2>
          <p>Scrutexity provides revenue infrastructure and compliance protection services for medical aesthetics clinics. Our services are provided on a subscription basis as described in the applicable Master Services Agreement.</p>

          <h2>2. Pilot Program</h2>
          <p>The 14-day pilot program is offered at $0 upfront. If the mutually agreed-upon recovery metric is not achieved within the first 30 days, your first month is free. Revenue goals, measurement methodology, and dispute resolution are defined in writing prior to activation.</p>

          <h2>3. Payment Terms</h2>
          <p>Subscription fees are billed monthly in advance. Fees are based on infrastructure access, ledger seats, and message volume — not on patient volume, procedure pricing, or clinical outcomes.</p>

          <h2>4. Compliance</h2>
          <p>A Business Associate Agreement (BAA) is executed prior to activation of any module that processes Protected Health Information. Scrutexity architects for HIPAA compliance and FTC marketing law adherence.</p>

          <h2>5. Limitation of Liability</h2>
          <p>Scrutexity&apos;s liability is limited to the fees paid for the specific module giving rise to the claim. We are not liable for consequential damages, lost revenue, or business interruption.</p>

          <h2>6. Governing Law</h2>
          <p>These terms are governed by the laws of the State of New York.</p>
        </div>
      </div>
    </div>
  );
}
