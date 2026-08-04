import Link from 'next/link';
import { ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

export const metadata = {
  title: 'AI Visibility by Scrutexity | Structured Visibility & Trust Presence',
  description: 'Make your business easier for humans and AI systems to find, understand, and describe from structured, verifiable information.',
};

export default function AIVisibilityPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Visibility",
    "description": "AI Visibility helps businesses become easier for humans and AI systems to find, understand, and describe from structured, verifiable information.",
    "provider": { "@type": "Organization", "name": "Scrutexity" },
    "areaServed": "United States or Online",
    "url": "https://www.scrutexity.com/ai-visibility"
  };

  const faqs = [
    {
      q: "What is AI visibility?",
      a: "AI visibility is the practice of ensuring your brand is discoverable, understandable, and accurately described across AI search engines like ChatGPT, Perplexity, and Google AI Overviews."
    },
    {
      q: "How is AI visibility different from SEO?",
      a: "Traditional SEO focuses on ranking ten blue links via keywords and backlinks. AI visibility focuses on entity extraction, answer readiness, and ensuring machines understand your verifiable claims."
    },
    {
      q: "Can Scrutexity guarantee that my business appears in ChatGPT or Google AI Overviews?",
      a: "No. We provide no guaranteed rankings, AI answers, local pack placement, or AI Overview placement. We deliver structured visibility best practices."
    },
    {
      q: "What does an AI Visibility Audit include?",
      a: "It includes an AI answer visibility snapshot, local/GBP review, review signal review, entity/citation gap analysis, and content opportunity mapping."
    },
    {
      q: "What makes content answer-ready?",
      a: "Answer-ready content is written in plain language, uses structured data, contains clear FAQs, and removes ambiguity about what the entity (your business) does and does not do."
    },
    {
      q: "How do reviews and proof affect AI visibility?",
      a: "AI models often ingest review platforms and trust signals to form opinions about a brand. Structured proof and verified reviews are critical to shaping an accurate AI narrative."
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">AI Visibility & Trust Presence</p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            Discoverable and correctly described{' '}
            <span className="italic text-sage-deep font-sans">across AI and local search.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Buyers now discover brands through Google, local search, reviews, AI answers, ChatGPT, Perplexity, Gemini, and social proof. Scrutexity helps businesses improve how they appear across these new reputation surfaces. We do not sell search snake oil; we deliver structured visibility, answer readiness, and trust presence. No rankings, AI answers, or AI Overview placements are guaranteed.
          </p>
          <div className="mt-8">
            <Link 
              href="/claim-audit?intent=ai-visibility&source=landing_page" 
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Run an AI Visibility Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="font-display text-3xl text-espresso mb-6">Structured Visibility</h2>
            <div className="space-y-6">
              {[
                { title: 'AI Answer Readiness', desc: 'Ensuring your brand provides clear, structured answers that AI engines like Perplexity and ChatGPT can parse.' },
                { title: 'Entity & Citation Cleanup', desc: 'Fixing the fragmented data across the web that confuses AI models and local search algorithms.' },
                { title: 'Review Signal Strategy', desc: 'Converting patient and client outcomes into structured reviews that build trust.' },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-4 p-5 bg-bone border border-sand-deep/30 rounded-2xl">
                  <span className="h-6 w-6 shrink-0 rounded-full bg-sage/15 text-sage-deep text-[10px] font-bold font-mono flex items-center justify-center">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-espresso mb-1">{item.title}</h3>
                    <p className="text-sm text-mist leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream-deep border border-sand-deep/45 rounded-3xl p-8 flex flex-col justify-center">
            <div className="mb-8">
              <Eye size={32} className="text-sage-deep mb-4" />
              <h2 className="font-display text-3xl text-espresso mb-3">Our Core Methods</h2>
              <p className="text-sm text-mist leading-[1.6]">
                We avoid risky guarantees on ChatGPT rankings or AI Overviews. Instead, we use a structured strategy.
              </p>
            </div>
            
            <ul className="space-y-3.5 bg-bone p-6 rounded-2xl border border-sand-deep/20">
              {[
                'How AI systems describe your business',
                'Whether your services appear in AI answers',
                'Google Business Profile optimization',
                'Local service page strategy',
                'FAQ and answer block creation',
                'Review and trust signal strategy',
                'Competitor AI visibility comparison'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-bark font-mono">
                  <CheckCircle2 size={14} className="text-sage shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-16 border-t border-sand-deep/15 text-center">
          <h2 className="font-display text-3xl text-espresso mb-6">See how the machines see you.</h2>
          <Link 
            href="/claim-audit?intent=ai-visibility&source=landing_page" 
            className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            Run an AI Visibility Audit
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="mt-8 flex justify-center text-[10px] font-mono text-mist uppercase tracking-widest gap-2">
            No search snake oil. Only structured visibility.
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
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
      <FreeSnapshotCTA source="ai-visibility" />
    </div>
  );
}
