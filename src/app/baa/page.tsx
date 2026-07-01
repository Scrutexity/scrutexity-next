import { Shield } from 'lucide-react';

export default function BAAPage() {
  return (
    <div className="min-h-screen bg-ivory py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mx-auto w-16 h-16 bg-terracotta/10 rounded-3xl flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-terracotta" />
          </div>
          <h1 className="text-5xl font-serif text-charcoal">Business Associate Agreement</h1>
          <p className="mt-4 text-lg text-charcoal/70">Our commitment to HIPAA compliance and data protection</p>
        </div>

        <div className="prose prose-lg max-w-none text-charcoal/80">
          <h2>Overview</h2>
          <p>A Business Associate Agreement (BAA) is executed with every client prior to the activation of any module that may process Protected Health Information (PHI). This agreement satisfies the HIPAA Privacy and Security Rule requirements for covered entities and their business associates.</p>

          <h2>What the BAA Covers</h2>
          <ul>
            <li>Permitted uses and disclosures of PHI</li>
            <li>Data security safeguards (AES-256 at rest, TLS 1.2+ in transit)</li>
            <li>Breach notification procedures</li>
            <li>Data retention and destruction policies</li>
            <li>Subcontractor obligations</li>
            <li>Audit and monitoring rights</li>
          </ul>

          <h2>Data Handling</h2>
          <p>Phone numbers are SHA-256 hashed with a per-clinic salt before storage. No raw PHI is persisted in our systems. Patient inquiries are classified by intent (pricing, scheduling, clinical) and routed accordingly — clinical/dosing questions are immediately escalated to licensed staff.</p>

          <h2>Get Your BAA</h2>
          <p>The full BAA is executed as part of the onboarding process. For review before signing, contact <a href="mailto:nick@scrutexity.com" className="text-terracotta hover:underline">nick@scrutexity.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
