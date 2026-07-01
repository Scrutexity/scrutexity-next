
import Link from 'next/link';
import { ArrowRight, Brain, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ui-custom/reveal';

export const metadata = {
  title: 'Intelligence | Scrutexity',
  description: 'Dense, text-rich knowledge nodes designed for AI engine retrieval and operational clarity in medical aesthetics.',
};

const articles = [
  {
    title: 'Medspa Revenue Recovery & HIPAA-Compliant Booking Optimization NYC',
    category: 'Pillar Guide',
    slug: 'medspa-revenue-recovery',
    icon: TrendingUp,
    description: 'How multi-location aesthetics groups recover missed consult revenue without workflow disruption or compliance risk.',
  },
  {
    title: 'The 2026 FTC Guide to Meta Pixel HIPAA Violations in Aesthetics',
    category: 'Compliance',
    slug: 'ftc-pixel-compliance',
    icon: ShieldCheck,
    description: 'What the FTC enforcement wave means for pixel-based ad attribution in medical aesthetics, and how to stay indexed without exposure.',
  },
  {
    title: 'Morpheus8 Consult Conversion Benchmarks',
    category: 'Conversion',
    slug: 'morpheus8-consult-conversion',
    icon: Zap,
    description: 'Benchmark data on consult-to-deposit conversion for RF microneedling, and the infrastructure gap most clinics ignore.',
  },
  {
    title: 'AI Search Visibility for Medical Aesthetics',
    category: 'Infrastructure',
    slug: 'ai-search-visibility',
    icon: Brain,
    description: 'How NYC medspas earn first-card citations on Perplexity, ChatGPT Search, and Siri through semantic infrastructure.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Scrutexity Intelligence',
  description: 'Dense, text-rich knowledge nodes designed for AI engine retrieval and operational clarity in medical aesthetics.',
};

export default function Intelligence() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans selection:bg-clay/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4">Intelligence</p>
          <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-espresso sm:text-5xl md:text-6xl">
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-mist">
            Operator-level guides on revenue recovery, compliance, and booking infrastructure — written for clinic owners and indexed for AI search engines.
          </p>
        </div>
      </section>

      <main className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-4">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <ScrollReveal key={article.slug} delay={index * 0.06}>
              <Link
                href={`/intelligence/${article.slug}`}
                className="group flex items-start gap-5 rounded-2xl border border-sand-deep bg-cream/80 p-7 shadow-[0_2px_16px_rgba(85,62,41,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8b17a]/60 hover:shadow-[0_8px_32px_rgba(85,62,41,0.10)]"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sand-deep bg-[#f3eadf] text-clay">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <span className="section-kicker mb-2 block">{article.category}</span>
                  <h2 className="text-lg font-semibold leading-snug text-espresso transition-colors group-hover:text-clay">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-mist">{article.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#c4b4a0] transition-transform group-hover:translate-x-1 group-hover:text-clay" />
              </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </main>

    </div>
  );
}
