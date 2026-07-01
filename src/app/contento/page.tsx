import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';
import ContentoWorkspace from '@/components/scrutexity/contento-workspace';

export const metadata = {
  title: 'Contento by Scrutexity | Governed Content Production',
  description: 'Create content from claims you can actually stand behind. Contento is an embedded, pilot-stage layer for approved claims and proof-backed strategy.',
};

export default function ContentoPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Contento",
    "description": "Contento is the embedded, pilot-stage content strategy and production layer that creates governed content from approved claims and safer framing.",
    "provider": { "@type": "Organization", "name": "Scrutexity" },
    "areaServed": "United States or Online",
    "url": "https://www.scrutexity.com/contento"
  };

  const faqs = [
    {
      q: "What is Contento by Scrutexity?",
      a: "Contento is a governed content strategy and production layer currently offered through embedded AuditGPT follow-on work and selected pilots. Materials use only approved claims, verified proof, and safer framing."
    },
    {
      q: "How is Contento different from a generic AI content generator?",
      a: "Generic AI generators invent claims and publish generic filler. Contento builds structured, specific content based directly on your AuditGPT plan and verified brand claims."
    },
    {
      q: "What does governed content mean?",
      a: "Governed content means every paragraph, service page, or social post maps back to a verifiable claim or a safer frame, minimizing marketing risk."
    },
    {
      q: "What content can Contento produce?",
      a: "In embedded or pilot engagements, Contento can produce SEO/GEO service pages, blog content, Google Business posts, email campaigns, social captions, proof blocks, and agency client deliverables."
    },
    {
      q: "Does Contento create medical or wellness content?",
      a: "Yes. Contento specializes in producing content for medical and wellness businesses by strictly adhering to approved claims and avoiding autonomous clinical advice."
    },
    {
      q: "How does Contento use approved claims?",
      a: "We extract the supported claims from your AuditGPT report and use them as the architectural foundation for all content, ensuring consistency and safety."
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">The Anti-Slop Engine</p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            The content engine that can't make a claim <span className="italic text-sage-deep font-sans">you can't back up.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Generic AI content generators optimize for visibility, but they hallucinate claims that create medical liability. Contento is the exact opposite. It is an embedded production layer that generates content <em>only</em> from your SHA-256 reviewed claim dataset. No slop. No hallucinations. Just documented truth.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link 
              href="/claim-audit?intent=contento&source=landing_page" 
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Join the Contento waitlist
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/sample-report" 
              className="px-7 py-4 bg-bone border border-sand-deep/30 hover:bg-sand-deep/20 text-ink font-sans font-semibold rounded-xl transition-all duration-300 text-sm"
            >
              View a Sample Audit Receipt
            </Link>
          </div>
        </div>

        {/* Interactive Governed Workspace demo */}
        <section className="mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">Live · The Governed Workspace</p>
          <ContentoWorkspace />
          <p className="mt-4 text-center text-[11px] text-mist font-mono uppercase tracking-[0.14em]">
            Illustrative demo · placeholder data · nothing real is published
          </p>
        </section>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div className="bg-bone border border-sand-deep/30 rounded-3xl p-8 flex flex-col justify-center">
            <div className="mb-8">
              <FileText size={32} className="text-sage-deep mb-4" />
              <h2 className="font-display text-3xl text-espresso mb-3">Contento Deliverables</h2>
              <p className="text-sm text-mist leading-[1.6]">
                In embedded and pilot engagements, Contento ensures produced materials map back to a reviewed claim or a safe frame. Deliverables can include:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'SEO/GEO service pages',
                'Blog & authority content',
                'Google Business posts',
                'Email & SMS campaigns',
                'Social captions',
                'Ad copy',
                'Proof blocks',
                'Founder scripts'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-bark font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-deep shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-espresso mb-6">Why governed content?</h2>
            <div className="space-y-6">
              {[
                { title: 'The Grounding Verifier', desc: 'Our system strictly rejects any generated claim that cannot be mapped directly to your proven dataset. If you can\'t back it up, it won\'t write it.' },
                { title: 'Claim Safety', desc: 'Every piece of content is structured around claims that your organization can prove to a PE diligence team.' },
                { title: 'Visibility Aligned', desc: 'Content is built to satisfy AI Overviews, structured search, and trust requirements.' },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-4 p-5 bg-cream-deep border border-sand-deep/30 rounded-2xl">
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
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-16 border-t border-sand-deep/15 text-center">
          <p className="font-display text-2xl text-sage-deep italic mb-6">
            Our model: AuditGPT gives the diagnosis. Contento drafts governed content in embedded and pilot engagements.
          </p>
          <Link 
            href="/claim-audit?intent=contento&source=landing_page" 
            className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            Join the Contento waitlist
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
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
      <FreeSnapshotCTA source="contento" />
    </div>
  );
}
