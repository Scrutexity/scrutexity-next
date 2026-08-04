'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageSquareWarning, CalendarCheck } from 'lucide-react';

export default function FeatureComposite() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto font-sans overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left: The Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-start"
        >
          <span className="text-clay font-semibold tracking-[0.15em] text-sm uppercase mb-4">
            Bimodal Demand Capture
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-espresso leading-tight mb-6">
            Intercept high-ticket queries. <br />Book them instantly.
          </h2>
          <p className="text-lg text-espresso/70 mb-10 leading-relaxed max-w-lg">
            When a patient searches for Morpheus8 after hours, our compliance airlock intercepts the inquiry, answers their non-clinical questions, and seamlessly drops the booking onto your calendar.
          </p>
          <button className="text-clay font-semibold uppercase tracking-widest text-sm flex items-center gap-2 hover:opacity-70 transition-opacity">
            Explore Triage Architecture <span>→</span>
          </button>
        </motion.div>

        {/* Right: The Compositional Image */}
        <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
          
          {/* 1. The Soft Background Canvas */}
          <div className="absolute inset-0 bg-cream rounded-[2.5rem] transform translate-x-4 translate-y-4 scale-105 z-0" />

          {/* 2. The Main Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/50"
          >
            <Image 
              src="/consultation.jpg"
              alt="High-ticket patient consultation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* 3. Floating Widget: Top Left */}
          <motion.div 
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="absolute z-20 -top-8 -left-4 md:-left-12 w-64 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/60"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center shrink-0">
                <MessageSquareWarning size={14} className="text-clay" />
              </div>
              <div>
                <p className="text-xs font-semibold text-espresso mb-1">Incoming AI Query</p>
                <p className="text-[11px] text-espresso/60 leading-tight">
                  &ldquo;How much does the P-Shot cost? Are you open tomorrow?&rdquo;
                </p>
                <span className="inline-block mt-2 text-[9px] uppercase tracking-wider font-semibold text-clay bg-clay/10 px-2 py-0.5 rounded">
                  Intent: Pricing
                </span>
              </div>
            </div>
          </motion.div>

          {/* 4. Floating Widget: Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
            className="absolute z-20 -bottom-10 -right-4 md:-right-8 w-56 bg-charcoal text-ivory rounded-2xl p-5 shadow-2xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-3">
              <CalendarCheck size={18} className="text-clay" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Secured</span>
            </div>
            <p className="text-sm font-semibold mb-1">Morpheus8 Consult</p>
            <p className="text-xs text-white/60 mb-3">Tomorrow, 10:00 AM</p>
            <div className="pt-3 border-t border-white/10 flex justify-between items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Revenue Captured</span>
              <span className="text-sm font-semibold text-white">$2,500</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
