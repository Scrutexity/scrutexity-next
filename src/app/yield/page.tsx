import GovButton from '@/components/GovButton';
import Link from 'next/link';
import { Calendar, Package, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yield Engine | Scrutexity',
  description: 'Fill every dead chair and burn every expiring vial at full margin — without discounting your brand. Algorithmic middleware that sits between your inventory and Boulevard.',
};

const steps = [
  {
    icon: Calendar,
    label: 'Watch',
    body: 'Scrutexity monitors your Boulevard calendar and inventory expiry dates in real-time. When a cancellation hits or a vial batch nears its window, the engine activates.',
  },
  {
    icon: Package,
    label: 'Match',
    body: 'It scans your patient database for the top 10 whose treatment history, provider preference, and last appointment date perfectly fit that open slot and specific product.',
  },
  {
    icon: MessageSquare,
    label: 'Flash Fill',
    body: 'A private, staff-voice SMS goes out: "Hey [Name], we had a sudden opening Thursday at 2PM with [Injector]. Since you\'re due for your tox, reply YES to claim it." Full margin. No public discount.',
  },
];

const included = [
  'Real-time Boulevard calendar monitoring',
  'Inventory expiry tracking by SKU and lot',
  'Patient matching by treatment history and provider',
  'Staff-voice Flash Fill SMS (your clinic\'s voice, not a bot)',
  'Recovery ledger: every filled slot logged with source',
  'Full Recover tier included',
  'BAA-ready before activation',
];

export default function YieldPage() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans">

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f2ea_0%,#efe6d7_35%,#e6d9c6_70%,#f5efe6_100%)]" />
        <div className="absolute inset-0 luxury-noise opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-kicker mb-6">The next layer of revenue defense</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-[#201d19] sm:text-5xl md:text-[3.8rem]">
            Fill every dead chair.<br />Burn every expiring vial.<br />
            <span className="text-terracotta">Without discounting your brand.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#5f574f]">
            Algorithmic middleware that sits between your inventory and Boulevard. When a cancellation hits or stock nears expiry, it finds the right patient and books them at full margin in under 60 seconds.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <GovButton href="/pilot" label="Start your 14-Day Leak Audit →" />
            <Link href="/pricing" className="text-sm font-medium text-[#6b6259] underline-offset-4 hover:text-[#221f1b] hover:underline">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <main className="px-5 pb-24 sm:px-8">

        {/* Problem */}
        <section className="mx-auto max-w-4xl py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="luxury-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51] mb-4">The Tuesday 11am problem</p>
              <p className="text-[15px] leading-8 text-[#5f574f]">
                A 2-hour cancellation for Morpheus8 or a full-face tox is pure lost margin. Meanwhile your Dysport batch expires in 14 days. Your front desk is checking people in — they're not playing matchmaker between an expiring batch, a dead chair, and a patient's birthday.
              </p>
            </div>
            <div className="luxury-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51] mb-4">You can't put this on Instagram</p>
              <p className="text-[15px] leading-8 text-[#5f574f]">
                Public discounting trains patients to wait for a deal and cheapens your brand. But privately filling a dead slot at full price for a patient who's already due? That's pure margin — and the patient feels like they got a gift, not a clearance sale.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl py-8">
          <div className="text-center mb-14">
            <p className="section-kicker mb-3">How it works</p>
            <h2 className="font-display text-3xl text-[#221f1b] tracking-tight md:text-4xl">
              Watch. Match. Fill.
            </h2>
            <p className="mt-3 text-[#6b6259] max-w-xl mx-auto">Three steps, fully automated, logged with source and outcome every time.</p>
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

        {/* Flash Fill example */}
        <section className="mx-auto max-w-3xl py-16">
          <div className="rounded-[1.75rem] border border-[#d8c4ad] bg-[#fffaf2] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51] mb-4">What the patient sees</p>
            <div className="rounded-2xl bg-[#f3eadf] p-6 font-sans text-sm leading-7 text-[#3d3731]">
              <p className="text-[#9b6a51] text-xs font-bold uppercase tracking-wider mb-3">SMS · From: Clinic Name</p>
              <p>"Hey Sarah — Dr. Chen had a sudden opening this Thursday at 2PM. Since you're due for your tox, we can fit you in at your usual rate. Reply YES to claim it."</p>
            </div>
            <p className="mt-5 text-xs text-[#9e8e7e] leading-6">
              Sent in your clinic's voice, from your number. The patient sees a thoughtful personal message, not a clearance notice. The slot fills at full margin. The vial that was going to expire doesn't.
            </p>
            <p className="mt-2 text-xs text-[#9e8e7e]">Illustrative — messaging uses your clinic's approved voice during setup.</p>
          </div>
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-3xl py-8">
          <div className="rounded-[1.75rem] border-2 border-terracotta/30 bg-[#fffaf2] p-8 md:p-10">
            <p className="section-kicker mb-3">Yield module — Sovereign tier ($3,900/mo)</p>
            <h2 className="font-display text-2xl text-[#221f1b] mb-6">Everything in Recover, plus the Flash Fill engine.</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#5f574f]">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GovButton href="/pilot" label="Start your 14-Day Leak Audit →" />
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-[#d8c4ad] px-7 py-3 text-sm font-semibold text-[#5f574f] transition hover:bg-[#f3eadf]">
                Compare all plans <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-[#9e8e7e]">Same 14-day pilot. $0 if yield isn't demonstrated. Cancel anytime and keep the recovery ledger.</p>
          </div>
        </section>

      </main>

    </div>
  );
}
