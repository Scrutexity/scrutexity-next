import GovButton from '@/components/GovButton';
import Link from 'next/link';
import { Camera, AlertTriangle, PhoneCall, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post-Care Triage | Scrutexity',
  description: 'Secure post-procedure photo intake that routes urgent concerns to your care team immediately — so your injectors stop being the weekend help desk.',
};

const steps = [
  {
    icon: Camera,
    label: 'Secure upload',
    body: 'Patient uploads photo to a HIPAA-aligned portal — no WhatsApp, no personal cell phones. The image is timestamped, logged, and attached to their record immediately.',
  },
  {
    icon: AlertTriangle,
    label: 'Urgency classification',
    body: 'The system classifies the concern as routine or urgent based on documented post-procedure criteria. Clinical assessment is never generated for the patient — that stays with your licensed staff.',
  },
  {
    icon: PhoneCall,
    label: 'Routed to your team',
    body: 'Routine concerns: patient receives "Photo received and logged. Your care team will follow up within [X hours]." Urgent flags: your on-call injector gets an immediate push with the photo, patient record, and procedure history attached.',
  },
];

const included = [
  'HIPAA-aligned secure photo portal',
  'Automatic timestamping and case logging',
  'Urgency classification (routine vs. escalate)',
  'On-call push notification with full patient context',
  'No AI-generated clinical responses to patients',
  'Every case logged with outcome for your records',
  'BAA-ready before activation',
];

export default function TriagePage() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans">

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-6">Clinical shield for the 2026 med spa</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-[#201d19] sm:text-5xl md:text-[3.8rem]">
            Your injectors are not<br />on-call dermatologists.<br />
            <span className="text-terracotta">But patients treat them like one.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#5f574f]">
            Secure post-procedure photo intake that routes urgent concerns to your care team immediately — complete with the patient's record and procedure history attached. Your injectors stop being the weekend help desk.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <GovButton href="/pilot" label="Add Triage to your pilot →" />
          </div>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">

        {/* Problem */}
        <section className="mx-auto max-w-4xl py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="luxury-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51] mb-4">Saturday night</p>
              <p className="text-[15px] leading-8 text-[#5f574f]">
                A lip filler patient texts a blurry photo: "Is this normal?" Your front desk panics. Your lead injector is at dinner, annoyed, playing detective over a low-res image with no record context. This happens dozens of times a week and eats clinical time that should belong to the treatment room.
              </p>
            </div>
            <div className="luxury-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51] mb-4">The liability gap</p>
              <p className="text-[15px] leading-8 text-[#5f574f]">
                Your PMS doesn't do this. Your EMR is too clunky to surface the right context fast. The patient is left wondering if they should go to the ER. And every undocumented text exchange is a gap in your care record.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl py-8">
          <div className="text-center mb-14">
            <p className="section-kicker mb-3">How it works</p>
            <h2 className="font-display text-3xl text-[#221f1b] tracking-tight md:text-4xl">
              Intake. Classify. Route.
            </h2>
            <p className="mt-3 text-[#6b6259] max-w-xl mx-auto">
              Every step is logged. Clinical judgment stays with your licensed staff — always.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="luxury-panel p-8 relative">
                  <div className="absolute right-6 top-6 font-display text-6xl text-[#d9c9b4]/40">0{i + 1}</div>
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10">
                    <Icon className="h-5 w-5 text-terracotta" />
                  </div>
                  <h3 className="font-display text-xl text-[#221f1b] mb-3">{step.label}</h3>
                  <p className="text-[15px] leading-7 text-[#5f574f]">{step.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compliance callout */}
        <section className="mx-auto max-w-3xl py-16">
          <div className="rounded-[1.75rem] border border-[#7f8f78]/30 bg-[#f3f6f2] p-8 md:p-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#7f8f78] mt-0.5" />
              <div>
                <p className="font-semibold text-[#221f1b] mb-2">Why we don't let AI respond to patients clinically</p>
                <p className="text-[15px] leading-7 text-[#5f574f]">
                  An AI that says "this looks like normal edema, apply ice" to a patient whose photo shows early vascular occlusion is a malpractice liability — and "the model said it was fine" is not a defense any med spa's insurer or medical board will accept. Triage routes and logs. Your licensed staff makes every clinical call. That's the line we don't cross.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-3xl py-8">
          <div className="rounded-[1.75rem] border-2 border-terracotta/30 bg-[#fffaf2] p-8 md:p-10">
            <p className="section-kicker mb-3">Triage add-on</p>
            <h2 className="font-display text-2xl text-[#221f1b] mb-6">Secure intake. Human judgment. Every case logged.</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#5f574f]">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <GovButton href="/pilot" label="Add Triage to your pilot →" />
            </div>
            <p className="mt-4 text-xs text-[#9e8e7e]">Triage is available as an add-on to any Recovery, Growth, or Sovereign plan. Pricing discussed on a fit call.</p>
          </div>
        </section>

      </main>

    </div>
  );
}
