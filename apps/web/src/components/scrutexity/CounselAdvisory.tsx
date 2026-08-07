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
        className="bg-[#132a24] text-[#ffffff] rounded-[2rem] p-10 sm:p-16 lg:p-24 overflow-hidden relative shadow-2xl"
      >
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-[#274f44] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-float pointer-events-none" />
        
        <div className="relative z-10 grid gap-16 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-8 space-y-10">
            <motion.h2 
              variants={blurFadeUp}
              className="text-4xl sm:text-5xl lg:text-[64px] font-light leading-[1.1] tracking-[-0.02em]"
            >
              "The days of manual claim review are over. Institutional capital requires cryptographic certainty."
            </motion.h2>
            
            <motion.div variants={revealUp} className="space-y-6 text-[#879f98] text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
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
            className="lg:col-span-4 lg:border-l lg:border-[#274f44] lg:pl-12 flex flex-col gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#f5f7f6] text-[#132a24] flex items-center justify-center font-bold text-2xl">
              AJ
            </div>
            <div>
              <p className="text-white font-medium text-lg">Arthur Judson</p>
              <p className="text-[#78A184] text-sm tracking-widest uppercase mt-1 font-light">Former Regulatory Counsel</p>
              <p className="text-[#879f98] text-sm mt-3 font-light leading-relaxed">
                Specialized in FTC Section 5 enforcement and institutional M&A risk mitigation.
              </p>
            </div>
            
            <div className="pt-8 mt-8 border-t border-[#274f44]">
              <a 
                href="/methodology" 
                className="inline-flex items-center text-[#ffffff] hover:text-[#78A184] transition-colors font-light text-sm tracking-widest uppercase group"
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
