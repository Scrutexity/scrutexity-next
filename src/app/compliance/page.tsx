
import Link from 'next/link';
import { Shield, Lock, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Compliance Architecture | Scrutexity',
  description: 'Absolute clarity on performance targets, HIPAA-conscious engineering, and data ownership.',
};

export default function Compliance() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans selection:bg-clay/20">


      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Trust &amp; Compliance</p>
          <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-espresso sm:text-5xl md:text-6xl">
            Compliance Architecture
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-mist">
            Absolute clarity on performance targets, HIPAA-conscious engineering, and data ownership.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 pt-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">

          <div className="luxury-panel p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-clay rounded-l-[1.75rem]" />
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="h-5 w-5 text-clay flex-shrink-0" />
              <h2 className="font-display text-2xl text-espresso">Pilot Fee Waiver Disclosure</h2>
            </div>
            <p className="text-mist mb-5 font-semibold text-sm">
              Our 14-day pilot is $0 if missed-demand recovery isn&rsquo;t demonstrated. Here is exactly what that means:
            </p>
            <div className="rounded-2xl border border-sand-deep bg-[#f7f2ea] p-6 text-sm leading-relaxed space-y-3 text-mist">
              <p><strong className="text-espresso">Missed-demand recovery results vary</strong> based on existing inquiry volume, baseline response practices, and the specific module configuration deployed. Estimates are directional and require manual verification.</p>
              <div className="flex items-start gap-3">
                <span className="text-sage-accent mt-0.5 font-bold flex-shrink-0">✓</span>
                <p><strong className="text-espresso">Pilot recovery thresholds — a minimum number of verified re-engaged bookings — are defined and agreed upon in writing</strong> during the initial onboarding sequence, prior to any technical activation. Thresholds are never expressed as procedure value or clinical revenue.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sage-accent mt-0.5 font-bold flex-shrink-0">✓</span>
                <p>If the active infrastructure does not reach the mutually agreed-upon recovery threshold within the assessment window, <strong className="text-espresso">no pilot fees apply</strong> and the infrastructure is cleanly rolled back at no cost to the clinic.</p>
              </div>
            </div>
          </div>

          <div className="luxury-panel p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-5 w-5 text-sage-accent flex-shrink-0" />
              <h2 className="font-display text-2xl text-espresso">HIPAA-Conscious Data Handling</h2>
            </div>
            <p className="text-sm leading-7 text-mist mb-6">
              Scrutexity builds systems engineered to support the strict regulatory environments of premier aesthetic clinics.
            </p>
            <ul className="space-y-5 text-sm">
              {[
                {
                  num: '01',
                  title: 'Business Associate Agreement (BAA)',
                  body: 'We require a fully executed BAA prior to activating any module that processes Protected Health Information (PHI), such as the Consultation Recovery.',
                },
                {
                  num: '02',
                  title: 'Encrypted Transmission',
                  body: 'All data ingested from your booking software (Zenoti, Boulevard, Mangomint) is encrypted in transit using TLS 1.3 and at rest using AES-256 standards.',
                },
              ].map((item) => (
                <li key={item.num} className="flex items-start gap-4">
                  <span className="text-xs font-bold text-sage-accent mt-0.5 flex-shrink-0">{item.num}</span>
                  <div>
                    <strong className="text-espresso">{item.title}</strong>
                    <p className="text-mist mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="luxury-panel p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <Lock className="h-5 w-5 text-mist flex-shrink-0" />
              <h2 className="font-display text-2xl text-espresso">Marketing Privacy &amp; Compliance</h2>
            </div>
            <p className="text-sm leading-7 text-mist mb-4">
              Our infrastructure is built to protect your clinic from the growing liability of unauthorized third-party tracking.
            </p>
            <div className="space-y-4 text-sm leading-7 text-mist">
              <p>
                Standard agency practices often inject unmanaged Meta and Google tracking pixels directly onto patient-facing pages. This creates severe regulatory exposure under recent FTC and OCR guidelines regarding the unauthorized disclosure of health-seeking behavior.
              </p>
              <p>
                Scrutexity&rsquo;s Compliance Airlock module establishes a secure server-side boundary. We intercept tracking requests, strip potentially identifying metadata, and manage the flow of conversion signals back to advertising networks, ensuring you can validate marketing ROI without compromising patient privacy.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/intelligence/ftc-pixel-compliance" className="btn-ghost btn-md">
              Read the FTC Pixel Compliance Guide
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}
