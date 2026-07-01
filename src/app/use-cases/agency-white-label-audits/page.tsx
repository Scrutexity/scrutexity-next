import Link from 'next/link';
import { ArrowRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

export const metadata = {
  title: 'White-Label AI Visibility and Claim Audits for Agencies | Scrutexity',
  description: 'Scrutexity helps agencies offer white-label claim audits, AI visibility reports, governed content briefs, and proof artifacts for client launches and retainers.',
  alternates: { canonical: '/use-cases/agency-white-label-audits' }
};

export default function AgencyWhiteLabelPage() {
  const faqs = [
    {
      q: "What is a white-label AI visibility audit?",
      a: "It is a comprehensive review of a client's claims, AI answer readiness, and local visibility gaps that you can present under your agency's brand before launching a campaign."
    },
    {
      q: "Can agencies resell Scrutexity reports?",
      a: "Yes. Our agency partners resell our audits, visibility reports, and recovery briefs as part of their onboarding or ongoing monthly retainers."
    },
    {
      q: "Does Scrutexity guarantee rankings or AI answers?",
      a: "No. We do not provide guaranteed rankings, AI answers, or local pack placement. We deliver structured visibility and claim safety."
    },
    {
      q: "Can this be used for medical or wellness clients?",
      a: "Absolutely. Our governance model is specifically built for sensitive verticals like med spas, urgent care, and wellness where claim safety is paramount."
    },
    {
      q: "What deliverables do agencies receive?",
      a: "Agencies receive unbranded or co-branded AuditGPT reports, AI visibility snapshots, content briefs, and recovery action plans to present to clients."
    },
    {
      q: "How does this differ from a normal SEO audit?",
      a: "A normal SEO audit looks at technical tags and backlinks. We review claim support, reputation surfaces, missed demand leakage, and how AI engines describe the business."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">Agency Use Case</p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            White-label audits, visibility reports, and{' '}
            <span className="italic text-sage-deep font-sans">governed content briefs for agencies.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Scrutexity gives agencies a client-ready diagnostic layer for claims, AI visibility, reputation surfaces, and content strategy — without building the system from scratch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/claim-audit?intent=agency&source=agency-white-label-use-case" 
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Apply for Agency White Label
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/partners" 
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              View Partner Program
            </Link>
          </div>
        </div>

        {/* Why agencies need this */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-espresso mb-6">Why agencies need this</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Clients demand AI visibility answers.",
              "Websites launch with unsupported claims that create risk.",
              "Generic SEO audits feel stale and commoditized.",
              "Agencies need new high-value, high-margin reports.",
              "Clients need proof and clarity before expensive campaigns."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-bone border border-sand-deep/30 rounded-xl p-5">
                <CheckCircle2 size={18} className="text-sage-deep shrink-0 mt-0.5" />
                <p className="text-sm text-mist leading-[1.6]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What agencies can offer */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-espresso mb-6">What agencies can offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "White-label AuditGPT reports",
              "AI visibility snapshots",
              "Claim-safe content briefs",
              "Proof artifact recommendations",
              "Medical/wellness claim review",
              "Monthly drift monitoring"
            ].map((item, i) => (
              <div key={item} className="bg-cream-deep border border-sand-deep/30 rounded-xl p-6 text-center">
                <Layers size={24} className="text-sage-deep mx-auto mb-3" />
                <h3 className="font-sans font-bold text-base text-espresso">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* How it fits into agency services */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-espresso mb-6">How it fits into agency services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8">
              <h3 className="font-display text-xl text-espresso mb-4">Launch & Strategy</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Before website launch</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Before a new SEO campaign</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Before paid ads scaling</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Before medical/wellness content</li>
              </ul>
            </div>
            <div className="bg-bone border border-sand-deep/30 rounded-2xl p-8">
              <h3 className="font-display text-xl text-espresso mb-4">Ongoing Retainers</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Monthly client reporting</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Retainer upsells</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Monthly visibility tracking</li>
                <li className="flex items-center gap-2 text-sm text-mist"><span className="w-1.5 h-1.5 bg-sage rounded-full" /> Ongoing reputation scans</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div className="mt-20 bg-espresso text-cream rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl mb-4">What Scrutexity does not allow</h2>
          <p className="text-sm text-mist mb-6 max-w-2xl">To protect both your agency and our infrastructure, partners must adhere to strict governance limits. We do not provide or permit:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-cream/80 font-mono">
            <div><span className="text-sage mr-2">×</span> No guaranteed rankings</div>
            <div><span className="text-sage mr-2">×</span> No guaranteed AI answers</div>
            <div><span className="text-sage mr-2">×</span> No compliance approval</div>
            <div><span className="text-sage mr-2">×</span> No legal safety guarantees</div>
            <div><span className="text-sage mr-2">×</span> No clinical approval</div>
            <div><span className="text-sage mr-2">×</span> No fake proof</div>
            <div><span className="text-sage mr-2">×</span> No fake reviews</div>
          </div>
        </div>

        {/* Mid CTA */}
        <div className="mt-20 text-center">
          <p className="font-display text-2xl text-sage-deep italic mb-6">
            “Give clients a stronger diagnostic than a generic SEO audit.”
          </p>
          <Link 
            href="/claim-audit?intent=agency&source=agency-white-label-use-case" 
            className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            Apply for Agency White Label
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-espresso mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-bone border border-sand-deep/30 rounded-xl p-6">
                <h3 className="font-sans font-bold text-lg text-espresso mb-2">{faq.q}</h3>
                <p className="text-sm text-mist leading-[1.6]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        
      </main>
      <FreeSnapshotCTA source="agency-use-case" />
    </div>
  );
}
