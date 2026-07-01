'use client';
import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Field } from './Field';

function AnimatedValue({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    return spring.on('change', (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  return <>{display.toLocaleString()}</>;
}

export default function LeakCalculator() {
  const [traffic, setTraffic] = useState(3200);
  const [conv, setConv] = useState(2.8);
  const [ticket, setTicket] = useState(1200);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const TARGET = 5.8;
  const monthlyLeak = Math.max(0, traffic * ((TARGET - conv) / 100) * ticket);
  const pilotTarget = monthlyLeak * 0.48;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/leak-report', {
      method: 'POST',
      body: JSON.stringify({ email, traffic, conv, ticket, monthlyLeak, pilotTarget }),
    });
    setSent(true);
  };

  return (
    <section className="bg-ivory px-5 py-24 sm:px-8 lg:py-32" id="calculator">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Revenue calculator</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-5xl">Make your leak visible &mdash; without inflating the math.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-8">
            <SliderField label="Monthly qualified site traffic" value={traffic} min={200} max={20000} step={100} onChange={setTraffic} format={(v) => v.toLocaleString()} />
            <SliderField label="Current booking conversion (%)" value={conv} min={0.5} max={8} step={0.1} onChange={setConv} format={(v) => `${v}%`} />
            <SliderField label="Avg high-ticket treatment value ($)" value={ticket} min={200} max={5000} step={100} onChange={setTicket} format={(v) => `$${v.toLocaleString()}`} />
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#e1d4c5] bg-[#fffaf2] shadow-[0_24px_70px_rgba(85,62,41,0.10)]">
            <div className="h-1.5 w-full bg-terracotta" />
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51]">Estimated monthly leak</p>
              <p className="mt-2 font-display text-5xl text-terracotta tabular-nums">
                $<AnimatedValue value={monthlyLeak} />
              </p>
              <p className="mt-1 text-sm text-[#7a7066]">
                That&apos;s $<AnimatedValue value={monthlyLeak * 12} /> a year walking out before they book.
              </p>

              <div className="mt-6 rounded-2xl bg-[#f3eadf] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6a51]">Conservative 14-day pilot target</p>
                  <span className="text-[10px] font-mono text-[#9b6a51]">{Math.round(pilotTarget / monthlyLeak * 100)}% of leak</span>
                </div>
                <p className="mt-1 font-display text-3xl text-[#221f1b] tabular-nums">
                  $<AnimatedValue value={pilotTarget} />
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#e1d4c5]">
                  <div className="h-full rounded-full bg-terracotta transition-all duration-500" style={{ width: `${Math.min(100, pilotTarget / monthlyLeak * 100)}%` }} />
                </div>
              </div>

              {!sent ? (
                <form onSubmit={submit} className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email me the full breakdown"
                    className="w-full rounded-xl border border-[#e1d4c5] bg-[#fbf7ef] px-4 py-3 text-[#221f1b] placeholder:text-[#9b9085] focus:border-[#b9825f] focus:outline-none focus:ring-1 focus:ring-[#b9825f] transition-all" />
                  <button className="govbtn rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition">Send &rarr;</button>
                </form>
              ) : (
                <p className="mt-6 rounded-lg bg-terracotta/10 px-4 py-3 text-sm text-[#9b6a51]">
                  &#10003; On its way. No sales call — the report speaks for itself.
                </p>
              )}
              <p className="mt-4 text-xs leading-6 text-[#7a7066]">No sequence, no spam &mdash; one email. Compares your conversion against a 5.8% internal modeling target (not an audited benchmark — verify against your own data), discounted for fit and staff capacity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; format: (v: number) => string;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="luxury-slider flex-1"
        />
        <span className="min-w-[5rem] text-right text-sm font-semibold text-[#221f1b] tabular-nums">
          {format(value)}
        </span>
      </div>
    </Field>
  );
}
