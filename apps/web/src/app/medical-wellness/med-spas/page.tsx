import Link from 'next/link';
import { ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

export const metadata = {
  title: 'Med Spa Marketing, AI Visibility, and Demand Recovery | Scrutexity',
  description: 'Scrutexity helps med spas improve claim-safe content, AI and local visibility, missed consult recovery, review signals, and patient-facing trust.',
  alternates: { canonical: '/medical-wellness/med-spas' }
};

export default function MedSpasPage() {
  const faqs = [
    {
      q: "How does Scrutexity help med spas?",
      a: "We recover missed consult demand, improve AI and local visibility, produce claim-safe content, and strengthen patient-facing trust surfaces without relying on risky guarantees."
    },
    {
      q: "Does Scrutexity write treatment content?",
      a: "Yes. Our Contento service produces governed content based entirely on your reviewed claims, focusing on patient education, safety, and local discovery."
    },
    {
      q: "Does Scrutexity provide medical advice?",
      a: "No. We provide structural marketing and visibility improvements. We do not provide medical, clinical, or regulatory advice."
    },
    {
      q: "What is missed consult recovery?",
      a: "Missed consult recovery involves capturing revenue from inbound inquiries (calls, forms, DMs) that were abandoned or missed due to slow response times or friction."
    },
    {
      q: "Can Scrutexity help with med spa AI visibility?",
      a: "Yes. We focus on entity extraction, local profile optimization, and FAQ structuring so that AI models accurately understand and describe your med spa."
    },
    {
      q: "What does a med spa recovery audit include?",
      a: "It includes a missed inquiry review, follow-up gap map, patient-facing claim review, visibility notes, and a prioritized recovery plan."
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">Medical & Wellness · Med Spas</p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            Med spa marketing and demand recovery{' '}
            <span className="italic text-sage-deep font-sans">without risky treatment claims.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Scrutexity helps med spas recover missed consult demand, improve AI and local visibility, produce claim-safe content, and strengthen patient-facing trust surfaces.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/claim-audit?intent=recovery&source=med-spa-vertical" 
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Request Med Spa Recovery Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/claim-audit?intent=claim-audit&source=med-spa-vertical" 
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Run AuditGPT for patient-facing claims
            </Link>
          </div>
        </div>

        {/* The med spa growth problem */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-espresso mb-6">The med spa growth problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "High-Intent Consults", desc: "Aesthetic inquiries represent significant lifetime value, yet they often fall through the cracks of a busy front desk." },
              { title: "Missed Follow-up", desc: "Missed calls, unreturned DMs, and abandoned forms are silent revenue leaks that kill ROI." },
              { title: "Treatment Sensitivity", desc: "Before/after content and treatment guarantees are highly regulated and easily cross into risky territory." },
              { title: "Local Visibility", desc: "Ranking in maps and collecting authentic reviews are critical, yet hard to manage without clear systems." },
              { title: "AI Discovery", desc: "Patients are now asking ChatGPT about treatments. If your brand lacks structured data, you won't appear." },
              { title: "Generic Content", desc: "Slapping AI-generated filler onto service pages hurts authority and trust." }
            ].map((item, i) => (
              <div key={i} className="bg-bone border border-sand-deep/30 rounded-xl p-5">
                <h3 className="font-sans font-bold text-base text-espresso mb-2">{item.title}</h3>
                <p className="text-sm text-mist leading-[1.6]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Scrutexity Reviews & Improves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          <div>
            <h2 className="font-display text-3xl text-espresso mb-6">What Scrutexity reviews</h2>
            <div className="space-y-4">
              {[
                "Treatment claims",
                "Service pages",
                "Google Business Profile",
                "Reviews and reputation",
                "Consult follow-up",
                "No-show/dormant inquiries",
                "FAQs and answer-ready content",
                "Proof and provider authority"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-cream-deep border border-sand-deep/30 rounded-xl p-4">
                  <Activity size={18} className="text-sage-deep shrink-0" />
                  <span className="text-sm text-espresso font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl text-espresso mb-6">What Scrutexity helps improve</h2>
            <div className="space-y-4">
              {[
                "Missed consult recovery",
                "Claim-safe treatment content",
                "Local/AI visibility",
                "Review request flows",
                "Staff-approved follow-up",
                "Proof blocks",
                "Provider authority pages",
                "Monthly recovery brief"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-bone border border-sand-deep/30 rounded-xl p-4">
                  <CheckCircle2 size={18} className="text-sage-deep shrink-0" />
                  <span className="text-sm text-espresso font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div className="mt-20 bg-espresso text-cream rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl mb-4">Med Spa Guardrails</h2>
          <p className="text-sm text-mist mb-6 max-w-2xl">Because we work in the medical and wellness space, our systems operate under strict governance limits to protect your practice.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-cream/80 font-mono">
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-sage" /> Staff-approved follow-up</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-sage" /> BAA before patient-adjacent activation</div>
            <div className="flex items-center gap-2 text-mist/60"><span className="text-sage">×</span> No autonomous clinical decisions</div>
            <div className="flex items-center gap-2 text-mist/60"><span className="text-sage">×</span> No medical advice</div>
            <div className="flex items-center gap-2 text-mist/60"><span className="text-sage">×</span> No legal/regulatory advice</div>
            <div className="flex items-center gap-2 text-mist/60"><span className="text-sage">×</span> No guaranteed bookings</div>
            <div className="flex items-center gap-2 text-mist/60"><span className="text-sage">×</span> No guaranteed rankings</div>
          </div>
        </div>

        {/* Offer */}
        <div className="mt-20 bg-bone border border-sand-deep/30 rounded-3xl p-8 md:p-12 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-2 block">Offer</span>
          <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">Claim Exposure Audit</h2>
          <p className="font-display text-4xl text-espresso mb-8">$497 <span className="text-lg text-mist italic font-sans">one-time</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
            <div className="flex items-center gap-2 text-sm text-bark"><CheckCircle2 size={16} className="text-sage-deep" /> Read-only claim surface scan</div>
            <div className="flex items-center gap-2 text-sm text-bark"><CheckCircle2 size={16} className="text-sage-deep" /> Patient-facing claim review</div>
            <div className="flex items-center gap-2 text-sm text-bark"><CheckCircle2 size={16} className="text-sage-deep" /> Drop-in safer rewrites</div>
            <div className="flex items-center gap-2 text-sm text-bark"><CheckCircle2 size={16} className="text-sage-deep" /> Prioritized recovery recommendations</div>
            <div className="flex items-center gap-2 text-sm text-bark"><CheckCircle2 size={16} className="text-sage-deep" /> 30-day action plan</div>
          </div>
          <Link 
            href="/claim-audit?intent=claim-audit&source=med-spa-vertical" 
            className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            Get the $497 Audit
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
      <FreeSnapshotCTA source="med-spas" />
    </div>
  );
}
