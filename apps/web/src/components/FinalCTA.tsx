'use client';
 
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Suspense } from 'react';
import { FadeIn, MagneticElement } from './Interactions';
import { playHaptic } from '../lib/audio';
 
function FinalCTAInner() {
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const href = searchString ? `/pilot?${searchString}` : '/pilot';
 
  return (
    <section className="reveal-section py-32 relative overflow-hidden z-10 border-t border-black/[0.05] bg-[#F7F5F0] font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#6B8576]/5 via-transparent to-transparent pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6B8576]/5 blur-[120px] rounded-full pointer-events-none"
      />
 
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-display text-espresso mb-10 tracking-tight leading-tight">
            Want to see what your front desk missed?
          </h2>
          <p className="text-lg text-[#6E6E6C] mb-12 max-w-xl mx-auto leading-relaxed">
            Stop renting attention from agencies. Start owning your pipeline. Begin with a free demand audit.
          </p>
          <MagneticElement>
            <Link
              href={href}
              onMouseEnter={() => playHaptic('hover')}
              onClick={() => playHaptic('powerup')}
              className="group inline-flex items-center gap-3 px-8 py-5 bg-[#6B8576] text-white font-bold rounded-2xl text-lg hover:bg-[#5A7365] transition-all duration-300 shadow-md shadow-[#6B8576]/10 transform hover:-translate-y-1 cursor-pointer no-underline"
            >
              Get Your Free Audit <Zap size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          </MagneticElement>
 
          {/* Reassurance line */}
          <p className="mt-8 text-[10px] text-[#6E6E6C] font-mono uppercase tracking-widest font-semibold">
            14-day pilot · BAA before activation · Disconnect at any time
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
 
const FinalCTA = () => (
  <Suspense fallback={
    <section className="py-32 bg-[#F7F5F0] border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-4xl font-display text-espresso/25">Loading...</div>
      </div>
    </section>
  }>
    <FinalCTAInner />
  </Suspense>
);
 
export default FinalCTA;
