import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Scrutexity' },
  description: 'How Scrutexity collects, uses, protects, and shares business and service data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mx-auto w-16 h-16 bg-clay/10 rounded-3xl flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-clay" />
          </div>
          <h1 className="text-5xl font-serif text-espresso">Privacy Policy</h1>
          <p className="mt-4 text-lg text-espresso/70">Last updated: June 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-espresso/80">
          <h2>1. Information We Collect</h2>
          <p>Scrutexity collects only the information necessary to provide missed-demand recovery services to medical aesthetics clinics. A Business Associate Agreement (BAA) is executed before any workflow that may handle Protected Health Information (PHI) is activated.</p>
          <p>Information we may collect includes: clinic name, business address, email address, phone number, website URL, and practice management software provider.</p>

          <h2>2. How We Use Information</h2>
          <p>We use collected information solely to: provide and maintain the service, communicate with clients about their accounts, send pilot onboarding information, and improve the platform.</p>

          <h2>3. Data Protection</h2>
          <p>All data transmitted between client systems and Scrutexity is encrypted using AES-256 at rest and TLS 1.2+ in transit. Phone numbers are SHA-256 hashed with per-clinic salt before any storage. No raw PHI is persisted in our systems.</p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell, rent, or share personal information with third parties for their marketing purposes. We may share data with subcontractors who perform services on our behalf (e.g., cloud infrastructure providers), all of whom are bound by data processing agreements consistent with this policy.</p>

          <h2>5. Business Associate Agreement</h2>
          <p>A Business Associate Agreement (BAA) is executed with each client prior to activation of any module that may process PHI. The BAA governs all data handling practices and is available for review upon request.</p>

          <h2>6. Contact</h2>
          <p>For privacy-related inquiries, contact: <a href="mailto:nick@scrutexity.com">nick@scrutexity.com</a></p>
        </div>
      </div>
    </div>
  );
}
