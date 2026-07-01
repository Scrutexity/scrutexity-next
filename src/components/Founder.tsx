'use client';
 
import { motion } from 'framer-motion';
import { COPY } from '../lib/constants';
 
export default function Founder() {
  return (
    <section id="operators" className="reveal-section py-28 bg-[#FBFBFA] relative z-10 border-y border-black/[0.05] font-sans">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-20 h-20 mx-auto bg-[#6B8576]/10 rounded-full mb-8 flex items-center justify-center border border-[#6B8576]/15 overflow-hidden">
            <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-display text-espresso mb-2">{COPY.founder.name}</h2>
          <div className="text-[#6B8576] font-mono tracking-wider text-xs uppercase font-semibold mb-6">{COPY.founder.title}</div>
          <p className="text-lg text-[#6E6E6C] leading-relaxed italic max-w-3xl mx-auto">
            "{COPY.founder.quote}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
