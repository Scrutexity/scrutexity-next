"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { playSketchSound } from '@/lib/sketch-utils';

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = {
  num: string;
  frontTitle: string;
  frontBody: string;
  backTitle: string;
  backBody: string;
  backBadge: string;
};

const steps: Step[] = [
  {
    num: '01',
    frontTitle: 'Scoped implementation review',
    frontBody: 'Where enabled, approved access can be scoped to review scheduling and follow-up patterns without changing your operational system.',
    backTitle: 'Zero Friction Connection',
    backBody: 'Connects with zero-write permissions. No code, no migration, no staff training.',
    backBadge: 'SCOPE-DEPENDENT · AGREEMENT-BASED',
  },
  {
    num: '02',
    frontTitle: 'Continuous governance (Modeled)',
    frontBody: 'Designed to observe transactional metadata securely.',
    backTitle: 'Data Sanitization Spec',
    backBody: 'Modeled pipeline showing how patient data is protected at the boundary and logged.',
    backBadge: 'DESIGN SPEC · MODELED',
  },
  {
    num: '03',
    frontTitle: 'Licensed-staff handoff',
    frontBody: 'Missed inquiries are routed to your staff. Operational actions are manual-first.',
    backTitle: 'Designed Booking Sync',
    backBody: 'Modeled representation of secure booking sync. Standard integration uses manual CSV/calendar handoff.',
    backBadge: 'MODELED · ROADMAP',
  },
];

// Single Swivel Card with Magnetic Hover Physics & Specular Lighting
function SwivelCard({ step, index, active }: { step: Step; index: number; active: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const reduced = useReducedMotion();

  // Framer Motion Values for Magnetic Hover
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for tilt (max 3 degrees rotation)
  const rotateX = useSpring(useTransform(y, [0, 1], [3, -3]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-3, 3]), { stiffness: 400, damping: 30 });

  // Calculate mouse position inside card boundaries
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  // Reset springs when cursor leaves
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // Play flip sound and toggle state
  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
    try {
      playSketchSound('page');
    } catch {
      // safe fail
    }
  };

  // Border gradient based on flip state
  const borderGradient = isFlipped
    ? "linear-gradient(135deg, rgba(94,122,90,0.65) 0%, rgba(217,204,176,0.15) 100%)"
    : "linear-gradient(135deg, rgba(183,137,107,0.4) 0%, rgba(217,204,176,0.1) 100%)";

  return (
    <div 
      className="relative w-full h-[295px] select-none" 
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Magnetic Hover Wrapper */}
      <motion.div
        className="w-full h-full relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        
        {/* 3D Swivel Wrapper */}
        <motion.div
          className="w-full h-full relative cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          onClick={handleFlip}
        >
          
          {/* FRONT FACE (VALUE STATE) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <div 
              className="relative p-[1.5px] rounded-2xl overflow-hidden h-full w-full transition-all duration-500 shadow-[0_12px_40px_-14px_rgba(28,24,20,0.08)] hover:shadow-[0_16px_48px_-12px_rgba(28,24,20,0.12)]"
              style={{ background: borderGradient }}
            >
              {/* ring-inset & ring-white/45 creates a premium specular glass bevel edge */}
              <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[15px] h-full w-full shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85)] ring-1 ring-inset ring-white/45 flex flex-col justify-between items-center text-center">
                
                {/* Step number */}
                <div className="w-[2.75rem] h-[2.75rem] rounded-full bg-cream border border-sand-deep/45 flex items-center justify-center font-mono text-xs font-bold text-sage-deep shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  {step.num}
                </div>

                {/* Title & Body */}
                <div className="flex flex-col items-center">
                  <h3 className="font-display text-xl text-ink tracking-tight font-normal">
                    {step.frontTitle}
                  </h3>
                  <p className="mt-2.5 text-xs text-mist leading-[1.6] max-w-xs font-sans">
                    {step.frontBody}
                  </p>
                </div>

                {/* Highly Legible Pill Trigger with wider tracking and extra contrast */}
                <button 
                  onClick={handleFlip}
                  className="rounded-full bg-ink/5 hover:bg-ink/10 text-ink/85 hover:text-ink px-5 py-2 text-[9px] font-extrabold tracking-[0.18em] font-sans uppercase transition-all duration-300 flex items-center gap-1 border border-ink/10 shadow-sm"
                >
                  Technical Spec →
                </button>
                
              </div>
            </div>
          </div>

          {/* BACK FACE (MECHANICS & PROOF STATE) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)" 
            }}
          >
            <div 
              className="relative p-[1.5px] rounded-2xl overflow-hidden h-full w-full transition-all duration-500 shadow-[0_12px_40px_-14px_rgba(28,24,20,0.08)]"
              style={{ background: borderGradient }}
            >
              <div className="bg-white/45 backdrop-blur-xl p-5 rounded-[15px] h-full w-full shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85)] ring-1 ring-inset ring-white/45 flex flex-col justify-between items-center text-center relative">
                
                {/* Radial Success glow on the back */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage/8 via-transparent to-transparent -z-10 rounded-[15px]" />

                {/* Step number (in green/sage tone) */}
                <div className="w-[2rem] h-[2rem] rounded-full bg-cream border border-sage/35 flex items-center justify-center font-mono text-[10px] font-bold text-sage-deep shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  {step.num}
                </div>

                {/* Title & Body */}
                <div className="flex flex-col items-center w-full">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink font-bold">
                    {step.backTitle}
                  </h4>
                  <p className="mt-1 text-[10px] text-mist leading-[1.3] max-w-xs font-sans">
                    {step.backBody}
                  </p>
                </div>

                {/* Micro-Artifact Component */}
                {step.num === '01' && (
                  <div className="w-full bg-ink/5 rounded p-2 text-left font-mono text-[8px] leading-tight text-mist/90 border border-sand-deep/15">
                    <div className="text-[7.5px] text-sage-deep font-bold mb-0.5">● CONNECTION LOGS</div>
                    <div className="opacity-70">GET /v1/auth/scopes &rarr; <span className="text-sage-deep font-bold">200 OK</span></div>
                    <div className="opacity-70">[SCOPES] appointments:read, logs:read</div>
                    <div className="opacity-70">[POLICY] write_access: <span className="text-clay font-bold">DISABLED</span></div>
                  </div>
                )}

                {step.num === '02' && (
                  <div className="w-full bg-ink/5 rounded p-2 text-left font-mono text-[8px] leading-tight text-mist/90 border border-sand-deep/15">
                    <div className="text-[7.5px] text-sage-deep font-bold mb-0.5">● PHI SANITIZATION</div>
                    <div className="opacity-70">{"{"}</div>
                    <div className="opacity-70">&nbsp;&nbsp;"id": "inq_9f28a", "phi": <span className="text-sage-deep font-bold">"[STRIPPED]"</span>,</div>
                    <div className="opacity-70">&nbsp;&nbsp;"meta": {"{"} "source": "boulevard", "delay_min": 45 {"}"}</div>
                    <div className="opacity-70">{"}"}</div>
                  </div>
                )}

                {step.num === '03' && (
                  <div className="w-full bg-ink/5 rounded p-2 text-left font-mono text-[8px] leading-tight text-mist/90 border border-sand-deep/15">
                    <div className="text-[7.5px] text-sage-deep font-bold mb-0.5">● CLOSED-LOOP SETTLEMENT</div>
                    <div className="opacity-70">POST /pms/deposits &rarr; <span className="text-sage-deep font-bold">200 OK</span></div>
                    <div className="opacity-70">deposit: $150.00 &middot; status: verified</div>
                    <div className="opacity-70">ledger_seal: block_89427_success</div>
                  </div>
                )}

                {/* Metadata badge pill */}
                <div className="mt-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-sage-deep bg-sage/12 border border-sage/20 px-3 py-0.5 rounded-full font-extrabold">
                    {step.backBadge}
                  </span>
                </div>

                {/* Rounded-full Return Pill */}
                <button 
                  onClick={handleFlip}
                  className="rounded-full bg-sage/10 hover:bg-sage/18 text-sage-deep px-4 py-1.5 text-[8.5px] font-extrabold tracking-[0.18em] font-sans uppercase transition-all duration-300 flex items-center gap-1 border border-sage/20 shadow-sm"
                >
                  &larr; Value Prop
                </button>
                
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

/* ==========================================
   MAIN HOW IT WORKS SECTION
   ========================================== */
export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(reduced);

  useEffect(() => {
    if (!isInView || reduced) { setActive(reduced ? true : false); return; }
    const t = setTimeout(() => setActive(true), 150);
    return () => clearTimeout(t);
  }, [isInView, reduced]);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 md:py-32 relative z-10 bg-cream border-t border-sand-deep/15"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl mb-16"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep block mb-4">
            Implementation
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink">
            Zero friction.{' '}
            <span className="italic text-sage-deep">One pipeline.</span>
          </h2>
          <p className="mt-5 font-sans text-mist text-base leading-[1.55] max-w-lg">
            We hand-install the layer. Your daily operational workflows remain
            exactly the same.
          </p>
        </motion.div>

        {/* 3D Swivel Grid & Connector Track */}
        <div className="relative w-full">
          
          {/* Dynamic SVG pipeline connector track (desktop only) */}
          <svg className="hidden lg:block absolute top-[2.75rem] left-0 w-full h-[20px] overflow-visible -z-10" viewBox="0 0 1000 20" fill="none">
            <defs>
              <linearGradient id="pipelinePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8FA98A" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#5E7A5A" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#8FA98A" stopOpacity="1" />
                <stop offset="70%" stopColor="#5E7A5A" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8FA98A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Base pipeline hairline track */}
            <path d="M 166 10 L 834 10" stroke="#D9CCB0" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
            
            {/* Pulsing light gradient overlay */}
            {active && !reduced && (
              <motion.path
                d="M 166 10 L 834 10"
                stroke="url(#pipelinePulse)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="80 120"
                animate={{ strokeDashoffset: [-200, 200] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </svg>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                <SwivelCard step={step} index={i} active={active} />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
