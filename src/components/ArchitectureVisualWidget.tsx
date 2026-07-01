'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export function ArchitectureVisualWidget({ onBookCall }: { onBookCall?: () => void }) {
  useEffect(() => {
    /* ── Number count-up ── */
    function countUp(el: HTMLElement, target: number, duration: number, decimals: number) {
      const start = performance.now();
      const fmt = (v: number) => decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString('en-US');
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      })(start);
    }

    const v1 = document.getElementById('v1');
    const v2 = document.getElementById('v2');
    const v3 = document.getElementById('v3');
    const recoveryLayer = document.getElementById('recovery-layer');
    const ownership = document.getElementById('ownership');

    /* Start counters when stat cards animate in (~3.95s delay) */
    setTimeout(() => {
      if (v1) countUp(v1, 2000, 700, 0);
      setTimeout(() => { if (v2) countUp(v2, 4000, 800, 0); }, 150);
      setTimeout(() => { if (v3) countUp(v3, 1.3,  500, 1); }, 300);
    }, 3950);

    /* ── Post-animation glow states ── */
    setTimeout(() => {
      if (recoveryLayer) recoveryLayer.classList.add('glowing');
    }, 2100);

    setTimeout(() => {
      if (ownership) ownership.classList.add('pulsing');
    }, 3700);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* ─── Tokens ─── */
          :root {
            --ivory:      #FDF8F0;
            --card:       #FEFAF5;
            --band:       #F9F2E7;
            --terracotta: #C48A5C;
            --terra-dark: #a3713f;
            --charcoal:   #2C2418;
            --muted:      #6B5A48;
            --soft:       #6B5A48;
            --border:     #EADBC6;
            --sage:       #7f8f78;
            --sage-bg:    #eef3ea;
            --shadow:     0 24px 70px rgba(44,36,24,0.09);
            --ease-lux:   cubic-bezier(0.22, 0.68, 0, 1.0);
          }

          .vis-body {
            background: var(--ivory);
            background-image: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(196,138,92,0.07), transparent);
            color: var(--charcoal);
            font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 2.5rem 1rem 4rem;
          }

          /* ─── Keyframes ─── */
          @keyframes pageIn   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeUp   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
          @keyframes drawLine { from { stroke-dashoffset: var(--dash); } to { stroke-dashoffset: 0; } }
          @keyframes recoveryGlow {
            0%,100% { filter: drop-shadow(0 0 0 transparent); }
            50%     { filter: drop-shadow(0 0 10px rgba(196,138,92,0.28)); }
          }
          @keyframes pulseOwnership {
            0%,100% { filter: drop-shadow(0 0 0 transparent); }
            50%     { filter: drop-shadow(0 0 8px rgba(196,138,92,0.35)); }
          }
          @keyframes badgeSlide {
            from { opacity:0; transform: translateX(10px); }
            to   { opacity:1; transform: translateX(0); }
          }

          /* ─── Page card ─── */
          .vis-page {
            width: 100%;
            max-width: 880px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 1.75rem;
            padding: 2.75rem 3rem 2.5rem;
            box-shadow: var(--shadow);
            animation: pageIn 0.75s var(--ease-lux) both;
          }

          /* ─── Header ─── */
          .vis-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            animation: fadeUp 0.6s var(--ease-lux) 0.2s both;
          }
          .vis-kicker {
            font-size: 10.5px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--terracotta);
            margin-bottom: 8px;
          }
          .vis-page-title {
            font-family: 'Fraunces', var(--font-instrument-serif), Georgia, serif;
            font-size: 2rem;
            font-weight: 400;
            line-height: 1.15;
            color: var(--charcoal);
            letter-spacing: -0.01em;
          }
          .vis-badge {
            background: var(--band);
            border: 1px solid var(--border);
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 11.5px;
            font-weight: 600;
            color: var(--soft);
            white-space: nowrap;
            flex-shrink: 0;
            align-self: flex-start;
            margin-top: 4px;
            animation: badgeSlide 0.5s var(--ease-lux) 0.45s both;
          }

          /* ─── SVG ─── */
          .vis-flow-wrap { margin: 0 -0.5rem; }
          .vis-svg { width: 100%; height: auto; display: block; overflow: visible; }

          .svg-kicker {
            font-family: 'Instrument Sans', sans-serif;
            font-size: 9.5px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            fill: var(--terracotta);
            animation: fadeIn 0.5s ease-out 0.4s both;
          }
          .svg-h   { font-family: 'Fraunces', Georgia, serif; font-size: 13.5px; fill: var(--charcoal); }
          .svg-h-lg{ font-family: 'Fraunces', Georgia, serif; font-size: 15.5px; fill: var(--charcoal); }
          .svg-sub { font-family: 'Instrument Sans', sans-serif; font-size: 11px; fill: #4e4740; }

          #leak-1 { animation: fadeIn 0.45s ease-out 0.55s both; }
          #leak-2 { animation: fadeIn 0.45s ease-out 0.72s both; }
          #leak-3 { animation: fadeIn 0.45s ease-out 0.89s both; }

          .c-coral rect { fill: var(--band); stroke: var(--terracotta); stroke-width: 1.5; transition: fill 0.2s; }
          .c-coral:hover rect { fill: #ece0d0; cursor: default; }

          .arr-down {
            stroke: var(--terracotta); stroke-width: 1.5; opacity: 0.55; fill: none;
            --dash: 60;
            stroke-dasharray: 60;
            animation: drawLine 0.5s ease-out both;
          }
          #ad1 { animation-delay: 1.05s; }
          #ad2 { animation-delay: 1.1s;  }
          #ad3 { animation-delay: 1.15s; }

          #recovery-layer { animation: fadeIn 0.65s ease-out 1.35s both; }
          #recovery-layer.glowing rect { animation: recoveryGlow 2.8s ease-in-out infinite; }
          .c-purple rect { fill: #fff9f4; stroke: var(--terracotta); stroke-width: 2; }

          .arr-mid {
            stroke: var(--terracotta); stroke-width: 1.5; opacity: 0.55; fill: none;
            --dash: 55;
            stroke-dasharray: 55;
            animation: drawLine 0.45s ease-out both;
          }
          #am1 { animation-delay: 1.9s; }
          #am2 { animation-delay: 1.95s; }

          #outcome-1 { animation: fadeIn 0.4s ease-out 2.2s both; }
          #outcome-2 { animation: fadeIn 0.4s ease-out 2.35s both; }
          .c-teal rect { fill: var(--sage-bg); stroke: var(--sage); stroke-width: 1.5; transition: fill 0.2s; }
          .c-teal:hover rect { fill: #daecd5; }

          #af {
            stroke: var(--terracotta); stroke-width: 1.5; opacity: 0.55; fill: none;
            --dash: 55;
            stroke-dasharray: 55;
            animation: drawLine 0.45s ease-out 2.65s both;
          }

          #ownership { animation: fadeIn 0.6s ease-out 2.95s both; }
          #ownership.pulsing rect { animation: pulseOwnership 2.5s ease-in-out infinite; }
          .c-gray rect { fill: var(--band); stroke: var(--border); stroke-width: 1.5; }

          /* ─── HTML sections ─── */
          .vis-section { margin-top: 1.875rem; }
          .vis-section-label {
            font-size: 10.5px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--terracotta);
            margin-bottom: 12px;
          }
          #timeline-section .vis-section-label { animation: fadeUp 0.4s ease-out 3.2s both; }
          #math-section    .vis-section-label { animation: fadeUp 0.4s ease-out 3.85s both; }

          .vis-card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
            gap: 12px;
          }
          .vis-card {
            background: var(--ivory);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 1.1rem 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            animation: fadeUp 0.45s ease-out both;
          }
          .vis-card:hover {
            border-color: rgba(196,138,92,0.4);
            box-shadow: 0 8px 24px rgba(44,36,24,0.08);
          }
          #timeline-section .vis-card:nth-child(1) { animation-delay: 3.3s;  }
          #timeline-section .vis-card:nth-child(2) { animation-delay: 3.45s; }
          #timeline-section .vis-card:nth-child(3) { animation-delay: 3.6s;  }
          #timeline-section .vis-card:nth-child(4) { animation-delay: 3.75s; }

          .vis-card-day {
            font-size: 9.5px; font-weight: 700; letter-spacing: 0.2em;
            text-transform: uppercase; color: var(--terracotta); margin-bottom: 6px;
          }
          .vis-card-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 17px; color: var(--charcoal); margin-bottom: 4px;
          }
          .vis-card-body { font-size: 12px; color: var(--muted); line-height: 1.5; }

          .vis-stat-card {
            background: var(--ivory);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 1.1rem 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            animation: fadeUp 0.45s ease-out both;
          }
          .vis-stat-card:hover {
            border-color: rgba(196,138,92,0.4);
            box-shadow: 0 8px 24px rgba(44,36,24,0.08);
          }
          .vis-stat-card.highlight {
            background: var(--band);
            border-color: rgba(196,138,92,0.45);
          }
          #math-section .vis-stat-card:nth-child(1) { animation-delay: 3.95s; }
          #math-section .vis-stat-card:nth-child(2) { animation-delay: 4.1s;  }
          #math-section .vis-stat-card:nth-child(3) { animation-delay: 4.25s; }
          #math-section .vis-stat-card:nth-child(4) { animation-delay: 4.4s;  }

          .vis-stat-label { font-size: 11px; font-weight: 600; color: var(--soft); margin-bottom: 5px; }
          .vis-stat-value {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 30px; color: var(--charcoal); line-height: 1.05;
          }
          .vis-stat-value .unit { font-family: 'Instrument Sans', sans-serif; font-size: 13px; color: var(--soft); }
          .vis-stat-note { font-size: 11.5px; color: var(--muted); margin-top: 5px; }

          .vis-fine-print {
            font-size: 11px; color: var(--soft); line-height: 1.75;
            border-top: 1px solid var(--border); padding-top: 12px; margin-top: 14px;
            animation: fadeIn 0.5s ease-out 4.55s both;
          }
          .vis-cta-row {
            display: flex; gap: 10px; flex-wrap: wrap;
            margin-top: 1.875rem; padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            animation: fadeUp 0.5s var(--ease-lux) 4.8s both;
          }
          .vis-btn-primary {
            display: inline-flex; align-items: center; gap: 6px;
            background: var(--terracotta); color: #fff;
            border: none; border-radius: 100px; padding: 11px 22px;
            font-size: 13px; font-weight: 600; font-family: 'Instrument Sans', sans-serif;
            cursor: pointer; text-decoration: none;
            transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
            box-shadow: 0 8px 22px -6px rgba(196,138,92,0.45);
          }
          .vis-btn-primary:hover { background: var(--terra-dark); transform: translateY(-1px); box-shadow: 0 12px 28px -6px rgba(196,138,92,0.55); }
          .vis-btn-ghost {
            display: inline-flex; align-items: center; gap: 6px;
            background: transparent; color: var(--charcoal);
            border: 1px solid var(--border); border-radius: 100px; padding: 11px 22px;
            font-size: 13px; font-weight: 600; font-family: 'Instrument Sans', sans-serif;
            cursor: pointer; text-decoration: none;
            transition: background 0.2s, transform 0.15s, border-color 0.2s;
          }
          .vis-btn-ghost:hover { background: var(--band); transform: translateY(-1px); border-color: rgba(196,138,92,0.35); }

          @media print {
            .vis-body { background: white; padding: 0; }
            .vis-page { box-shadow: none; border: none; border-radius: 0; max-width: 100%; padding: 1.5rem;
                    animation: none; opacity: 1; transform: none; }
            * { animation: none !important; opacity: 1 !important; transform: none !important;
                stroke-dashoffset: 0 !important; }
            .vis-cta-row { display: none; }
          }
          @media (max-width: 640px) {
            .vis-page { padding: 1.75rem 1.25rem; border-radius: 1.25rem; }
            .vis-page-title { font-size: 1.5rem; }
            .vis-badge { display: none; }
          }
        `
      }} />

      <div className="vis-body">
        <article className="vis-page">
          {/* Header */}
          <div className="vis-header">
            <div>
              <p className="vis-kicker">Scrutexity · What you're actually buying</p>
              <h1 className="vis-page-title">The path from leaked inquiry<br/>to verified booking</h1>
            </div>
            <span className="vis-badge">Your Boulevard stays. Your ads stay.</span>
          </div>

          {/* Flow diagram */}
          <div className="vis-flow-wrap">
            <svg viewBox="0 0 680 478" role="img" xmlns="http://www.w3.org/2000/svg" className="vis-svg">
              <title>Leak-to-ledger flow</title>
              <desc>Three leak sources flow into the Scrutexity recovery layer, which books into the existing PMS and logs every recovery to an auditable ledger the clinic owns.</desc>
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#C48A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>

              <text className="svg-kicker" x="40" y="30">Where money leaks today</text>

              {/* Leak source nodes */}
              <g id="leak-1" className="node c-coral">
                <rect x="40" y="44" width="180" height="60" rx="10"/>
                <text className="svg-h"   x="130" y="68" textAnchor="middle" dominantBaseline="central">Missed call</text>
                <text className="svg-sub" x="130" y="90" textAnchor="middle" dominantBaseline="central">Text back in 30 seconds</text>
              </g>
              <g id="leak-2" className="node c-coral">
                <rect x="250" y="44" width="180" height="60" rx="10"/>
                <text className="svg-h"   x="340" y="68" textAnchor="middle" dominantBaseline="central">No-show</text>
                <text className="svg-sub" x="340" y="90" textAnchor="middle" dominantBaseline="central">Rebook within 1 hr</text>
              </g>
              <g id="leak-3" className="node c-coral">
                <rect x="460" y="44" width="180" height="60" rx="10"/>
                <text className="svg-h"   x="550" y="68" textAnchor="middle" dominantBaseline="central">11pm DM</text>
                <text className="svg-sub" x="550" y="90" textAnchor="middle" dominantBaseline="central">Booked while asleep</text>
              </g>

              {/* Down arrows to recovery */}
              <line id="ad1" className="arr-down" x1="130" y1="104" x2="130" y2="148" markerEnd="url(#arr)"/>
              <line id="ad2" className="arr-down" x1="340" y1="104" x2="340" y2="148" markerEnd="url(#arr)"/>
              <line id="ad3" className="arr-down" x1="550" y1="104" x2="550" y2="148" markerEnd="url(#arr)"/>

              {/* Recovery layer */}
              <g id="recovery-layer" className="c-purple">
                <rect x="40" y="156" width="600" height="100" rx="14"/>
                <text className="svg-h-lg" x="340" y="188" textAnchor="middle" dominantBaseline="central">Scrutexity recovery layer</text>
                <text className="svg-sub"  x="340" y="213" textAnchor="middle" dominantBaseline="central">Re-engages in your clinic's voice within minutes</text>
                <text className="svg-sub"  x="340" y="234" textAnchor="middle" dominantBaseline="central">Clinical questions route to your staff — never the AI</text>
              </g>

              {/* Mid arrows to outcomes */}
              <line id="am1" className="arr-mid" x1="200" y1="256" x2="200" y2="298" markerEnd="url(#arr)"/>
              <line id="am2" className="arr-mid" x1="480" y1="256" x2="480" y2="298" markerEnd="url(#arr)"/>

              {/* Outcome nodes */}
              <g id="outcome-1" className="node c-teal">
                <rect x="70" y="305" width="260" height="64" rx="10"/>
                <text className="svg-h"   x="200" y="329" textAnchor="middle" dominantBaseline="central">Booked into Boulevard</text>
                <text className="svg-sub" x="200" y="352" textAnchor="middle" dominantBaseline="central">Deposit-paid appointment</text>
              </g>
              <g id="outcome-2" className="node c-teal">
                <rect x="350" y="305" width="260" height="64" rx="10"/>
                <text className="svg-h"   x="480" y="329" textAnchor="middle" dominantBaseline="central">Logged to your ledger</text>
                <text className="svg-sub" x="480" y="352" textAnchor="middle" dominantBaseline="central">Source + transcript + deposit</text>
              </g>

              {/* Final arrow */}
              <line id="af" x1="340" y1="369" x2="340" y2="412" markerEnd="url(#arr)"/>

              {/* Ownership box */}
              <g id="ownership" className="c-gray">
                <rect x="150" y="420" width="380" height="46" rx="10"/>
                <text className="svg-h" x="340" y="443" textAnchor="middle" dominantBaseline="central">You own the proof — keep it even if you cancel</text>
              </g>
            </svg>
          </div>

          {/* Timeline cards */}
          <div id="timeline-section" className="vis-section">
            <p className="vis-section-label">The 14-day pilot — $0 during the window</p>
            <div className="vis-card-grid">
              <div className="vis-card">
                <p className="vis-card-day">Day 1</p>
                <p className="vis-card-title">Demand audit</p>
                <p className="vis-card-body">Map your last 30 days of missed calls, unworked forms, and abandoned bookings</p>
              </div>
              <div className="vis-card">
                <p className="vis-card-day">Days 2–4</p>
                <p className="vis-card-title">Quiet install</p>
                <p className="vis-card-body">Read-only access, BAA signed before activation, no staff retraining</p>
              </div>
              <div className="vis-card">
                <p className="vis-card-day">Days 5–10</p>
                <p className="vis-card-title">Recovery window</p>
                <p className="vis-card-body">Every inquiry tracked to source, clinical questions escalated to your team</p>
              </div>
              <div className="vis-card">
                <p className="vis-card-day">Day 14</p>
                <p className="vis-card-title">Owner brief</p>
                <p className="vis-card-body">Full report — every recovery, transcript, deposit status. Yours to keep either way</p>
              </div>
            </div>
          </div>

          {/* Math cards */}
          <div id="math-section" className="vis-section">
            <p className="vis-section-label">The offer, in numbers</p>
            <div className="vis-card-grid">
              <div className="vis-stat-card">
                <p className="vis-stat-label">14-day pilot</p>
                <p className="vis-stat-value">$0</p>
                <p className="vis-stat-note">No integration fee. No commitment.</p>
              </div>
              <div className="vis-stat-card">
                <p className="vis-stat-label">Recovery plan — after pilot</p>
                <p className="vis-stat-value">$<span id="v1">0</span><span className="unit">/mo</span></p>
              </div>
              <div className="vis-stat-card highlight">
                <p className="vis-stat-label">Guarantee floor — first 30 days</p>
                <p className="vis-stat-value">$<span id="v2">0</span></p>
                <p className="vis-stat-note">Verified missed-demand recovery or first month free</p>
              </div>
              <div className="vis-stat-card">
                <p className="vis-stat-label">Break-even</p>
                <p className="vis-stat-value">~<span id="v3">0</span><span className="unit"> consults/mo</span></p>
                <p className="vis-stat-note">About one recovered Morpheus8 inquiry at $1,500 avg ticket</p>
              </div>
            </div>
            <p className="vis-fine-print">
              A verified recovery = source logged + conversation transcript + completed booking deposit.
              Success criteria agreed in writing before Day 1.
              Break-even math is illustrative, based on a $1,500 average treatment value — verify against your own numbers.
            </p>
          </div>

          {/* Renewal bridge */}
          <div className="vis-section" style={{ marginTop: '20px' }}>
            <p className="vis-section-label">After the pilot — you decide</p>
            <div className="vis-stat-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
              <p style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '18px', color: 'var(--charcoal)', marginBottom: '6px' }}>$2,000/mo, month to month</p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}>
                The recovery layer stays active. You keep the ledger. Cancel anytime —<br/>
                no equipment to return, no data lost, no exit call.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="vis-cta-row">
            {onBookCall ? (
              <button onClick={onBookCall} className="vis-btn-primary">
                Start your 14-day pilot →
              </button>
            ) : (
              <Link href="/pilot" className="vis-btn-primary">
                Start your 14-day pilot →
              </Link>
            )}
            <Link href="/sample-owner-brief" className="vis-btn-ghost">
              See a sample owner brief ↗
            </Link>
          </div>

        </article>
      </div>
    </>
  );
}
