'use client';
import { useEffect, useRef, useState } from 'react';
import { useMagnetic } from '@/hooks/use-motion';

type VerifyState =
  | { kind: 'loading' }
  | { kind: 'green'; records: number; hash: string; checkedAt: string }
  | { kind: 'fallback' };

const ENDPOINT = '/api/verify/demo-001';
const TIMEOUT_MS = 500;

async function fetchVerify(signal: AbortSignal): Promise<VerifyState> {
  const res = await fetch(ENDPOINT, { signal, cache: 'no-store' });
  if (!res.ok) return { kind: 'fallback' };
  const data = await res.json();
  if (String(data.status).toUpperCase() !== 'GREEN') return { kind: 'fallback' };
  return {
    kind: 'green',
    records: Number(data.records_verified ?? data.records ?? 0),
    hash: String(data.latest_hash ?? data.hash ?? ''),
    checkedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

export function VerifyCard() {
  const [state, setState] = useState<VerifyState>({ kind: 'loading' });
  const [display, setDisplay] = useState(0);
  const btn = useMagnetic<HTMLButtonElement>();

  const load = () => {
    setState({ kind: 'loading' });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    fetchVerify(ctrl.signal)
      .then((s) => setState(s))
      .catch(() => setState({ kind: 'fallback' }))
      .finally(() => clearTimeout(timer));
    return ctrl;
  };

  useEffect(() => {
    const ctrl = load();
    const iv = setInterval(load, 30000);
    return () => { ctrl.abort(); clearInterval(iv); };
  }, []);

  useEffect(() => {
    if (state.kind !== 'green') { setDisplay(0); return; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setDisplay(state.records); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      setDisplay(Math.floor(state.records * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state]);

  return (
    <div className="mx-auto mt-11 max-w-[560px] overflow-hidden rounded-3xl border border-[rgba(34,31,27,0.1)] bg-warm-card p-10 text-center shadow-card">
      <span className="inline-flex items-center gap-2 rounded-[10px] border border-[rgba(34,31,27,0.1)] bg-cream px-3.5 py-2.5 font-mono text-[0.8rem] text-espresso/70">
        <span className={state.kind === 'green' ? 'text-verified' : 'text-espresso/40'}>●</span>
        scrutexity.com{ENDPOINT}
      </span>

      <div className="mt-6 flex min-h-[68px] items-center justify-center">
        {state.kind === 'loading' && (
          <span className="font-mono text-[0.9rem] text-espresso/60">checking records…</span>
        )}
        {state.kind === 'green' && (
          <div className="motion-fade-in inline-flex items-center gap-3">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-verified/15 text-base text-verified">✓</span>
            <span className="font-serif text-2xl font-semibold text-verified">GREEN</span>
            <span className="font-mono text-lg text-espresso tabular-nums">· {display.toLocaleString()} records</span>
          </div>
        )}
        {state.kind === 'fallback' && (
          <span className="font-mono text-[0.86rem] leading-relaxed text-espresso/70">
            Verification endpoint active. Visit <a href="/verify" className="text-clay underline underline-offset-2">/verify</a> for live status.
          </span>
        )}
      </div>

      {state.kind === 'green' && (
        <div className="motion-fade-in font-mono text-[0.74rem] text-espresso/60">
          {state.hash ? `latest record ${state.hash.slice(0, 10)}…  ·  ` : ''}last checked {state.checkedAt}
        </div>
      )}

      <button
        ref={btn}
        onClick={load}
        className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition duration-300"
      >
        Run verification →
      </button>

      <p className="mt-5 text-[0.74rem] text-espresso/60">
        Operational verification only. Not legal or medical advice.
      </p>
    </div>
  );
}
