'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Printer } from 'lucide-react';
import Link from 'next/link';

function generateReportId(): string {
  const rnd = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RLS-${rnd}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface ReportData {
  id: string;
  date: string;
  name: string;
  clinic: string;
  pms: string;
}

export default function SnapshotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      clinic: form.get('clinic') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      pms: form.get('pms') as string,
    };

    const reportId = generateReportId();
    setReport({
      id: reportId,
      date: formatDate(),
      name: data.name,
      clinic: data.clinic,
      pms: data.pms || 'Not specified',
    });

    try {
      await fetch('/api/snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, reportId }),
      });
    } catch {
      // non-blocking — show success regardless
    }
    setSubmitted(true);
    setLoading(false);
  }

  function handlePrint() {
    window.print();
  }

  if (submitted && report) {
    return (
      <>
        {/* Hidden printable report */}
        <div className="hidden print:block print:m-0 print:p-0">
          <div className="max-w-3xl mx-auto p-10 font-sans text-[#221F1B]">
            <div className="border-b-2 border-[#221F1B] pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-serif text-2xl mb-1">Revenue Leak Snapshot Report</p>
                  <p className="text-sm text-[#221F1B]/60">based on live booking activity over the last 14 days</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#221F1B]/40 font-mono">ID: {report.id}</p>
                  <p className="text-xs text-[#221F1B]/40">{report.date}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-[#221F1B]/40 mb-1">Prepared for</p>
              <p className="text-lg font-semibold">{report.clinic}</p>
              <p className="text-sm text-[#221F1B]/60">Requested by: {report.name}</p>
              <p className="text-sm text-[#221F1B]/60">PMS: {report.pms}</p>
            </div>

            <div className="border border-[#221F1B]/10 p-6 mb-6">
              <p className="text-xs uppercase tracking-widest text-[#221F1B]/50 mb-3">What you&apos;ll receive</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  'Demand Capture Health Score',
                  'Estimated monthly revenue leakage',
                  'Missed consult analysis',
                  'Response time vs. industry benchmark',
                  'Location comparison (multi-location only)',
                  'Top 3 recovery opportunities',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#B9825F] rotate-45 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#221F1B]/10 pt-6">
              <p className="text-xs text-[#221F1B]/50 leading-relaxed mb-3">
                Based on live booking activity drawn from your PMS over the last 14 days. Estimates are directional and require manual verification. This is an operational snapshot — not an audit, certification, or guarantee of results.
              </p>
              <p className="text-xs text-[#221F1B]/40 leading-relaxed">
                Delivery within 24 hours of request. Not legal, medical, or financial advice. Actual results vary by clinic size, volume, and EMR configuration.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[#221F1B]/10 text-center">
              <p className="text-[10px] text-[#221F1B]/30 font-mono">
                Scrutexity &middot; Revenue Leak Snapshot &middot; {report.id} &middot; {report.date}
              </p>
            </div>
          </div>
        </div>

        {/* Thank-you page */}
        <div className="min-h-screen bg-[#fbf7ef] text-[#221f1b] font-sans antialiased flex items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <CheckCircle className="mx-auto h-14 w-14 text-[#B9825F]" />
            <h1 className="mt-6 font-serif text-4xl tracking-tight">Your snapshot is being prepared</h1>
            <p className="mt-4 text-lg text-[#221F1B]/70 leading-relaxed">
              I review every submission personally within 24 hours. You&rsquo;ll receive your Demand Capture
              Health Score, revenue leakage estimate, and recovery opportunities by tomorrow.
            </p>

            {/* Report reference */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-[#221F1B]/10 bg-white text-xs font-mono text-[#221F1B]/50">
              <span>Report ID:</span>
              <span className="text-[#221F1B] font-semibold">{report.id}</span>
              <span className="text-[#221F1B]/30">|</span>
              <span>{report.date}</span>
            </div>

            <p className="mt-3 text-sm text-[#221F1B]/50">
              If you don&rsquo;t hear from me, reply to the confirmation email and I&rsquo;ll bump you
              to the front of the line.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#e1d4c5] bg-white/60 text-[#221F1B] text-sm uppercase tracking-widest font-semibold hover:border-[#B9825F]/50 hover:bg-white/90 transition-all backdrop-blur-sm"
              >
                <Printer className="w-4 h-4" />
                Save Snapshot (PDF)
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#221F1B]/20 text-[#221F1B] text-sm uppercase tracking-widest font-semibold hover:bg-[#221F1B]/5 transition-all"
              >
                Return home
              </Link>
            </div>

            <div className="mt-6 text-xs text-[#221F1B]/40">
              You can save this to share with your team.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#221f1b] font-sans antialiased">
      <section className="py-20 px-6 lg:px-16 max-w-3xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-[#B9825F] mb-2">Free Assessment</p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Get Your Revenue Leak Snapshot
          </h1>
          <p className="text-lg text-[#221F1B]/70 max-w-xl mx-auto">
            Tell us which clinic and PMS you run. We&rsquo;ll deliver a Demand Capture Health Score,
            estimated monthly leakage, and your top 3 recovery opportunities within 24 hours.
          </p>
        </div>

        {/* The scorecard preview */}
        <div className="border border-[#221F1B]/10 bg-white p-6 mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#221F1B]/50 mb-3">You&rsquo;ll receive</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Demand Capture Health Score',
              'Revenue Leakage Estimate',
              'Location-by-Location Breakdown',
              'Response Time Benchmarking',
              'Top 3 Recovery Opportunities',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#221F1B]/80">
                <span className="w-1.5 h-1.5 bg-[#B9825F] rotate-45 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest font-semibold text-[#221F1B]/60 mb-1.5">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Dr. Jane Smith"
                className="w-full px-4 py-3 border border-[#221F1B]/15 bg-white text-sm text-[#221F1B] placeholder:text-[#221F1B]/30 focus:outline-none focus:border-[#B9825F] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="clinic" className="block text-xs uppercase tracking-widest font-semibold text-[#221F1B]/60 mb-1.5">
                Clinic name
              </label>
              <input
                id="clinic"
                name="clinic"
                type="text"
                required
                placeholder="Upper East Side Aesthetics"
                className="w-full px-4 py-3 border border-[#221F1B]/15 bg-white text-sm text-[#221F1B] placeholder:text-[#221F1B]/30 focus:outline-none focus:border-[#B9825F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-[#221F1B]/60 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@yourclinic.com"
              className="w-full px-4 py-3 border border-[#221F1B]/15 bg-white text-sm text-[#221F1B] placeholder:text-[#221F1B]/30 focus:outline-none focus:border-[#B9825F] transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-semibold text-[#221F1B]/60 mb-1.5">
                Phone <span className="text-[#221F1B]/30">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 212 555 0100"
                className="w-full px-4 py-3 border border-[#221F1B]/15 bg-white text-sm text-[#221F1B] placeholder:text-[#221F1B]/30 focus:outline-none focus:border-[#B9825F] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="pms" className="block text-xs uppercase tracking-widest font-semibold text-[#221F1B]/60 mb-1.5">
                Current PMS / EMR
              </label>
              <select
                id="pms"
                name="pms"
                defaultValue=""
                className="w-full px-4 py-3 border border-[#221F1B]/15 bg-white text-sm text-[#221F1B] focus:outline-none focus:border-[#B9825F] transition-colors"
              >
                <option value="" disabled>Select your PMS</option>
                <option value="boulevard">Boulevard</option>
                <option value="mangomint">Mangomint</option>
                <option value="zenoti">Zenoti</option>
                <option value="other">Other / Multiple</option>
                <option value="not-sure">Not sure</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#B9825F] text-[#FBF7EF] text-sm uppercase tracking-widest font-semibold hover:bg-[#221F1B] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Get My Revenue Leak Snapshot'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#221F1B]/50">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B9825F]" />
            No obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B9825F]" />
            Results in 24 hours
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B9825F]" />
            Live booking data analysis
          </span>
        </div>
      </section>
    </div>
  );
}
