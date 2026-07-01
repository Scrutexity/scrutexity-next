import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sample Revenue Leak Snapshot | Scrutexity',
  description: 'See a sample Demand Capture Health Scorecard, leak map, and recovery opportunities for a 3-location aesthetics group.',
};

const funnelSteps = [
  { label: 'INQUIRIES', count: '1,000', pct: 100 },
  { label: 'CONTACTED', count: '840', pct: 84 },
  { label: 'CONSULTS SCHEDULED', count: '650', pct: 65 },
  { label: 'DEPOSITS COLLECTED', count: '490', pct: 49 },
  { label: 'TREATED', count: '410', pct: 41 },
];

const findings = [
  { title: 'Lead response delay is the primary leakage driver', body: 'Average response time of 3.8 hours means 41% of inbound consult requests are never answered — the single largest source of lost revenue in the portfolio.' },
  { title: '41% of missed consults occur in the first 60 minutes', body: 'The fastest-recovering clinics respond within 22 minutes. Every additional hour of delay compounds the drop-off rate across all three locations.' },
  { title: 'Flatiron underperforms West Village by 32% conversion', body: 'Even with comparable inquiry volume, the Flatiron location books 32% fewer consults. The gap is not demand — it is operational response cadence.' },
  { title: 'No unified cross-location benchmarking exists', body: 'Each location runs its own PMS and its own follow-up cadence. There is no single source of truth comparing performance across the portfolio.' },
];

const opportunities = [
  { action: 'Reduce response time to under 20 minutes', impact: 'Recovers an estimated 8–12 consults per month across the portfolio.' },
  { action: 'Standardize follow-up cadence across locations', impact: 'Eliminates the Flatiron conversion gap and brings it within 5% of West Village.' },
  { action: 'Install read-only cross-PMS monitoring', impact: 'One dashboard comparing response time, conversion, and leakage by location — regardless of EMR.' },
];

export default function SampleSnapshotPage() {
  return (
    <div className="min-h-screen bg-cream text-[#221F1B] font-sans antialiased">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-[#B9825F] mb-2">Example report</p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Revenue Leak Snapshot
          </h1>
          <p className="text-sm text-[#221F1B]/50 max-w-lg mx-auto">
            Based on a 3-location aesthetics group running Boulevard + Mangomint.
            Your report will reflect your clinic&apos;s actual data.
          </p>
        </div>

        {/* ── Scorecard ── */}
        <div className="border border-[#221F1B]/10 bg-white shadow-[0_20px_60px_-20px_rgba(34,31,27,0.2)] mb-10">
          <div className="border-b border-[#221F1B]/10 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#B9825F] rotate-45" />
              <span className="font-mono text-xs tracking-widest text-[#221F1B]/50 uppercase font-semibold">Demand Capture Health Scorecard</span>
            </div>
            <span className="font-serif text-lg text-[#221F1B]/30">Scrutexity</span>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 border-r border-b md:border-b-0 border-[#221F1B]/10">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50 mb-2">Portfolio Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-6xl tracking-tight text-[#221F1B]">71</span>
                  <span className="font-serif text-2xl text-[#221F1B]/40">/ 100</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-[#221F1B]/10 rounded-full overflow-hidden">
                  <div className="h-full w-[71%] bg-[#B9825F] rounded-full" />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50 mb-2">Estimated Monthly Revenue Leakage</p>
                <p className="font-serif text-4xl text-[#221F1B]">$22K–$40K</p>
                <p className="text-xs text-[#221F1B]/40 mt-1 font-mono">Based on consult volume and response-time benchmark</p>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-6">
              <div className="flex justify-between items-baseline border-b border-[#221F1B]/5 pb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50">Average Response Time</span>
                <div className="text-right">
                  <span className="font-mono text-lg font-semibold text-[#221F1B]">3.8 hrs</span>
                  <span className="block text-[10px] text-[#B9825F] font-mono">Benchmark: 22 min</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#221F1B]/5 pb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50">Missed Consult Opportunities</span>
                <span className="font-mono text-lg font-semibold text-[#221F1B]">15–20 / mo</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#221F1B]/5 pb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50">Highest-Leak Location</span>
                <span className="font-mono text-lg text-[#221F1B]">Flatiron</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50">Fastest Recovery Opportunity</span>
                <span className="font-mono text-sm text-[#B9825F] font-semibold">Lead response workflow</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Leak Map ── */}
        <div className="border border-[#221F1B]/10 bg-white mb-10">
          <div className="border-b border-[#221F1B]/10 px-8 py-4">
            <p className="font-mono text-xs tracking-widest text-[#221F1B]/50 uppercase font-semibold">PATIENT FLOW · 30-Day Window</p>
          </div>
          <div className="p-8 md:p-10 space-y-6">
            {funnelSteps.map((step) => (
              <div key={step.label} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] tracking-widest text-[#221F1B]/50">{step.label}</span>
                  <span className="font-mono text-sm font-bold text-[#221F1B]">{step.count}</span>
                </div>
                <div className="h-2.5 w-full bg-cream border border-[#221F1B]/5">
                  <div className="h-full bg-[#221F1B]" style={{ width: `${step.pct}%` }} />
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t-2 border-[#B9825F]/40">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#B9825F] mb-1 uppercase">PATIENTS LOST</p>
                  <p className="font-serif text-5xl text-[#221F1B]">190</p>
                  <p className="text-xs text-[#221F1B]/50 mt-1">Disappeared between inquiry and treatment</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#B9825F] mb-1 uppercase">ESTIMATED LEAKAGE</p>
                  <p className="font-serif text-5xl text-[#221F1B]">$41K</p>
                  <p className="text-xs text-[#221F1B]/50 mt-1">Average consult value applied to lost patients</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#221F1B]/10 px-8 py-3 bg-cream/50">
            <p className="font-mono text-[10px] text-[#221F1B]/40 tracking-wider uppercase">
              Your report will reflect actual pipeline data from your PMS.
            </p>
          </div>
        </div>

        {/* ── Key Findings ── */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl mb-6">Key Findings</h2>
          <div className="space-y-4">
            {findings.map((f) => (
              <div key={f.title} className="border border-[#221F1B]/10 bg-white p-6">
                <p className="font-mono text-[10px] tracking-widest text-[#B9825F] uppercase mb-2">FINDING</p>
                <h3 className="font-semibold text-sm text-[#221F1B] mb-2">{f.title}</h3>
                <p className="text-sm text-[#221F1B]/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recovery Opportunities ── */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl mb-6">Recovery Opportunities</h2>
          <p className="text-sm text-[#221F1B]/50 mb-6">
            These actions are activated during your 14-day pilot. No additional cost. No obligation.
          </p>
          <div className="space-y-4">
            {opportunities.map((o) => (
              <div key={o.action} className="border border-[#221F1B]/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center border border-[#B9825F]/30 bg-[#B9825F]/5 shrink-0">
                    <ArrowRight className="w-4 h-4 text-[#B9825F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#221F1B] mb-1">{o.action}</h3>
                    <p className="text-sm text-[#221F1B]/60 leading-relaxed">{o.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="text-center pt-4">
          <Link
            href="/snapshot"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B9825F] text-[#FBF7EF] text-sm uppercase tracking-widest font-semibold hover:bg-[#221F1B] transition-all duration-300"
          >
            Get My Revenue Leak Snapshot
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-xs text-[#221F1B]/50">
            Delivered by email within 24 hours. No setup required.
          </p>
        </div>
      </main>
    </div>
  );
}
