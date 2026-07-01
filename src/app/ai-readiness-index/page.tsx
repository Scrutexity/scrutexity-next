"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Cpu,
  BarChart3,
  ShieldCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export default function AIReadinessIndexPage() {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans selection:bg-clay/20">
      <title>AI Readiness Index (ARI) Audit — Scrutexity</title>
      <meta name="description" content="Evaluate how clearly AI engines understand your clinic's entity, structure your verified claims, and whether LLMs can confidently recommend you in AI search results." />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 bg-cream-deep border-b border-sand-deep/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgba(94,122,90,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:linear-gradient(rgba(92,70,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(92,70,51,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6" style={{ fontFamily: MONO }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage-deep opacity-50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">Enterprise · AI Readiness · Structured Proof Audit</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }} className="font-display text-4xl md:text-6xl lg:text-[4.2rem] text-espresso tracking-[-0.03em] leading-[1.05] max-w-4xl">
            The AI Readiness Index.{' '}
            <span className="italic text-sage-deep">Structured proof for machine-readable trust.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.18 }} className="mt-6 text-base md:text-lg text-mist leading-[1.65] max-w-3xl">
            ChatGPT, Perplexity, and Google AI Overviews ignore or distort clinics whose claims lack structured, machine-readable proof. The AI Readiness Index evaluates how clearly AI engines understand your entity, structure your claims, and whether LLMs can confidently recommend you in zero-click search environments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.28 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact?intent=ari-audit" className="group px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Book an ARI Audit — $2,500
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact?intent=ari-info" className="group px-7 py-4 bg-bone hover:bg-cream border border-sand-deep/45 text-espresso font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2">
              Learn about our methodology
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-5 text-xs text-mist/55" style={{ fontFamily: MONO }}>
            Not legal advice. Not medical advice. Not a guarantee of AI citations or search rankings. Entity optimization assessment only.
          </motion.p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              Three ways AI engines penalize{' '}
              <span className="italic text-sage-deep">unstructured claims.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Omission', desc: 'If an AI cannot verify your assertion of being "the premier injector" via third-party clinical proof, it simply omits you from regional recommendations entirely. No structured data = no mention.' },
              { icon: Cpu, title: 'Distortion', desc: 'AI systems hallucinate or distort service descriptions when websites rely on vague marketing jargon ("lunchtime lift") rather than precise clinical terminology that maps to machine-readable knowledge graphs.' },
              { icon: BarChart3, title: 'Substitution', desc: 'AI models require authoritative co-citations. If your site lacks structured llm.txt data linking claims to proof, AI bypasses you and cites a competitor with structured entity data instead.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }} className="bg-white/80 backdrop-blur-sm border border-sand-deep/30 rounded-2xl p-6 shadow-sm">
                <item.icon size={20} className="text-sage-deep mb-3" />
                <h3 className="font-display text-xl text-espresso mb-2">{item.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ARI MEASURES */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4" style={{ fontFamily: MONO }}>
              <ShieldCheck size={14} className="text-sage-deep" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-sage-deep font-semibold">ARI Score Dimensions</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              What the AI Readiness Index{' '}
              <span className="italic text-sage-deep">measures.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: 'LLM.txt Completeness', desc: 'Does your site expose a structured llm.txt file that AI engines can crawl? We grade completeness, accuracy, and alignment with your actual service offerings.' },
              { icon: Search, title: 'Entity Clarity Score', desc: 'How clearly do AI engines understand your entity? Practice name, locations, procedures, providers — we evaluate whether knowledge graphs resolve your entity correctly.' },
              { icon: ShieldCheck, title: 'Claim-to-Proof Graph Depth', desc: 'Every declarative claim mapped to its supporting evidence. AIs need co-citations to recommend confidently. We measure how deep your proof graph runs.' },
              { icon: Cpu, title: 'Co-Citation Authority', desc: 'What third-party sources (PubMed, clinical trials, board certifications) co-cite with your entity? AI models weight co-citation density heavily in recommendation logic.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }} className="bg-white/80 backdrop-blur-sm border border-sand-deep/30 rounded-2xl p-6 shadow-sm">
                <item.icon size={20} className="text-sage-deep mb-3" />
                <h3 className="font-display text-lg text-espresso mb-2">{item.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLE */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              What you receive from an{' '}
              <span className="italic text-sage-deep">ARI audit.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '15-Page PDF Report', desc: 'Full entity audit with ARI score, dimension breakdown, and prioritized recommendations.' },
              { title: 'Entity Clarity Audit', desc: 'Every entity resolution path analyzed: practice name, locations, providers, procedures. Gaps surfaced with fix guidance.' },
              { title: 'Structured Data Implementation Guide', desc: 'llm.txt schema, JSON-LD entity markup, and knowledge graph optimization playbook specific to your clinic.' },
              { title: 'Competitor AI Visibility Benchmark', desc: 'How your ARI score compares to 3 local competitors. What they do differently that earns them AI citations.' },
              { title: '90-Day Entity Improvement Roadmap', desc: 'Phased implementation plan: quick wins (week 1), structural improvements (month 1-2), and deep entity optimization (month 3).' },
              { title: 'AI Answer Reality Receipt', desc: 'Snapshot of how ChatGPT, Perplexity, and Google AI currently describe your practice before vs. after entity optimization.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }} className="flex items-start gap-4">
                <CheckCircle2 size={18} className="shrink-0 mt-1 text-sage" />
                <div>
                  <h3 className="font-display text-lg text-espresso mb-1">{item.title}</h3>
                  <p className="text-sm text-mist leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-espresso">
              Pricing for{' '}
              <span className="italic text-sage-deep">AI entity readiness.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'ARI Audit', price: '$2,500', cadence: 'one-time', desc: 'Full ARI score, entity audit, competitor benchmark, structured data gap analysis, and 90-day roadmap.', cta: 'Book ARI Audit', href: '/contact?intent=ari-audit' },
              { name: 'ARI + Implementation', price: '$7,500', cadence: 'includes execution', desc: 'ARI audit plus implementation of llm.txt, JSON-LD entity markup, and claim restructuring for AI readiness.', cta: 'Book ARI + Implementation', href: '/contact?intent=ari-plus', highlight: true },
              { name: 'Enterprise AR', price: '$15,000', cadence: 'multi-location', desc: 'Full ARI audit across all locations plus enterprise-wide entity optimization, API integration, and compliance briefings.', cta: 'Contact Enterprise Sales', href: '/contact?intent=ari-enterprise' },
            ].map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className={`rounded-2xl p-8 shadow-sm ${tier.highlight ? 'bg-espresso text-cream border-2 border-sage' : 'bg-white/80 backdrop-blur-sm border border-sand-deep/30'}`}>
                <h3 className={`font-display text-2xl mb-1 ${tier.highlight ? 'text-cream' : 'text-espresso'}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`font-display text-4xl ${tier.highlight ? 'text-cream' : 'text-espresso'}`}>{tier.price}</span>
                  <span className={`text-sm ${tier.highlight ? 'text-cream/60' : 'text-mist'}`}>{tier.cadence}</span>
                </div>
                <p className={`text-sm mb-8 leading-relaxed ${tier.highlight ? 'text-cream/75' : 'text-mist'}`}>{tier.desc}</p>
                <Link href={tier.href} className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${tier.highlight ? 'bg-sage-deep hover:bg-sage text-cream' : 'bg-sage-deep hover:bg-espresso text-cream'}`}>
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:py-28 bg-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-espresso leading-[1.05] tracking-[-0.02em]">
              Frequently asked{' '}<span className="italic text-sage-deep">questions.</span>
            </h2>
          </motion.div>
          {[
            { q: 'How is ARI different from traditional SEO?', a: 'SEO optimizes for search engine rankings on SERP pages. ARI optimizes for AI answer engines that synthesize factual answers from entity data, co-citations, and structured proof. A high ARI score means AI models can confidently recommend you in zero-click search — not just rank a link.' },
            { q: 'Does a high ARI score guarantee AI citations?', a: 'No. ARI measures entity clarity and claim verifiability — preconditions for AI recommendation. It does not guarantee that ChatGPT or Perplexity will cite you. AI models have their own ranking and filtering logic. ARI increases the probability of accurate inclusion by removing the structured data barriers that cause omission and distortion.' },
            { q: 'Who needs an ARI audit?', a: 'Multi-location medical aesthetics groups, PE-backed clinic rollups, enterprise wellness chains, and any practice where AI-generated answers directly influence patient acquisition. Clinics losing visibility to competitors in AI search results should prioritize ARI over traditional SEO.' },
            { q: 'How long does an ARI audit take?', a: 'The audit itself takes 3-5 business days. Implementation of llm.txt and structured data fixes takes 1-2 weeks. Full entity optimization across all dimensions is a 90-day phased process.' },
            { q: 'Is this legal advice or compliance certification?', a: 'No. ARI is an entity optimization and claim-verifiability assessment. It does not provide legal, medical, regulatory, FDA, or FTC advice, and does not certify compliance with any regulatory standard.' },
          ].map((faq, i) => (
            <div key={i} className="border-b border-sand-deep/20 py-5">
              <h3 className="font-display text-lg text-espresso leading-snug mb-2">{faq.q}</h3>
              <p className="text-sm text-mist leading-[1.7] max-w-3xl">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28 bg-cream-deep border-t border-sand-deep/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-espresso mb-6">
              AI engines are making decisions about your clinic right now.{' '}
              <span className="italic text-sage-deep">Make sure they have the truth.</span>
            </h2>
            <p className="text-base text-mist max-w-xl mx-auto mb-8 leading-relaxed">
              The AI Readiness Index gives you a structured, auditable score of how clearly AI models understand your entity and claims. $2,500 includes full audit, competitor benchmark, and 90-day roadmap.
            </p>
            <Link href="/contact?intent=ari-cta" className="inline-flex px-7 py-4 bg-sage-deep hover:bg-espresso text-cream font-semibold rounded-xl transition-all duration-300 text-sm items-center gap-2 shadow-[0_12px_32px_-12px_rgba(94,122,90,0.55)]">
              Book Your ARI Audit
              <ArrowRight size={16} />
            </Link>
            <p className="mt-6 text-xs text-mist/55" style={{ fontFamily: MONO }}>
              Not legal advice. Not medical advice. Not a guarantee of AI citations or search rankings. Entity optimization assessment only.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
