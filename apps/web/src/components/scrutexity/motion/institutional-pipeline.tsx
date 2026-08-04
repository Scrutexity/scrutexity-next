"use client";

import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO_STACK = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const PIPELINE_NODES = [
  { label: 'Public Website', style: 'text' },
  { label: 'Claim Extraction', style: 'box' },
  { label: 'Evidence Review', style: 'text' },
  { label: 'Pattern Analysis', style: 'text' },
  { label: 'Review Record', style: 'box-accent' },
  { label: 'Verification', style: 'text' },
];

export function InstitutionalPipeline() {
  return (
    <div className="w-full max-w-4xl mx-auto py-24 relative select-none">
      {/* Background ambient grid lines & glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage-deep/5 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex flex-col items-center">
        {PIPELINE_NODES.map((node, index) => {
          const isLast = index === PIPELINE_NODES.length - 1;
          
          return (
            <div key={node.label} className="flex flex-col items-center">
              {/* The Node */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.5, delay: index * 0.4, ease: EASE }}
                className="relative"
              >
                {node.style === 'text' && (
                  <motion.span 
                    animate={index === 0 || isLast ? {} : { opacity: [0.7, 1, 0.7] }}
                    transition={index === 0 || isLast ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index }}
                    className="block text-[11px] uppercase tracking-[0.25em] text-mist" 
                    style={{ fontFamily: MONO_STACK }}
                  >
                    {node.label}
                  </motion.span>
                )}

                {node.style === 'box' && (
                  <div className="border border-sand-deep/30 bg-bone/50 px-8 py-3 rounded-full backdrop-blur-sm shadow-[0_4px_24px_-12px_rgba(28,24,20,0.1)]">
                    <span className="font-display text-lg text-espresso tracking-tight">{node.label}</span>
                  </div>
                )}

                {node.style === 'box-accent' && (
                  <div className="border border-sage-deep/30 bg-sage-deep/[0.03] px-10 py-4 rounded-sm shadow-[0_12px_40px_-12px_rgba(94,122,90,0.15)] relative overflow-hidden">
                    <motion.div 
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-sage-deep/10 pointer-events-none"
                    />
                    <span className="font-display text-xl text-espresso tracking-tight relative z-10">{node.label}</span>
                  </div>
                )}
              </motion.div>

              {/* The Connecting Line */}
              {!isLast && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 48, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: (index * 0.4) + 0.3, ease: EASE }}
                  className="w-px bg-gradient-to-b from-sand-deep/40 to-sand-deep/10 my-3 relative overflow-hidden"
                >
                  {/* Subtle pulsing line moving down */}
                  <motion.div
                    animate={{ top: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-sage-deep/40 to-transparent"
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
