'use client';

import { ShieldCheck, Lock, Server, Key, Download, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Deterministic PHI Stripping',
    body: 'Before any patient message touches our intent engine, it passes through a deterministic filter. Names, birthdates, and medical histories are stripped and replaced with anonymous tokens. We only process scheduling intent — never patient identity.',
  },
  {
    icon: Lock,
    title: 'Zero-Retention Compute',
    body: 'We do not use your patient data to train AI models. Inbound payloads are held in temporary memory for exactly the duration of the conversation, then permanently flushed. The only retained data is the confirmed appointment pushed to Boulevard.',
  },
  {
    icon: Server,
    title: 'Documented Security Controls',
    body: 'Our security brief documents current data boundaries, access controls, encryption practices, and diligence materials. We do not claim a completed SOC 2 or HITRUST certification.',
  },
  {
    icon: Key,
    title: 'The 1-Click Access Revocation',
    body: 'You hold the master keys. Our Boulevard API connection operates via strict OAuth scopes. If you ever need to halt the system, you can revoke our access token directly from your Boulevard dashboard with a single click. No support ticket required. No data left behind.',
  },
];

const auditStats = [
  { value: 'Before Go-Live', label: 'BAA Execution' },
  { value: 'Minimized', label: 'PHI Processing' },
  { value: 'Human', label: 'Clinical Escalation' },
  { value: 'Client-Held', label: 'Access Revocation' },
];

export default function TrustCenterContent() {
  return (
    <div className="min-h-screen bg-cream text-espresso font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e8dfcf_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-4 text-[#7f8f78]">Clinical Security Architecture</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-espresso sm:text-5xl md:text-[3.8rem]">
            Absolute compliance.<br />
            <span className="text-clay">Absolute control.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-mist">
            Scrutexity is engineered for high-liability medical environments. We provide enterprise-grade data isolation, explicit HIPAA compliance, and a strict Business Associate Agreement (BAA) for every clinic before activation.
          </p>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">
        {/* BAA Download Banner */}
        <section className="mx-auto max-w-4xl mb-20">
          <Reveal>
            <div className="rounded-[1.75rem] border border-[#3d3731]/30 bg-[#1e1b17] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-5 w-5 text-[#7f8f78]" />
                  <h2 className="font-display text-xl text-[#e1d4c5]">BAA-Ready Administrative Infrastructure</h2>
                </div>
                <p className="text-[#9e8e7e] text-sm max-w-lg leading-relaxed">
                  We execute a Business Associate Agreement before any patient-adjacent workflow is activated. Have your counsel review the terms and data flow before credentials are exchanged.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto text-center">
                <a
                  href="/baa"
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#f3eadf] text-espresso font-semibold py-3 px-6 text-sm transition-colors"
                >
                  <Download className="h-4 w-4 text-clay" />
                  Download Sample BAA
                </a>
                <p className="text-mist text-xs mt-3">PDF · Available for immediate download</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Forwardable Trust Packet */}
        <section className="mx-auto max-w-4xl mb-20">
          <Reveal>
            <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-5 w-5 text-clay" />
                  <h2 className="font-display text-xl text-espresso">Security & Compliance Brief</h2>
                </div>
                <p className="text-mist text-sm max-w-lg leading-relaxed">
                  A web-native, print-optimized overview of current data boundaries, security controls, and diligence materials. Designed to be forwarded to counsel or a compliance reviewer without a call.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto text-center">
                <a
                  href="/security-brief"
                  className="inline-flex items-center gap-2 rounded-full border border-sand-deep bg-[#f3eadf] hover:bg-[#e8d9c6] text-espresso font-semibold py-3 px-6 text-sm transition-colors"
                >
                  <Download className="h-4 w-4 text-clay" />
                  Read Brief
                </a>
                <p className="text-[#9e8e7e] text-xs mt-3">Print-optimized · Dated June 2026 · Forwardable</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Security Pillars */}
        <section className="mx-auto max-w-6xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={idx}>
                  <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 shadow-sm h-full hover:border-[#d9c9b4] transition-colors">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/8">
                      <Icon className="h-6 w-6 text-clay" />
                    </div>
                    <h3 className="font-display text-lg text-espresso mb-2">{pillar.title}</h3>
                    <p className="text-[14px] leading-7 text-mist">{pillar.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Continuous Auditing */}
        <section className="mx-auto max-w-4xl text-center border-t border-sand-deep pt-16">
          <Reveal>
            <h2 className="font-display text-2xl text-espresso mb-8">Continuous Infrastructure Auditing</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {auditStats.map((stat, i) => (
              <Reveal key={i}>
                <div className="rounded-[1.25rem] border border-sand-deep bg-cream p-6">
                  <p className="font-display text-2xl text-espresso mb-1">{stat.value}</p>
                  <p className="text-[11px] text-mist uppercase tracking-[0.12em] font-semibold">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-2xl mt-20 text-center">
          <Reveal>
            <div className="rounded-[1.75rem] border-2 border-clay/20 bg-cream p-8 md:p-10">
              <h2 className="font-display text-2xl text-espresso mb-3">
                Ready to see the security architecture in action?
              </h2>
              <p className="text-[14px] text-mist mb-6">
                14-day pilot. Read-only Boulevard access. BAA signed before activation. $0 if recovery isn&rsquo;t demonstrated.
              </p>
              <Link
                href="/pilot"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(185,130,95,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a36b5d]"
              >
                Get Your Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
