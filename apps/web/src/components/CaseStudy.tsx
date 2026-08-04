'use client';

import { motion } from 'framer-motion'

export default function CaseStudy() {
  return (
    <section id="proof" className="reveal-section py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-charcoal text-gray-200 rounded-[2rem] p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-sage/5 pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sage font-sans font-bold tracking-widest text-xs uppercase mb-4 block">Pilot Approach</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-snug">
                &ldquo;Your practice&rsquo;s actual missed inquiries, measured and recovered.&rdquo;
              </h3>
              <div className="text-gray-200/60 font-sans mb-8">
                <span className="font-bold text-gray-200">The Scrutexity pilot</span> — 14 days, parallel install, auditable ledger
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden border border-white/10">
                <div className="w-full h-full flex items-center justify-center bg-charcoal/50 text-gray-200/40 text-sm font-mono">
                  Your clinic&rsquo;s recovery ledger will appear here
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-display font-extrabold mb-2 text-espresso/80">14</div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">day pilot</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-extrabold mb-2 text-gray-200">$0</div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">if not proven</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-extrabold mb-2 text-sage">1</div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">parallel install</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
