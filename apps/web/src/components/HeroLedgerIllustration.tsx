'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Phone, FileText, MessageSquare, Shield, Check, Calendar, Lock } from 'lucide-react';

const luxuryEase = [0.16, 1, 0.3, 1] as const;

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefers;
}

export default function HeroLedgerIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const reducedMotion = usePrefersReducedMotion();

  // One light parallax layer: the whole instrument drifts up a touch slower
  // than the page scroll — depth without motion sickness.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [14, -14]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <motion.div
        style={reducedMotion ? undefined : { y: parallaxY }}
        className="relative rounded-3xl border border-sand-deep bg-cream/60 p-5 md:p-7 shadow-[0_20px_50px_rgba(85,62,41,0.04)] backdrop-blur-md overflow-hidden">
        {/* ── Layered ambient auras ── */}
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_30%,rgba(127,143,120,0.07),transparent_55%),radial-gradient(ellipse_at_18%_68%,rgba(185,130,95,0.05),transparent_45%),radial-gradient(ellipse_at_80%_40%,rgba(232,223,207,0.25),transparent_50%)] pointer-events-none" />

        <div className="relative aspect-[800/320] w-full overflow-hidden rounded-2xl border border-sand-deep/55 bg-white shadow-inner">
          {/* Dot-grid background */}
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #efe6d7 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* ── Parallax-adjacent floating blobs ── */}
          <motion.div
            className="absolute left-[36%] top-[16%] w-[150px] h-[150px] rounded-full bg-[#7f8f78]/6 blur-2xl pointer-events-none"
            animate={reducedMotion ? {} : { y: [0, -12, 0], scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-[10%] top-[44%] w-[110px] h-[110px] rounded-full bg-[#b9825f]/6 blur-2xl pointer-events-none"
            animate={reducedMotion ? {} : { y: [0, 8, 0], scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut', delay: 1.2 }}
          />
          <motion.div
            className="absolute right-[12%] top-[28%] w-[130px] h-[130px] rounded-full bg-[#e8dfcf]/40 blur-2xl pointer-events-none"
            animate={reducedMotion ? {} : { y: [0, -6, 0], scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 2.5 }}
          />

          {/* ── SVG Flow Lines — slower, more organic ── */}
          <svg
            viewBox="0 0 800 320"
            className="absolute inset-0 w-full h-full z-[1] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Static guide lines — thinner, softer */}
            <path d="M 180 80 C 280 80, 270 160, 320 160" fill="none" stroke="#efe6d7" strokeWidth="1.5" />
            <path d="M 180 160 L 320 160" fill="none" stroke="#efe6d7" strokeWidth="1.5" />
            <path d="M 180 240 C 280 240, 270 160, 320 160" fill="none" stroke="#efe6d7" strokeWidth="1.5" />
            <path d="M 480 160 C 530 160, 530 100, 580 100" fill="none" stroke="#efe6d7" strokeWidth="1.5" />
            <path d="M 480 160 C 530 160, 530 220, 580 220" fill="none" stroke="#efe6d7" strokeWidth="1.5" />

            {/* ── Animated Sage Flow Dashes — gentler, more poetic timing ── */}
            {!reducedMotion && (
              <>
                {[
                  { d: 'M 180 80 C 280 80, 270 160, 320 160', dash: '8 190', total: 198, dur: 3.2, delay: 0 },
                  { d: 'M 180 160 L 320 160', dash: '8 150', total: 158, dur: 2.6, delay: 0.5 },
                  { d: 'M 180 240 C 280 240, 270 160, 320 160', dash: '8 200', total: 208, dur: 3.6, delay: 0.2 },
                  { d: 'M 480 160 C 530 160, 530 100, 580 100', dash: '8 150', total: 158, dur: 2.9, delay: 0.85 },
                  { d: 'M 480 160 C 530 160, 530 220, 580 220', dash: '8 150', total: 158, dur: 2.9, delay: 1.35 },
                ].map((flow, i) => (
                  <motion.path
                    key={i}
                    d={flow.d}
                    fill="none"
                    stroke="#7f8f78"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={flow.dash}
                    animate={
                      isInView
                        ? { strokeDashoffset: [flow.total, -flow.total * 0.25] }
                        : { strokeDashoffset: flow.total }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: flow.dur,
                      ease: 'linear',
                      delay: flow.delay,
                    }}
                  />
                ))}
              </>
            )}
          </svg>

          {/* ── NODES OVERLAY ── */}
          <div className="absolute inset-0 flex justify-between p-5 z-10 font-sans pointer-events-none">
            {/* ── LEFT: Inquiry Sources (fade + subtle drift-in) ── */}
            <div className="flex flex-col justify-between h-full w-[170px] pointer-events-auto gap-3">
              {[
                { label: 'Missed Call', inquiry: 'Morpheus8 inquiry', icon: <Phone size={14} />, delay: 0.12 },
                { label: 'Form Drop', inquiry: 'Lip filler consult', icon: <FileText size={14} />, delay: 0.24 },
                { label: '11 PM IG DM', inquiry: 'RF Microneedling', icon: <MessageSquare size={14} />, delay: 0.36 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: item.delay, ease: luxuryEase }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2.5 rounded-xl border border-sand-deep bg-white/90 p-2.5 shadow-[0_2px_8px_rgba(85,62,41,0.02)] cursor-default"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b9825f]/8 text-clay">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[8px] font-semibold text-clay uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-[11px] font-semibold text-espresso truncate">
                      {item.inquiry}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── CENTER: Scrutexity Layer ── */}
            <div className="flex items-center justify-center h-full pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center justify-center w-[180px] rounded-2xl
                           border-2 border-[#7f8f78] bg-cream p-4
                           shadow-[0_8px_32px_rgba(127,143,120,0.14),inset_0_1px_0_rgba(255,255,255,0.8)]
                           cursor-default transition-shadow duration-700
                           hover:shadow-[0_14px_40px_rgba(127,143,120,0.20),inset_0_1px_0_rgba(255,255,255,0.8)]"
              >
                {/* Shield — gentle breathing pulse */}
                <motion.div
                  animate={reducedMotion ? {} : { scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                  className="flex h-10 w-10 items-center justify-center rounded-full
                             bg-[#7f8f78] text-white mb-2 shadow-sm"
                >
                  <Shield size={18} />
                </motion.div>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-espresso">
                  Scrutexity Layer
                </h4>
                <p className="text-[9px] font-mono text-[#7f8f78] mt-1 uppercase font-semibold">
                  Missed-Demand Recovery
                </p>

                <div className="mt-3 flex items-center gap-1.5 rounded-full bg-[#eef3ea] border border-[#7f8f78]/20 px-2 py-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    {!reducedMotion && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7f8f78] opacity-45" />
                    )}
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7f8f78]" />
                  </span>
                  <span className="font-mono text-[8px] font-bold text-[#7f8f78] uppercase tracking-wider">
                    Active Capture
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Confirmed Outcomes ── */}
            <div className="flex flex-col justify-between h-full w-[195px] pointer-events-auto gap-3">
              {/* Boulevard Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.42, ease: luxuryEase }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 rounded-xl border border-sand-deep bg-white/90 p-2.5 shadow-[0_2px_8px_rgba(85,62,41,0.02)] cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(127,143,120,0.10),transparent_65%)]" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#7f8f78]/10 text-[#7f8f78]">
                  <Calendar size={14} />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="font-mono text-[8px] font-semibold text-[#7f8f78] uppercase tracking-wider">
                    Boulevard EMR
                  </p>
                  <p className="text-[11px] font-semibold text-espresso flex items-center gap-1">
                    Booked
                    <motion.span
                      animate={
                        isInView && !reducedMotion
                          ? { scale: [0, 1.15, 1], opacity: [0, 1, 1] }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.55, delay: 0.7, ease: luxuryEase }}
                    >
                      <Check size={11} className="text-[#7f8f78] stroke-[3]" />
                    </motion.span>
                  </p>
                </div>
              </motion.div>

              {/* Audit Ledger — second outcome */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.58, ease: luxuryEase }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5 rounded-xl border border-sand-deep bg-white/90 p-2.5 shadow-[0_2px_8px_rgba(85,62,41,0.02)] cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(127,143,120,0.10),transparent_65%)]" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#7f8f78]/10 text-[#7f8f78]">
                  <Lock size={14} />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="font-mono text-[8px] font-semibold text-[#7f8f78] uppercase tracking-wider">
                    Audit Ledger
                  </p>
                  <p className="text-[11px] font-semibold text-espresso flex items-center gap-1">
                    Deposit Paid
                    <motion.span
                      animate={
                        isInView && !reducedMotion
                          ? { scale: [0, 1.15, 1], opacity: [0, 1, 1] }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.55, delay: 0.85, ease: luxuryEase }}
                    >
                      <Check size={11} className="text-[#7f8f78] stroke-[3]" />
                    </motion.span>
                  </p>
                </div>
              </motion.div>

              {/* Deposits Verified chip — spring scale reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  delay: 0.85,
                }}
                className="flex items-center justify-center gap-1.5 rounded-full
                           bg-[#eef3ea]/80 border border-[#7f8f78]/25
                           px-3 py-1.5 mt-auto self-end
                           shadow-[0_2px_12px_rgba(127,143,120,0.06)]"
              >
                <span className="font-mono text-[9px] font-bold text-[#7f8f78] uppercase tracking-wider">
                  Deposits Verified
                </span>
                <Check size={10} className="text-[#7f8f78] stroke-[3]" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-3 text-center">
          <p className="text-[10px] font-mono text-[#c4b4a0]">
            Illustrative flow: read-only PMS APIs surface leaks to a SHA-256 logged administrative ledger.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
