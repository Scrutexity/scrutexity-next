import Link from 'next/link';
import { ArrowRight, ShieldCheck, Handshake } from 'lucide-react';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

export const metadata = {
  title: 'Partner with Scrutexity | Governed Marketing Referral Program',
  description: 'Refer clients to Scrutexity for governed marketing, claim audits, and demand recovery. Transparent payouts without treating partners as employees.',
};

export default function PartnersPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Scrutexity Partner Program",
    "description": "Scrutexity partner program for agencies, consultants, and platforms to offer white-label audits and governed content.",
    "provider": { "@type": "Organization", "name": "Scrutexity" },
    "areaServed": "United States or Online",
    "url": "https://www.scrutexity.com/partners"
  };

  const faqs = [
    {
      q: "Who can become a Scrutexity partner?",
      a: "Marketing agencies, SEO consultants, medical advisors, SaaS platforms, and private equity firms looking to standardize visibility, content, and claim safety for their clients or portfolio companies."
    },
    {
      q: "What can partners introduce?",
      a: "Partners can introduce clients to AuditGPT, Contento, AI Visibility sprints, and Missed Demand Recovery workflows, either as direct referrals or white-label deliverables."
    },
    {
      q: "Are partners employees?",
      a: "No. Partners are independent entities. We maintain clean boundaries: you own the client relationship, and we provide the infrastructure."
    },
    {
      q: "Are payouts guaranteed?",
      a: "No payouts are guaranteed until a referred client successfully completes payment and signs an agreement with Scrutexity."
    },
    {
      q: "What claims can partners make about Scrutexity?",
      a: "Partners can claim that Scrutexity provides structural audits, governed content, visibility reporting, and missed demand recovery workflows."
    },
    {
      q: "What claims are partners not allowed to make?",
      a: "Partners must not promise guaranteed search rankings, guaranteed AI answers, clinical approval, legal/compliance safety, or guaranteed revenue on behalf of Scrutexity."
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep mb-4">Partner Network</p>
          <h1 className="font-display text-4xl md:text-6xl text-espresso tracking-tight leading-[1.05]">
            Refer clients who need{' '}
            <span className="italic text-sage-deep font-sans">governed growth and recovery.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-mist leading-[1.6]">
            Agencies, consultants, and operators trust Scrutexity to handle the claim auditing, visibility structuring, and demand recovery they don&apos;t want to manage in-house. We offer transparent payouts and clean boundaries without treating you like an employee.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/partner-os" 
              className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_8px_24px_rgba(94,122,90,0.15)]"
            >
              Apply for Partner Beta
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/pricing" 
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              View White Label Pricing
            </Link>
            <Link 
              href="/partners/agency-console" 
              className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/40 text-espresso font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
            >
              Agency Console
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="font-display text-3xl text-espresso mb-6">How the partnership works</h2>
            <div className="space-y-6">
              {[
                { title: 'Clean Boundaries', desc: 'You maintain the client relationship. We act as the specialized infrastructure for audits, governed content, and recovery.' },
                { title: 'Transparent Payouts', desc: 'Clear commission structures for direct referrals, or wholesale pricing for white-label agency partners.' },
                { title: 'No Exclusivity Traps', desc: 'We don\'t force you into restrictive contracts or expect you to be a full-time sales rep for us.' },
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
              <Handshake size={32} className="text-sage-deep mb-4" />
              <h2 className="font-display text-3xl text-espresso mb-3">Who partners with us?</h2>
              <p className="text-sm text-mist leading-[1.6]">
                Our system is built to support businesses that advise or serve other businesses.
              </p>
            </div>
            
            <ul className="space-y-4">
              {[
                { label: 'Marketing Agencies', sub: 'Adding claim discipline and recovery to their stacks.' },
                { label: 'Consultants & Advisors', sub: 'Recommending governed growth for medical/wellness clients.' },
                { label: 'SaaS Platforms', sub: 'Helping their users recover demand with integrated workflows.' },
                { label: 'Private Equity', sub: 'Standardizing visibility and recovery across portfolio companies.' }
              ].map((item) => (
                <li key={item.label} className="bg-bone p-4 rounded-xl border border-sand-deep/20">
                  <span className="font-display text-lg text-espresso block mb-1">{item.label}</span>
                  <span className="text-sm text-mist">{item.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-16 border-t border-sand-deep/15 text-center">
          <h2 className="font-display text-3xl text-espresso mb-6">Add Scrutexity to your client&apos;s growth stack.</h2>
            <Link 
              href="/partner-os" 
            className="group px-7 py-4 bg-espresso hover:bg-sage-deep text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            Apply for Partner Beta
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="mt-8 flex justify-center text-[10px] font-mono text-mist uppercase tracking-widest gap-2">
            <ShieldCheck size={14} /> Claims-first governance · BAA on request
          </div>
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
      <FreeSnapshotCTA source="partners" />
    </div>
  );
}
