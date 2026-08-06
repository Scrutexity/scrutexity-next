"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Lock, Activity, Stethoscope, PawPrint, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { RevenueLeakSection } from '@/components/scrutexity/RevenueLeakSection';
import { HowItWorksSection } from '@/components/scrutexity/how-it-works-section';
import dynamic from 'next/dynamic';

const RoiCalculator = dynamic(() => import('@/components/scrutexity/roi-calculator'), { ssr: false });
import EvidenceChain from '@/components/scrutexity/evidence-chain';
import Security from '@/components/sections/security';
import FreeSnapshotCTA from '@/components/ui/FreeSnapshotCTA';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const segments = [
  {
    icon: Stethoscope,
    name: 'Med Spas',
    pain: 'Missed consults, slow replies, no-show follow-up, before/after content risk, treatment claims.',
    promise: 'Recover missed consult demand and keep treatment content claim-safe.',
  },
  {
    icon: Activity,
    name: 'Urgent Care',
    pain: 'Missed calls, service-availability confusion, patient communication gaps, insurance and payment questions.',
    promise: 'Capture urgent patient intent and keep service messaging accurate and review-ready.',
  },
  {
    icon: PawPrint,
    name: 'Veterinary Practices',
    pain: 'Missed appointment requests, follow-up gaps, wellness-plan reminders, emergency-service claims.',
    promise: 'Turn pet-owner inquiries into booked visits while keeping care-related messaging responsible.',
  },
  {
    icon: Sparkles,
    name: 'Wellness & Spa',
    pain: 'Lead follow-up gaps, membership reactivation, exaggerated outcome claims, inconsistent content.',
    promise: 'Recover lost demand and create content that does not overpromise results.',
  },
];

const auditIncludes = [
  'Focused review of one public page',
  'Claim-by-claim evidence map with visible support notes',
  'Safer framing drafts for every flagged phrase',
  'Prioritized next step for your team',
];

export default function MedicalWellnessContent() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Scrutexity Medical & Wellness",
    "description": "Demand recovery and governed marketing for med spas, urgent care clinics, veterinary practices, and wellness centers.",
    "provider": { "@type": "Organization", "name": "Scrutexity" },
    "areaServed": "United States or Online",
    "url": "https://www.scrutexity.com/medical-wellness"
  };

  const faqs = [
    {
      q: "Who is Scrutexity Medical & Wellness for?",
      a: "It is for operators where messaging and follow-up matter: med spas, urgent care clinics, veterinary practices, and wellness centers."
    },
    {
      q: "How does Scrutexity help med spas?",
      a: "We recover missed consults and keep treatment content claim-safe without relying on risky guarantees."
    },
    {
      q: "How does Scrutexity help urgent care clinics?",
      a: "We capture urgent patient intent and keep service messaging accurate, answer-ready, and review-ready."
    },
    {
      q: "How does Scrutexity help veterinary practices?",
      a: "We turn pet-owner inquiries into booked visits while keeping care-related messaging responsible and clear."
    },
    {
      q: "Does Scrutexity provide medical advice?",
      a: "No. We provide structural marketing, content governance, and demand recovery. We do not provide clinical, medical, or regulatory advice."
    },
    {
      q: "What does staff-approved follow-up mean?",
      a: "It means all outbound recovery messages and workflows are pre-approved by your staff. We do not use AI to make autonomous clinical decisions or unapproved treatment recommendations."
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
    <div className="min-h-screen bg-cream text-ink font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-pine"
            style={{ fontFamily: MONO_STACK }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pine" />
            Door 2 · Medical &amp; Wellness Operators
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-5xl md:text-6xl lg:text-[5rem] text-ink tracking-[-0.03em] leading-[1.02] max-w-4xl"
          >
            Recover missed bookings{' '}
            <span className="italic text-sage-deep">without risky medical marketing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-7 text-base md:text-lg text-mist leading-[1.55] font-sans max-w-2xl"
          >
            Scrutexity helps med spas, urgent care clinics, veterinary practices, wellness centers, and spas identify missed demand, improve follow-up, publish safer content, and strengthen local visibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-7"
          >
            <Link
              href="#audit"
              className="group px-7 py-4 bg-sage-deep hover:bg-ink text-cream font-sans font-semibold rounded-xl transition-all duration-300 text-sm inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 24px rgba(28,24,20,0.10)' }}
            >
              Request a Recovery Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="group text-sm font-sans font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              See pricing
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-sand-deep/20 max-w-3xl text-left"
          >
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-mist/70 leading-[1.6] mb-3"
              style={{ fontFamily: MONO_STACK }}
            >
              READ-ONLY FIRST · STAFF-APPROVED · CLAIMS-FIRST GOVERNANCE · NO AUTONOMOUS CLINICAL DECISIONS
            </p>
            <p className="text-xs text-mist/80 leading-relaxed font-sans">
              Scrutexity Medical &amp; Wellness is designed as an implementation model for reviewing public claims, improving AI visibility, and activating approved follow-up workflows. Any PMS access, PHI handling, BAA, or ledger-based logging depends on the client scope, vendor permissions, and executed agreements. No clinical, legal, or compliance certification is provided.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEGMENTS — 4 verticals */}
      <section className="px-6 py-24 md:py-28 border-t border-sand-deep/15">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl mb-14"
          >
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
              style={{ fontFamily: MONO_STACK }}
            >
              Who this is for
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05]">
              High-intent local demand,{' '}
              <span className="italic text-sage-deep">regulated claims, reputation risk.</span>
            </h2>
            <p className="mt-5 text-base text-mist leading-[1.6] max-w-xl">
              The common thread isn&rsquo;t the treatment menu. It&rsquo;s
              that patients reach out, the calendar misses them, and the public
              marketing can carry claims a careful buyer cannot verify.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {segments.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  className="rounded-2xl bg-bone border border-sand-deep/30 p-6 md:p-7"
                  style={{
                    boxShadow:
                      '0 12px 32px -14px rgba(28,24,20,0.07), inset 0 1px 1px rgba(255,255,255,0.6)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/12">
                      <Icon size={16} className="text-sage-deep" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-2xl text-ink tracking-[-0.01em]">
                      {s.name}
                    </h3>
                  </div>
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] text-mist/65 mb-2"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Pain
                  </p>
                  <p className="text-sm text-mist leading-[1.6]">{s.pain}</p>
                  <p
                    className="mt-4 text-[10px] uppercase tracking-[0.16em] text-sage-deep mb-2"
                    style={{ fontFamily: MONO_STACK }}
                  >
                    Promise
                  </p>
                  <p className="text-sm text-ink/85 leading-[1.6]">{s.promise}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERTICAL-SPECIFIC SERVICES */}
      <section className="px-6 py-20 md:py-24 border-t border-sand-deep/15">
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5"
            style={{ fontFamily: MONO_STACK }}
          >
            Services &amp; Infrastructure
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink tracking-[-0.02em] leading-[1.05] mb-8">
            Verifiable wellness operations,{' '}
            <span className="italic text-sage-deep">governed end-to-end.</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Missed demand recovery',
              'Staff-approved follow-up',
              'Claim-safe patient-facing content',
              'Google Business Profile support',
              'Review request systems',
              'Local service pages',
              'AI visibility readiness',
              'Recovery briefs'
            ].map((srv) => (
              <li key={srv} className="flex items-center gap-3">
                <Lock size={13} strokeWidth={1.8} className="text-sage-deep shrink-0" />
                <span className="text-[15px] font-mono text-ink/85">{srv}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRESERVED EXISTING COMPONENTS — the original med spa recovery stack */}
      <RevenueLeakSection />
      <HowItWorksSection />
      <RoiCalculator />
      <EvidenceChain />
      <Security />

      {/* OFFER — $199 audit */}
      <section id="audit" className="px-6 py-28 md:py-32 border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl bg-bone border border-sand-deep/30 p-8 md:p-10 relative overflow-hidden"
            style={{
              boxShadow:
                '0 18px 44px -16px rgba(28,24,20,0.10), inset 0 1px 1px rgba(255,255,255,0.6)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#D4AF37' }} />

            <span
              className="text-[11px] uppercase tracking-[0.18em] text-sage-deep block mb-5 inline-flex items-center gap-2"
              style={{ fontFamily: MONO_STACK }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-deep" />
              Medical &amp; Wellness Claim Review
            </span>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display text-3xl md:text-4xl text-ink tracking-[-0.02em] leading-[1.05]">
                  Claim Support Review.{' '}
                  <span className="italic text-sage-deep">Focused · 48-hour target.</span>
                </h3>
                <p className="mt-4 text-base text-mist leading-[1.6]">
                  Read-only review of one public page. Returns the claim wording, visible
                  support, remaining gap, and safer framing drafts you can hand to your team.
                </p>
              </div>
              <div className="md:text-right shrink-0">
                <div className="font-display text-5xl text-ink tabular-nums leading-none">$99</div>
                <div className="text-xs text-mist mt-1" style={{ fontFamily: MONO_STACK }}>
                  one public page
                </div>
              </div>
            </div>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {auditIncludes.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/85 leading-[1.55]">
                  <span className="mt-2 w-1 h-1 rounded-full bg-sage-deep shrink-0" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-7">
              <Link
                href="/contact?intent=claim-support-review&source=medical-wellness"
                className="group inline-flex items-center gap-2 rounded-xl bg-sage-deep hover:bg-ink text-cream px-7 py-3.5 text-sm font-semibold transition-all duration-300 shadow-xs cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(94,122,90,0.15)' }}
              >
                Start a Claim Review
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="group text-sm font-semibold text-ink hover:text-sage-deep transition-colors duration-300 inline-flex items-center gap-1.5"
              >
                View Pricing
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 md:py-32 bg-cream-deep border-t border-sand-deep/15" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-3xl mx-auto">
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
      </section>

      <FreeSnapshotCTA source="medical-wellness" />
    </div>
  );
}
