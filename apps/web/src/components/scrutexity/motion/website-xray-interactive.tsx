"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, CheckCircle2 } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const CLAIMS = [
  {
    id: 1,
    tag: "BIOLOGICAL MECHANISM",
    observed: "Clinically proven to reverse cellular aging in 14 days.",
    status: "SUPPORT INCOMPLETE",
    statusType: "amber",
    support: "No peer-reviewed clinical study or NCT registration link present.",
    gap: "FTC Section 5 vector: Unsubstantiated biological mechanism and timeframe claim.",
    rewrite: "Formulated with cellular nutrients observed to support skin hydration and metabolic resilience.",
  },
  {
    id: 2,
    tag: "FINANCIAL ROI GUARANTEE",
    observed: "100% safe & guaranteed 5x return on investment.",
    status: "EXPOSURE HIGH",
    statusType: "red",
    support: "No disclaimers or baseline sample methodology cited.",
    gap: "FTC Business Opportunity & Section 5 vector: Deceptive absolute outcome promise.",
    rewrite: "Case study participants experienced measurable operational yield improvements based on historical clinic data.",
  },
  {
    id: 3,
    tag: "REGULATORY APPROVAL",
    observed: "FDA-Approved GLP-1 compounding protocol.",
    status: "REGULATORY MISMATCH",
    statusType: "red",
    support: "Compounded formulations are not individually FDA-approved.",
    gap: "FDA Section 503A vector: Misrepresenting compounding regulatory status as FDA approval.",
    rewrite: "Custom compounded GLP-1 formulations prepared in compliance with FDA 503A pharmacy standards.",
  },
];

export function WebsiteXRayInteractive() {
  const [selectedClaimId, setSelectedClaimId] = useState(1);
  const [scanned, setScanned] = useState(false);
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax reactive motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-60, 60]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-60, 60]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const selected = CLAIMS.find((c) => c.id === selectedClaimId) || CLAIMS[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-mono uppercase tracking-[0.16em] text-bureau-sage inline-flex items-center gap-1.5 mb-2"
          style={{ fontFamily: MONO }}
        >
          <Sparkles className="w-3.5 h-3.5 text-bureau-sage" /> Main Conversion Artifact // Website X-Ray
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl text-ink font-normal"
        >
          See what answer systems and regulators extract from your URL.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-sm text-muted"
        >
          Select any highlighted claim in the browser simulation to inspect its evidence support, regulatory gap, and safer rewrite.
        </motion.p>
      </div>

      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="grid lg:grid-cols-12 gap-8 items-start relative isolate"
      >
        {/* Cursor Glow backdrop */}
        <motion.div
          aria-hidden
          style={reduced ? undefined : { x: glowX, y: glowY }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bureau-sage/10 blur-[100px]"
        />

        {/* Left: Realistic Browser Frame */}
        <div className="lg:col-span-7 bg-paper-light/90 backdrop-blur-md border border-hairline shadow-2xl rounded-2xl overflow-hidden relative transition-all duration-300 hover:border-bureau-sage/40">
          {/* Browser Address Bar */}
          <div className="bg-paper border-b border-hairline px-4 py-3 flex items-center justify-between text-xs font-mono text-muted" style={{ fontFamily: MONO }}>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand-deep/80" />
            </div>
            <div className="bg-paper-light border border-hairline px-3 py-1 rounded-full text-[11px] text-ink truncate max-w-xs flex items-center gap-1.5">
              <Terminal size={11} className="text-bureau-sage" />
              https://vitalitymedspa.com/landing
            </div>
            <span className="text-[10px] font-semibold text-bureau-sage tracking-wider px-2 py-0.5 rounded bg-bureau-sage/10 border border-bureau-sage/30">
              LIVE SCAN
            </span>
          </div>

          {/* Page Content Simulation */}
          <div className="p-6 sm:p-8 space-y-6 relative min-h-[380px]">
            {/* Single Scan Line Pass */}
            {!reduced && !scanned && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                onAnimationComplete={() => setScanned(true)}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bureau-sage to-transparent z-20 pointer-events-none opacity-80 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
              />
            )}

            <div className="border-b border-hairline pb-4">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
                VITALITY CLINICAL WELLNESS // AESTHETICS &amp; LONGEVITY
              </span>
              <h3 className="font-display text-2xl text-ink mt-1">
                Advanced Regenerative Therapies
              </h3>
            </div>

            {/* Simulated Page Text with Interactive Claim Highlights */}
            <div className="space-y-4 text-sm text-ink leading-relaxed">
              <p>
                Our flagship longevity protocol delivers deep biological transformation.{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(1)}
                  className={`text-left transition-all px-2 py-1 rounded-md border text-xs sm:text-sm inline-block ${
                    selectedClaimId === 1
                      ? "bg-amber-bg border-review-amber text-review-amber font-medium shadow-[0_0_12px_rgba(245,166,35,0.25)] scale-[1.01]"
                      : "bg-paper border-hairline text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;Clinically proven to reverse cellular aging in 14 days.&rdquo;
                  <span className="ml-1.5 text-[9px] font-mono text-review-amber uppercase font-semibold" style={{ fontFamily: MONO }}>[CLAIM #01]</span>
                </button>
              </p>

              <p>
                Partner clinics experience unmatched commercial performance with our turnkey system.{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(2)}
                  className={`text-left transition-all px-2 py-1 rounded-md border text-xs sm:text-sm inline-block ${
                    selectedClaimId === 2
                      ? "bg-exposure-red/10 border-exposure-red text-exposure-red font-medium shadow-[0_0_12px_rgba(255,77,77,0.25)] scale-[1.01]"
                      : "bg-paper border-hairline text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;100% safe &amp; guaranteed 5x return on investment.&rdquo;
                  <span className="ml-1.5 text-[9px] font-mono text-exposure-red uppercase font-semibold" style={{ fontFamily: MONO }}>[CLAIM #02]</span>
                </button>
              </p>

              <p>
                All patient treatments utilize our proprietary{" "}
                <button
                  type="button"
                  onClick={() => setSelectedClaimId(3)}
                  className={`text-left transition-all px-2 py-1 rounded-md border text-xs sm:text-sm inline-block ${
                    selectedClaimId === 3
                      ? "bg-exposure-red/10 border-exposure-red text-exposure-red font-medium shadow-[0_0_12px_rgba(255,77,77,0.25)] scale-[1.01]"
                      : "bg-paper border-hairline text-ink hover:border-muted"
                  }`}
                >
                  &ldquo;FDA-Approved GLP-1 compounding protocol.&rdquo;
                  <span className="ml-1.5 text-[9px] font-mono text-exposure-red uppercase font-semibold" style={{ fontFamily: MONO }}>[CLAIM #03]</span>
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Evidence Inspector Side Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-paper/95 backdrop-blur-md border border-hairline p-6 sm:p-7 shadow-2xl rounded-2xl space-y-5"
          >
            <div className="flex justify-between items-center pb-3 border-b border-hairline text-[10px] font-mono uppercase text-muted" style={{ fontFamily: MONO }}>
              <span>EVIDENCE INSPECTOR // CLAIM #{selected.id}</span>
              <span className="text-bureau-sage font-semibold tracking-wider">{selected.tag}</span>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted mb-1.5" style={{ fontFamily: MONO }}>
                Observed Copy
              </div>
              <p className="text-sm font-normal text-ink bg-paper-light p-3.5 rounded-xl border border-hairline">
                &ldquo;{selected.observed}&rdquo;
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted" style={{ fontFamily: MONO }}>
                  Support &amp; Evidence Gap
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border uppercase font-semibold ${
                    selected.statusType === "red"
                      ? "border-exposure-red/30 bg-exposure-red/10 text-exposure-red"
                      : "border-review-amber/30 bg-amber-bg text-review-amber"
                  }`}
                  style={{ fontFamily: MONO }}
                >
                  {selected.status}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed p-3.5 rounded-xl border border-hairline bg-paper-light">
                {selected.gap}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-bureau-sage mb-1.5 flex items-center gap-1.5" style={{ fontFamily: MONO }}>
                <CheckCircle2 size={12} className="text-bureau-sage" /> Safer Institutional Rewrite
              </div>
              <p className="text-xs text-ink leading-relaxed p-3.5 rounded-xl border border-bureau-sage/40 bg-bureau-sage/5">
                &ldquo;{selected.rewrite}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-hairline">
              <Link
                href="/snapshot"
                className="w-full group inline-flex items-center justify-center gap-2 bg-accent text-on-accent py-3 px-6 rounded-full text-xs font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all duration-300 shadow-md"
              >
                X-Ray My Page <ArrowRight size={14} className="btn-arrow" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default WebsiteXRayInteractive;
