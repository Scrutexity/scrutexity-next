'use client';

import { useState, useMemo } from 'react';
import { Reveal } from './Reveal';
import { AnimatedCurrency } from './AnimatedCurrency';
import { Input } from './Input';
import { Field } from './Field';
import GovButton from './GovButton';

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-[#3d3731]">
        <span>{label}</span>
        <span className="rounded-full bg-[#efe4d4] px-3 py-1 text-[#7f5a43]">{display}</span>
      </span>
      <input
        type="range"
        className="luxury-slider"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function LeadCalculator({ onBookCall }: { onBookCall: () => void }) {
  const [traffic, setTraffic] = useState(1000);
  const [conv, setConv] = useState(3.2);
  const [ticket, setTicket] = useState(1500);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showPreview, setShowPreview] = useState(false);

  const monthlyLeak = useMemo(() => {
    const gap = Math.max(5.8 - conv, 0) / 100;
    return Math.round(traffic * gap * ticket);
  }, [traffic, conv, ticket]);

  const pilotTarget = Math.round(monthlyLeak * 0.48);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    console.log('[LeadCalculator]', { email, monthlyLeak, pilotTarget, timestamp: new Date().toISOString() });

    try {
      const res = await fetch('/api/leak-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, traffic, conv, ticket, monthlyLeak, pilotTarget }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
      }
    } catch (err) {
      setStatus('idle');
    }
  };

  const sampleLeads = useMemo(() => [
    { source: 'Missed call · injectables inquiry', status: 'Booked consult', value: '$1,200' },
    { source: 'Abandoned booking form', status: 'Re-engaged', value: '$800' },
    { source: 'Instagram DM · Morpheus8 inquiry', status: 'Clinical question', value: '$3,200' },
  ], []);

  return (
    <section id="calculator" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <Reveal>
          <p className="section-kicker">Ad spend vs. what you're keeping</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-6xl">
            You&apos;re spending money on ads. Here&apos;s how much you&apos;re actually keeping.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#6b6259]">
            Conservative model — only a portion of unconverted demand is treated as recoverable, and clinical routing stays under your team&apos;s control.
          </p>
          <div className="mt-8 rounded-2xl border border-[#e1d4c5] bg-white/52 p-5 text-sm leading-7 text-[#5f574f]">
            <strong className="text-[#2a2621]">Methodology:</strong> compares current booking conversion against a 5.8% internal modeling target (not an audited benchmark — verify against your own system data), then discounts recoverable value to account for fit, staff capacity, and treatment readiness.
          </div>
        </Reveal>
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#fbf7ef] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51]">
                Estimated missed-demand opportunity
              </p>
              <p className="mt-4 font-display text-5xl text-[#221f1b]">
                <AnimatedCurrency value={monthlyLeak} />
              </p>
            </div>
            <div className="rounded-2xl border border-[#b9825f]/25 bg-[#f3eadf] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51]">
                Conservative pilot target
              </p>
              <p className="mt-4 font-display text-5xl text-[#b9825f]">
                <AnimatedCurrency value={pilotTarget} />
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <GovButton onClick={onBookCall} className="btn-md">
            Send me a free report →
          </GovButton>
            <span className="text-xs text-[#7a7066]">$0 if we don&apos;t demonstrate missed demand</span>
          </div>

          <div className="mt-8 space-y-7">
            <Slider
              label="Monthly qualified site traffic"
              value={traffic}
              min={800}
              max={12000}
              step={100}
              display={traffic.toLocaleString('en-US')}
              onChange={setTraffic}
            />
            <Slider
              label="Current booking conversion"
              value={conv}
              min={0.8}
              max={7}
              step={0.1}
              display={`${conv.toFixed(1)}%`}
              onChange={setConv}
            />
            <Slider
              label="Average high-ticket treatment value"
              value={ticket}
              min={450}
              max={3500}
              step={50}
              display={`$${ticket.toLocaleString('en-US')}`}
              onChange={setTicket}
            />
          </div>

          {/* Inline preview — click to reveal */}
          <div className="mt-6">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex w-full items-center justify-between rounded-xl border border-[#e1d4c5] bg-[#fbf7ef] px-5 py-3 text-sm font-medium text-[#5f574f] transition hover:bg-[#f3eadf]"
            >
              <span>{showPreview ? 'Hide' : 'See what surfaced demand looks like'}</span>
              <svg
                className={`h-4 w-4 transition-transform ${showPreview ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showPreview && (
              <div className="mt-3 divide-y divide-[#efe2d2] rounded-xl border border-[#e1d4c5] bg-[#fffaf2] overflow-hidden">
                {sampleLeads.map((item) => (
                  <div key={item.source} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-[#221f1b]">{item.source}</p>
                      <p className="text-xs text-[#7a7066]">Surfaced value: {item.value}</p>
                    </div>
                    <span className="rounded-full bg-[#eef3ea] px-3 py-1 text-xs font-semibold text-[#607461]">
                      {item.status}
                    </span>
                  </div>
                ))}
                <p className="bg-[#fbf7ef] px-5 py-3 text-[11px] leading-5 text-[#7a7066]">
                  Modeled on early feedback — not live customer results. Your real surfaced demand will reflect your clinic&apos;s specific patterns.
                </p>
              </div>
            )}
          </div>

          {/* Email — optional */}
          <div className="mt-6 rounded-[1.5rem] border border-[#e1d4c5] bg-[#fffaf2]/80 p-6 backdrop-blur-xl">
            {status === 'success' ? (
              <div className="text-center py-4">
                <p className="text-lg text-[#221f1b] font-medium mb-4">On its way. Want it walked through?</p>
                <button
                  onClick={onBookCall}
                  className="govbtn inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                >
                  Start my 14-day pilot →
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6a51] mb-3">
                  Want this estimate in your inbox?
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="you@clinic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="govbtn inline-flex h-[48px] items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : 'Email the report →'}
                  </button>
                </form>
                <p className="mt-3 text-xs text-[#7a7066]">
                  No spam. No sales call required. One report with your clinic&apos;s estimated demand landscape.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
