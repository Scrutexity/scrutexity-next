
import TwinDemo from '@/components/TwinDemo';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Reactivation Demo | Scrutexity',
  description: 'Watch the AI recover a high-ticket Morpheus8 drop-off in real-time.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans selection:bg-clay/20">


      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sand-deep bg-white/52 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-clay-deep shadow-sm backdrop-blur-md">
            <Shield className="h-3.5 w-3.5 text-clay" />
            Diagnostic Review
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-espresso sm:text-5xl md:text-6xl">
            The Reactivation Twin
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-mist">
            Watch the AI recover a high-ticket Morpheus8 drop-off in real-time. Not a chatbot — a secure infrastructure node executing clinical objection handling protocols.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <TwinDemo />

          <div className="mt-20 max-w-4xl mx-auto border-t border-sand-deep pt-16">
            <p className="section-kicker mb-3">The methodology</p>
            <h2 className="font-display text-3xl tracking-tight text-espresso md:text-4xl mb-8">
              The Scrutexity AI Reactivation Methodology
            </h2>
            <div className="space-y-5 text-[15px] leading-8 text-mist">
              <p>
                In the highly competitive 2026 medical aesthetics landscape, capturing high-ticket consultation leads is only the beginning of the revenue cycle. Industry data demonstrates that up to 68% of Morpheus8, Semaglutide, and facial balancing inquiries drop off before finalizing a deposit. The Scrutexity Consultation Recovery is an enterprise-grade infrastructure node designed explicitly to solve this leakage without risking the Unauthorized Practice of Medicine (UPL).
              </p>
              <p>
                <strong className="text-espresso">The Architecture of Reactivation.</strong>{' '}
                Unlike legacy chatbots that rely on fragile decision trees, the Reactivation Twin utilizes a deep logical routing matrix. It identifies the two primary friction points in cosmetic conversions — Pain/Downtime and Price/Commitment — and escalates clinical questions directly to licensed staff rather than answering them.
              </p>
              <p>
                <strong className="text-espresso">HIPAA Compliance and Data Security.</strong>{' '}
                The Scrutexity framework is protected by a fully executed Business Associate Agreement (BAA). Every message is routed through an encrypted pipeline, ensuring that patient objections and booking requests remain fully compliant with 2026 FTC and HIPAA regulations. No medical advice is given.
              </p>
              <p>
                <strong className="text-espresso">The Conversion Analytics Ledger.</strong>{' '}
                The built-in recovery record gives you real-time visibility into every outbound message — the intent recognized, the routing action taken, and a verifiable log you can check yourself. You retain full oversight of every interaction.
              </p>
            </div>

            <div className="mt-12 rounded-[1.75rem] border border-sand-deep bg-cream-deep p-10 text-center">
              <h3 className="font-display text-2xl text-espresso mb-3">Start recovering demand today.</h3>
              <p className="text-mist mb-6 max-w-md mx-auto text-sm leading-7">
                Surface the uncaptured demand your clinic has already paid to create.
              </p>
              <a href="/pilot" className="clay-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                Get Your Free Audit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
