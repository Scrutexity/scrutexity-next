'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, MessageCircle, Phone, Voicemail, Globe } from 'lucide-react';

/* ── DNA Connector ────────────────────────────────────────────────────
 *
 * Scroll-triggered bridge from the hero video into a results ledger.
 *
 *   Top: Sage double-helix cord emerges from upper-right (aligned with
 *        the video's output edge) and descends as you scroll.
 *   Bottom: 4-row "Recovered Bookings" ledger card animates in.
 *
 * Scroll progress: RAF-driven stroke-dashoffset on helix strands +
 *                  running deposit total. No R3F, no GSAP.
 * ────────────────────────────────────────────────────────────────────── */

interface Entry {
  source: 'Instagram DM' | 'Web form' | 'Missed call' | 'Voicemail';
  received: string;
  recontacted: string;
  deposit: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const ENTRIES: Entry[] = [
  { source: 'Instagram DM', received: 'Yesterday 11:42 PM', recontacted: 'Today 9:15 AM',  deposit: 2450, Icon: MessageCircle },
  { source: 'Web form',     received: 'Yesterday 4:08 PM',  recontacted: 'Today 8:50 AM',  deposit: 1800, Icon: Globe },
  { source: 'Missed call',  received: 'Yesterday 2:14 PM',  recontacted: 'Today 10:02 AM', deposit: 3200, Icon: Phone },
  { source: 'Voicemail',    received: 'Yesterday 9:30 AM',  recontacted: 'Today 11:18 AM', deposit: 1950, Icon: Voicemail },
];

const TOTAL_PEAK = ENTRIES.reduce((s, e) => s + e.deposit, 0);

/* SVG helix path — starts from upper-right (where video output sits)
 * and descends in a gentle S-curve toward center-left. */
const HELIX_PATH = 'M 720 0 C 720 60, 600 100, 600 180 S 700 300, 600 420 S 500 520, 440 600';

interface DnaConnectorProps {
  /** Called when the hero video is ~80% scrolled — lets us accelerate reveal. */
  ready?: boolean;
}

export default function DnaConnector({ ready = false }: DnaConnectorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const cordARef = useRef<SVGPathElement>(null);
  const cordBRef = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);
  const [accelerated, setAccelerated] = useState(false);
  const raf = useRef(0);
  const dashLen = useRef(0);

  /* When hero says ready, speed up the entrance */
  useEffect(() => {
    if (ready && !accelerated) setAccelerated(true);
  }, [ready, accelerated]);

  /* Scroll-driven progress: draws the helix + counts up deposits */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Measure dash length once
    if (cordARef.current) {
      dashLen.current = cordARef.current.getTotalLength();
      cordARef.current.style.strokeDasharray = String(dashLen.current);
      cordARef.current.style.strokeDashoffset = String(dashLen.current);
    }
    if (cordBRef.current) {
      const len = cordBRef.current.getTotalLength();
      cordBRef.current.style.strokeDasharray = String(len);
      cordBRef.current.style.strokeDashoffset = String(len);
    }

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section bottom enters viewport, 1 = section top exits viewport
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));

      // Helix strand A draws first, strand B follows
      if (cordARef.current && dashLen.current) {
        const a = Math.min(1, progress * 1.3);
        cordARef.current.style.strokeDashoffset = String(dashLen.current * (1 - a));
      }
      if (cordBRef.current) {
        const bl = parseFloat(cordBRef.current.style.strokeDasharray || '0');
        const b = Math.min(1, Math.max(0, (progress - 0.08) * 1.3));
        cordBRef.current.style.strokeDashoffset = String(bl * (1 - b));
      }

      // Running total
      if (totalRef.current) {
        const target = Math.round(TOTAL_PEAK * Math.min(1, Math.max(0, (progress - 0.15) / 0.7)));
        totalRef.current.textContent = `$${target.toLocaleString()}`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          setInView(true);
          if (!raf.current) raf.current = requestAnimationFrame(tick);
        } else if (raf.current) {
          cancelAnimationFrame(raf.current);
          raf.current = 0;
        }
      },
      { threshold: 0, rootMargin: '20% 0px 20% 0px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const show = inView || accelerated;

  return (
    <section
      id="dna-connector"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cream py-8 sm:py-12"
      aria-label="Recovered bookings flow into your ledger"
    >
      {/* DNA helix — sits in the upper portion, aligned to video output edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[55%] w-full">
        <svg
          aria-hidden
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMin slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="dna-sage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#8FA98A" stopOpacity="0.95" />
              <stop offset="55%"  stopColor="#8FA98A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#5E7A5A" stopOpacity="0.5" />
            </linearGradient>
            <filter id="dna-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Soft glow underlay */}
          <path
            d={HELIX_PATH}
            stroke="#8FA98A"
            strokeOpacity="0.15"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            filter="url(#dna-glow)"
          />

          {/* Strand A — primary helix */}
          <path
            ref={cordARef}
            d={HELIX_PATH}
            stroke="url(#dna-sage)"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Strand B — phase-shifted, thinner */}
          <path
            ref={cordBRef}
            d="M 720 0 C 720 60, 820 100, 820 180 S 720 300, 820 420 S 680 520, 600 600"
            stroke="url(#dna-sage)"
            strokeWidth="1.8"
            strokeOpacity="0.65"
            strokeLinecap="round"
            fill="none"
          />

          {/* Traveling glow dot on strand A */}
          <circle
            r="4"
            fill="#8FA98A"
            className="dna-dot-a"
            style={{ offsetPath: `path("${HELIX_PATH}")` }}
          />
          {/* Traveling dot on strand B */}
          <circle
            r="3"
            fill="#F8F3EA"
            opacity="0.85"
            className="dna-dot-b"
            style={{ offsetPath: `path("M 720 0 C 720 60, 820 100, 820 180 S 720 300, 820 420 S 680 520, 600 600")` }}
          />
        </svg>
      </div>

      {/* Content stack */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        {/* Eyebrow + headline — reveal on scroll-in */}
        <div
          className="text-center transition-all duration-1000"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(18px)',
            transitionDelay: '0.15s',
          }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            What the engine ships
          </p>
          <h2
            className="mx-auto mt-5 max-w-2xl font-display text-3xl leading-tight tracking-tight text-espresso md:text-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            Inquiries in. <span className="italic text-sage">Booked deposits</span> out.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-mist md:text-base">
            Every recovery shows up as a real deposit in your PMS — receipt-grade, never an estimate.
          </p>
        </div>

        {/* Recovered Ledger card */}
        <div className="relative z-10 mx-auto mt-12 max-w-3xl">
          <div
            className="relative rounded-2xl border border-sand-deep/40 bg-[#FAF5E8] p-6 sm:p-8"
            style={{
              boxShadow:
                '0 24px 60px -20px rgba(28,24,20,0.18), 0 8px 24px -12px rgba(28,24,20,0.10), inset 0 0 0 1px rgba(143,169,138,0.18)',
            }}
          >
            {/* Sage corner glint */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-px -top-px h-16 w-16 rounded-tr-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at 100% 0%, rgba(143,169,138,0.40), transparent 60%)',
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-sand-deep/30 pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-espresso/70">
                Recovered Bookings
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/70">
                Illustrative
              </p>
            </div>

            {/* Entries */}
            <ul className="mt-2 divide-y divide-sand-deep/25">
              {ENTRIES.map((entry, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 py-3"
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${0.3 + i * 0.14}s`,
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                      <entry.Icon size={15} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-espresso">
                        {entry.source}
                      </p>
                      <p className="truncate text-xs text-mist">
                        {entry.received} <span className="mx-1 text-mist/60">→</span> {entry.recontacted}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-sage-deep">
                      ${entry.deposit.toLocaleString()}
                    </span>
                    <CheckCircle2 size={16} className="text-sage-deep" strokeWidth={2} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Running total */}
            <div
              className="mt-4 flex items-center justify-between rounded-xl bg-cream/70 px-4 py-3"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '1.0s',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mist/80">
                Verified deposits — last 24h
              </p>
              <span
                ref={totalRef}
                className="font-display text-2xl font-normal text-sage-deep"
                aria-live="polite"
              >
                $0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Local CSS — DNA dot motion + reduced-motion guard */}
      <style>{`
        @keyframes dna-travel {
          0%   { offset-distance: 0%;  opacity: 0;   }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .dna-dot-a { animation: dna-travel 4.0s linear infinite; }
        .dna-dot-b { animation: dna-travel 5.0s linear infinite; animation-delay: 1.6s; }
        @media (prefers-reduced-motion: reduce) {
          .dna-dot-a, .dna-dot-b { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
