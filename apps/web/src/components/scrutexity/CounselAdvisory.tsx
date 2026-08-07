"use client";

import { motion, Variants } from "framer-motion";

const revealUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  }
};

const blurFadeUp: Variants = {
  hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0, 
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

export function CounselAdvisory() {
  return (
    <section className="py-24 sm:py-32 px-6 lg:px-16 w-full max-w-[1400px] mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-paper-light text-ink rounded-[2rem] p-10 sm:p-16 lg:p-24 overflow-hidden relative shadow-2xl border border-border-deep"
      >
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-bureau-sage/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-float pointer-events-none" />
        
        <div className="relative z-10 grid gap-16 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-8 space-y-10">
            <motion.h2 
              variants={blurFadeUp}
              className="text-4xl sm:text-5xl lg:text-[64px] font-light leading-[1.1] tracking-[-0.02em]"
            >
              "The days of manual claim review are over. Institutional capital requires cryptographic certainty."
            </motion.h2>
            
            <motion.div variants={revealUp} className="space-y-6 text-muted text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              <p>
                Regulators no longer tolerate analog compliance. When an FDA warning letter or FTC civil investigative demand arrives, diligence teams need to know exactly what was claimed, when it was modified, and the cryptographic hash of the raw DOM at the exact moment of exposure.
              </p>
              <p>
                Scrutexity removes the ambiguity from regulatory exposure, providing General Counsel and PE deal teams with an irrefutable, point-in-time baseline of a company's public risk profile.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={revealUp} 
            className="lg:col-span-4 lg:border-l lg:border-border-deep lg:pl-12 flex flex-col gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-border-deep text-ink flex items-center justify-center font-bold text-2xl border border-bureau-sage/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <span className="text-bureau-sage text-sm font-mono tracking-widest">STND</span>
            </div>
            <div>
              <p className="text-ink font-medium text-lg">Scrutexity Operating Standard</p>
              <p className="text-bureau-sage text-sm tracking-widest uppercase mt-1 font-light">Institutional Intelligence</p>
              <p className="text-muted text-sm mt-3 font-light leading-relaxed">
                Designed to meet the evidentiary requirements of regulatory enforcement and M&A diligence.
              </p>
            </div>
            
            <div className="pt-8 mt-8 border-t border-border-deep">
              <a 
                href="/methodology" 
                className="inline-flex items-center text-ink hover:text-bureau-sage transition-colors font-light text-sm tracking-widest uppercase group"
              >
                Read the Methodology
                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
