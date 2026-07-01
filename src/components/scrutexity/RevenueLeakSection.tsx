"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { playSketchSound } from '@/lib/sketch-utils';
import { Lock, Phone, MessageSquare, Clock, ShieldAlert, Sparkles, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

// Animated number counter with customized 1.5s ease-out-cubic count logic
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1500 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    let animationFrameId: number;

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.round(start + (end - start) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <>{prefix}{displayValue.toLocaleString('en-US')}{suffix}</>;
}

// Particle design: Data packet styling with soft radial blur filter
function MovingParticle({ path, color, delay = 0, duration = 1.6 }: { path: string, color: string, delay?: number, duration?: number }) {
  return (
    <circle r="4" fill={color} filter="url(#packetGlow)">
      <animateMotion
        path={path}
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

// 2026 frosted glass container with specular internal highlights and outer gradient borders
function GlassCard({ 
  children, 
  isActive, 
  isSuccess, 
  className = "" 
}: { 
  children: React.ReactNode; 
  isActive?: boolean; 
  isSuccess?: boolean; 
  className?: string; 
}) {
  // Border gradient based on toggle state
  const borderGradient = isSuccess && isActive
    ? "linear-gradient(135deg, rgba(94,122,90,0.65) 0%, rgba(217,204,176,0.15) 100%)"
    : !isSuccess && !isActive
    ? "linear-gradient(135deg, rgba(183,137,107,0.65) 0%, rgba(217,204,176,0.15) 100%)"
    : "linear-gradient(135deg, rgba(28,24,20,0.18) 0%, rgba(28,24,20,0.04) 100%)";

  return (
    <div 
      className={`relative p-[1px] rounded-2xl overflow-hidden transition-all duration-700 h-full w-full ${className}`}
      style={{ background: borderGradient }}
    >
      <div 
        className="relative bg-white/40 backdrop-blur-xl p-5 rounded-[15px] h-full w-full shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85)] flex flex-col justify-between overflow-hidden"
      >
        {/* Ambient radial glow for active success state */}
        {isSuccess && isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-sage/12 via-transparent to-transparent -z-10 pointer-events-none rounded-[15px]"
          />
        )}
        {children}
      </div>
    </div>
  );
}

type SegmentData = {
  inquiries: number;
  afterHours: number;
  unanswered: number;
  staleLead: number;
  exposure: number;
  baselineYield: number;
  scrutexityYield: number;
  recoveryAmount: number;
};

const SEGMENTS: Record<'single' | 'multi' | 'pe', SegmentData> = {
  single: {
    inquiries: 60,
    afterHours: 4725,
    unanswered: 9450,
    staleLead: 2625,
    exposure: 16800,
    baselineYield: 6750,
    scrutexityYield: 13230,
    recoveryAmount: 6480,
  },
  multi: {
    inquiries: 180,
    afterHours: 14175,
    unanswered: 28350,
    staleLead: 7875,
    exposure: 50400,
    baselineYield: 20250,
    scrutexityYield: 39690,
    recoveryAmount: 19440,
  },
  pe: {
    inquiries: 900,
    afterHours: 70875,
    unanswered: 141750,
    staleLead: 39375,
    exposure: 252000,
    baselineYield: 101250,
    scrutexityYield: 198450,
    recoveryAmount: 97200,
  }
};

const formatCost = (val: number) => `$${val.toLocaleString('en-US')}`;

const formatCostMobile = (val: number) => {
  if (val >= 1000) {
    return `$${(val / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `$${val}`;
};

/* ==========================================
   DESKTOP HORIZONTAL PIPELINE (PERCENTAGE-PORT CORRESPONDENCE)
   ========================================== */
function DesktopPipeline({ isActive, data }: { isActive: boolean; data: SegmentData }) {
  return (
    <div className="relative w-full aspect-[1000/400] min-h-[400px]">
      
      {/* BACKGROUND SVG & NEON GLOW CHANNELS */}
      <svg className="absolute inset-0 w-full h-full overflow-visible z-0" viewBox="0 0 1000 400" fill="none">
        <defs>
          {/* Blueprint etched background grid */}
          <pattern id="desktop-overhaul-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#D9CCB0" strokeWidth="0.4" opacity="0.3" />
          </pattern>
          
          {/* Fiber-Optic Neon Glow filter for active pathways */}
          <filter id="fiberOpticGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feComponentTransfer in="blur2" result="glow">
              <feFuncA type="linear" slope="0.75" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="blur1" opacity="0.95" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Packet Glow filter for data packets */}
          <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComponentTransfer in="blur" result="boost">
              <feFuncA type="linear" slope="3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="boost" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="400" fill="url(#desktop-overhaul-grid)" rx="24" />

        {/* Main Trunk Input Line - connects from Left Port (240, 200) to Junction Node (450, 200) */}
        <path d="M 240 200 L 450 200" stroke="#1C1814" strokeWidth="3.5" opacity="0.12" strokeLinecap="round" />
        
        {/* Upper Leaky Paths - Curving from Junction Node (450, 200) to Gaps Ports (740, 100 / 145 / 190) */}
        <path 
          d="M 450 200 C 530 200, 620 90, 740 90" 
          stroke={isActive ? "#D9CCB0" : "#B7896B"} 
          strokeWidth={isActive ? "1.5" : "3.5"} 
          strokeDasharray={isActive ? "4 4" : "0"} 
          className="transition-all duration-700" 
        />
        <path 
          d="M 450 200 C 530 200, 620 145, 740 145" 
          stroke={isActive ? "#D9CCB0" : "#B7896B"} 
          strokeWidth={isActive ? "1.5" : "3.5"} 
          strokeDasharray={isActive ? "4 4" : "0"} 
          className="transition-all duration-700" 
        />
        <path 
          d="M 450 200 C 530 200, 620 200, 740 200" 
          stroke={isActive ? "#D9CCB0" : "#B7896B"} 
          strokeWidth={isActive ? "1.5" : "3.5"} 
          strokeDasharray={isActive ? "4 4" : "0"} 
          className="transition-all duration-700" 
        />

        {/* Lower Deposit Path - curves from Junction (450, 200) to PMS Deposit Port (740, 310) */}
        <motion.path 
          d="M 450 200 C 530 200, 620 310, 740 310" 
          stroke={isActive ? "#5E7A5A" : "#1C1814"} 
          strokeWidth={isActive ? "5.5" : "2"}
          opacity={isActive ? 1 : 0.3}
          className="transition-all duration-700"
          style={{ filter: isActive ? "url(#fiberOpticGlow)" : undefined }}
          strokeLinecap="round"
        />

        {/* Junction Shield Node */}
        <motion.circle 
          cx="450" cy="200" r={isActive ? 16 : 10}
          fill={isActive ? "#5E7A5A" : "#B7896B"}
          className="transition-all duration-500 shadow-lg cursor-pointer"
        />

        {/* Junction Lock Icon */}
        {isActive && (
          <motion.path
            d="M 147 151 L 153 151 L 153 148 C 153 146.4 151.7 145.1 150 145.1 C 148.3 145.1 147 146.4 147 148 Z M 145.5 151 L 154.5 151 L 154.5 155.5 L 145.5 155.5 Z"
            fill="#F8F3EA"
            transform="translate(300, 48.5) scale(1)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, delay: 0.15 }}
          />
        )}

        {/* Glowing Data Packet Particles */}
        {!isActive ? (
          <>
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 90, 740 90" color="#B7896B" delay={0} />
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 145, 740 145" color="#B7896B" delay={0.4} />
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 200, 740 200" color="#B7896B" delay={0.8} />
          </>
        ) : (
          <>
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 310, 740 310" color="#8FA98A" delay={0} duration={1.2} />
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 310, 740 310" color="#8FA98A" delay={0.4} duration={1.2} />
            <MovingParticle path="M 240 200 L 450 200 C 530 200, 620 310, 740 310" color="#8FA98A" delay={0.8} duration={1.2} />
          </>
        )}
      </svg>

      {/* LEFT CARD: INBOUND (x coords: 0% to 24%, center port at 240, 200) */}
      <div className="absolute left-0 top-[31.25%] w-[24%] h-[37.5%] z-10">
        <GlassCard>
          <div className="flex flex-col h-full justify-between">
            <div>
              <span className="font-mono text-[9px] text-mist/60 block uppercase tracking-widest">
                Source Channel
              </span>
              <h3 className="font-sans font-bold text-base text-ink mt-1">
                Inbound Demand
              </h3>
              <p className="text-[11px] leading-relaxed text-mist mt-1.5">
                High-intent patient requests arriving via Boulevard, Zenoti, web forms.
              </p>
            </div>
            <div className="pt-2 border-t border-sand-deep/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-mist/70">{data.inquiries} Inquiries / Mo</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* TOP-RIGHT CARD: LEAKAGE BREAKDOWN (x coords: 74% to 100%, center port at 740, 100) */}
      <div className="absolute right-0 top-[5%] w-[26%] h-[40%] z-10">
        <GlassCard isActive={isActive} isSuccess={false}>
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-wider text-mist">
                Administrative Gaps
              </span>
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.span 
                    key="desktop-secured"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[8px] bg-sage/20 text-sage-deep px-2 py-0.5 rounded-full font-sans font-semibold flex items-center gap-0.5 border border-sage/20"
                  >
                    Secured
                  </motion.span>
                ) : (
                  <motion.span 
                    key="desktop-leaking"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[8px] bg-clay/15 text-clay-deep px-2 py-0.5 rounded-full font-sans font-semibold flex items-center gap-0.5 border border-clay/20"
                  >
                    Leaking
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            
            <ul className="space-y-1.5 text-left text-xs font-sans text-ink mt-2">
              <li className="flex justify-between items-center opacity-90 text-[11px]">
                <span className="flex items-center gap-1 text-mist">
                  <Phone size={10} className="text-clay/50" /> After-Hours Calls
                </span> 
                <span className="font-mono font-semibold">{formatCost(data.afterHours)}/mo</span>
              </li>
              <li className="flex justify-between items-center opacity-90 text-[11px]">
                <span className="flex items-center gap-1 text-mist">
                  <MessageSquare size={10} className="text-clay/50" /> Unanswered Web/DMs
                </span> 
                <span className="font-mono font-semibold">{formatCost(data.unanswered)}/mo</span>
              </li>
              <li className="flex justify-between items-center opacity-90 text-[11px]">
                <span className="flex items-center gap-1 text-mist">
                  <Clock size={10} className="text-clay/50" /> Stale Lead Window
                </span> 
                <span className="font-mono font-semibold">{formatCost(data.staleLead)}/mo</span>
              </li>
            </ul>
            
            <div className="pt-2 border-t border-sand-deep/20 flex justify-between items-center mt-2">
              <span className="text-[9px] font-bold text-mist uppercase tracking-wide">Exposure:</span>
              <span className={`font-mono text-xs font-extrabold transition-all duration-700 ${isActive ? 'line-through opacity-30 text-mist' : 'text-clay-deep'}`}>
                {formatCost(data.exposure)}/mo
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* BOTTOM-RIGHT CARD: DEPOSITS (x coords: 74% to 100%, center port at 740, 310) */}
      <div className="absolute right-0 bottom-[5%] w-[26%] h-[35%] z-10">
        <GlassCard isActive={isActive} isSuccess={true}>
          <div className="flex flex-col h-full justify-between">
            <h3 className="font-sans font-bold text-xs text-ink flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-wider text-mist block">
                Practice Yield
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-sage-deep text-cream text-[9px] font-bold"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </h3>
            
            <div className="mt-1">
              <span className="text-2xl font-mono font-extrabold text-ink tracking-tight">
                <AnimatedCounter value={isActive ? data.scrutexityYield : data.baselineYield} prefix="$" suffix="/mo" />
              </span>
            </div>

            <div className="mt-1.5 min-h-[20px]">
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div 
                    key="yield-badge"
                    initial={{ scale: 0.92, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[9px] bg-sage/20 text-sage-deep font-mono px-2 py-0.5 rounded border border-sage/25 inline-flex items-center gap-0.5 font-bold"
                  >
                    <Sparkles size={8} /> +{formatCost(data.recoveryAmount)}/mo Recovery
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-yield"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-mist/60 font-sans"
                  >
                    Baseline capture model.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}

/* ==========================================
   MOBILE VERTICAL STACKED PIPELINE (COORDINATE MAPPING)
   ========================================== */
function MobilePipeline({ isActive, data }: { isActive: boolean; data: SegmentData }) {
  return (
    <div className="relative w-full aspect-[400/550] max-w-[380px] mx-auto">
      
      {/* MOBILE SVG CANVAS & FILTERS */}
      <svg className="absolute inset-0 w-full h-full overflow-visible z-0" viewBox="0 0 400 550" fill="none">
        <defs>
          <pattern id="mobile-overhaul-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D9CCB0" strokeWidth="0.4" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="400" height="550" fill="url(#mobile-overhaul-grid)" rx="16" />

        {/* Main vertical path - Top center (200, 99) to Bottom center (200, 440) */}
        <path d="M 200 99 L 200 270" stroke="#1C1814" strokeWidth="2.5" opacity="0.12" />
        
        {/* Leaky branch curves to the left into Gaps card port (180, 270) */}
        <path 
          d="M 200 270 L 180 270" 
          stroke={isActive ? "#D9CCB0" : "#B7896B"} 
          strokeWidth="3.5" 
          strokeDasharray={isActive ? "3 3" : "0"} 
          className="transition-all duration-700"
        />
        
        {/* Recovery path straight down to PMS Deposits port (200, 440) */}
        <path 
          d="M 200 270 L 200 440" 
          stroke={isActive ? "#5E7A5A" : "#1C1814"} 
          strokeWidth={isActive ? "4.5" : "2"} 
          opacity={isActive ? 1 : 0.3} 
          className="transition-all duration-700"
          style={{ filter: isActive ? "url(#fiberOpticGlow)" : undefined }}
        />
        
        <circle cx="200" cy="270" r="7" fill={isActive ? "#5E7A5A" : "#B7896B"} className="transition-all duration-500" />

        {/* Mobile Path Animations */}
        {!isActive ? (
          <MovingParticle path="M 200 99 L 200 270 L 180 270" color="#B7896B" delay={0} />
        ) : (
          <>
            <MovingParticle path="M 200 99 L 200 440" color="#8FA98A" delay={0} duration={1.1} />
            <MovingParticle path="M 200 99 L 200 440" color="#8FA98A" delay={0.5} duration={1.1} />
          </>
        )}
      </svg>

      {/* TOP CARD: INBOUND (y coords: 0% to 18%, bottom port at 200, 99) */}
      <div className="absolute left-[15%] top-0 w-[70%] h-[18%] z-10">
        <GlassCard>
          <div className="flex flex-col h-full justify-between">
            <div>
              <span className="font-mono text-[8px] text-mist/60 block uppercase tracking-widest">Source</span>
              <h3 className="font-sans font-bold text-sm text-ink mt-0.5">Inbound Demand</h3>
            </div>
            <span className="text-[8px] font-mono uppercase tracking-wider text-mist/70 block mt-1">{data.inquiries} Inquiries/mo</span>
          </div>
        </GlassCard>
      </div>

      {/* MIDDLE-LEFT CARD: GAPS (y coords: 36.36% to 61.81%, right port at 180, 270) */}
      <div className="absolute left-0 top-[36.36%] w-[50%] h-[25.45%] z-10">
        <GlassCard isActive={isActive} isSuccess={false}>
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-mist">Gaps</span>
              {isActive ? (
                <span className="text-[8px] bg-sage/20 text-sage-deep px-1.5 py-0.5 rounded-full font-sans font-bold flex items-center gap-0.5 border border-sage/20">
                  <Lock size={8} /> Saved
                </span>
              ) : (
                <span className="text-[8px] bg-clay/15 text-clay-deep px-1.5 py-0.5 rounded-full font-sans font-bold flex items-center gap-0.5 border border-clay/20">
                  <ShieldAlert size={8} /> Lost
                </span>
              )}
            </div>
            <div className="space-y-1 text-left text-[10px] text-ink">
              <div className="flex justify-between">
                <span className="text-mist">After-Hours</span>
                <span className="font-mono font-medium">{formatCostMobile(data.afterHours)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Web Forms</span>
                <span className="font-mono font-medium">{formatCostMobile(data.unanswered)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Delay</span>
                <span className="font-mono font-medium">{formatCostMobile(data.staleLead)}</span>
              </div>
            </div>
            <hr className="my-1.5 border-sand-deep/20" />
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-mist text-[8px]">Exposure</span>
              <span className={`font-mono ${isActive ? 'line-through opacity-30 text-mist' : 'text-clay-deep'}`}>
                {formatCostMobile(data.exposure)}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* BOTTOM CARD: DEPOSITS (y coords: 80% to 100%, top port at 200, 440) */}
      <div className="absolute left-[15%] bottom-0 w-[70%] h-[20%] z-10">
        <GlassCard isActive={isActive} isSuccess={true}>
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] text-mist/60 block uppercase tracking-wider">PMS Deposits</span>
              {isActive && <span className="text-sage-deep text-xs">✓</span>}
            </div>
            <span className="text-lg font-mono font-extrabold text-ink block mt-1">
              <AnimatedCounter value={isActive ? data.scrutexityYield : data.baselineYield} prefix="$" suffix="/mo" />
            </span>
            {isActive && (
              <span className="text-[8px] bg-sage/20 text-sage-deep font-mono p-1 rounded font-bold border border-sage/20 inline-block w-fit mt-1">
                +{formatCost(data.recoveryAmount)}/mo Saved
              </span>
            )}
          </div>
        </GlassCard>
      </div>

    </div>
  );
}

/* ==========================================
   MAIN SECTION COMPONENT
   ========================================== */
export function RevenueLeakSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion() ?? false;
  const [isActive, setIsActive] = useState(reduced);
  const [segment, setSegment] = useState<'single' | 'multi' | 'pe'>('single');

  const currentData = SEGMENTS[segment];

  // Auto trigger "Active" state after delay on scroll
  useEffect(() => {
    if (!isInView || reduced) { setIsActive(reduced ? true : false); return; }
    const t = setTimeout(() => {
      setIsActive(true);
      try {
        playSketchSound('lock');
      } catch {
        // Safe play
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [isInView, reduced]);

  // Handle manual click toggle
  const handleToggle = (state: boolean) => {
    setIsActive(state);
    try {
      playSketchSound('lock');
    } catch {
      // Safe play
    }
  };

  return (
    <section
      id="problem"
      ref={ref}
      className="py-24 md:py-32 relative z-10 bg-cream border-t border-sand-deep/15 select-none"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-sage-deep block mb-4">
              The Real Problem
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink">
              Most businesses do not need{' '}
              <span className="italic text-sage-deep">more marketing.</span>{' '}
              They need less leakage.
            </h2>
            <p className="mt-5 font-sans text-mist max-w-xl text-base leading-[1.55]">
              The highest-intent customers are already reaching out. If nobody responds,
              revenue disappears into administrative gaps — quietly, every month.
            </p>
          </div>

          {/* STATE CONTROL SYSTEM (SEGMENTED CONTROL) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            {/* Segment Toggle */}
            <div 
              role="tablist" 
              aria-label="Location segment selector" 
              className="inline-flex p-0.5 bg-ink/5 rounded-full backdrop-blur-sm border border-ink/10 relative"
            >
              {(['single', 'multi', 'pe'] as const).map((seg) => {
                const label = seg === 'single' ? 'Single' : seg === 'multi' ? 'Multi-Loc' : 'PE Group';
                return (
                  <button
                    key={seg}
                    role="tab"
                    aria-selected={segment === seg}
                    onClick={() => {
                      setSegment(seg);
                      try {
                        playSketchSound('hover');
                      } catch {}
                    }}
                    className={`relative px-3 py-1.5 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider transition-colors duration-300 z-10 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none ${
                      segment === seg ? 'text-cream font-extrabold' : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    {segment === seg && (
                      <motion.span 
                        layoutId="active-segment-desktop" 
                        className="absolute inset-0 bg-ink rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Engine Status Toggle */}
            <div 
              role="tablist" 
              aria-label="System status toggle" 
              className="inline-flex p-0.5 bg-ink/5 rounded-full backdrop-blur-sm border border-ink/10 relative"
            >
              <button
                role="tab"
                aria-selected={!isActive}
                onClick={() => handleToggle(false)}
                className={`relative px-4 py-2 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider transition-colors duration-300 z-10 focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:outline-none ${
                  !isActive ? 'text-cream font-extrabold' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {!isActive && (
                  <motion.span 
                    layoutId="active-toggle-desktop-v2" 
                    className="absolute inset-0 bg-ink rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Practice Default
              </button>
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => handleToggle(true)}
                className={`relative px-4 py-2 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 z-10 focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:outline-none ${
                  isActive ? 'text-cream font-extrabold' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span 
                    layoutId="active-toggle-desktop-v2" 
                    className="absolute inset-0 bg-sage-deep rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {isActive && (
                  <Lock size={10} className="text-cream" />
                )}
                Scrutexity Active
              </button>
            </div>
            
            <span className="text-[9px] font-mono text-mist/50 uppercase tracking-wider lg:text-right w-full block">
              * Illustrative Practice Model
            </span>
          </div>
        </div>

        {/* OVERHAULED COORDINATE PIPELINE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="relative w-full"
        >
          {/* Desktop and Mobile responsive pipelines */}
          <div className="hidden md:block">
            <DesktopPipeline isActive={isActive} data={currentData} />
          </div>
          <div className="block md:hidden">
            <MobilePipeline isActive={isActive} data={currentData} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
