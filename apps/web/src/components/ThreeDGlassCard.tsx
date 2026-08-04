'use client';

import { motion } from 'framer-motion';

export default function ThreeDGlassCard() {
  return (
    <div className="relative flex items-center justify-center w-full h-[500px]" style={{ perspective: '1200px' }}>
      
      {/* MAIN CARD */}
      <motion.div 
        initial={{ opacity: 0, rotateX: 25, rotateY: -25, rotateZ: 10 }}
        animate={{ opacity: 1, rotateX: 20, rotateY: -15, rotateZ: 5 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-[360px] h-[280px] p-6 rounded-3xl relative"
        style={{
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.02)',
        }}
      >
        <div className="text-[13px] tracking-widest text-white/60 uppercase font-sans font-bold mb-1">
          Revenue Throughput
        </div>
        <div className="text-4xl font-display font-bold text-white">
          +$42,700
        </div>

        {/* FLOATING CARD RIGHT */}
        <motion.div 
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="absolute flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans text-white"
          style={{
            top: '40px', right: '-40px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sage font-bold">
            ↓
          </div>
          <div>
            <div className="text-white/60 font-sans text-[10px] uppercase tracking-widest font-bold">Practice Metrics</div>
            <div className="font-bold text-sm">4.2 TB</div>
          </div>
          <div className="ml-2 text-[10px] text-sage font-bold font-sans">SYNC</div>
        </motion.div>

        {/* FLOATING CARD LEFT */}
        <motion.div 
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className="absolute flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans text-white"
          style={{
            bottom: '40px', left: '-50px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-blue-400 font-bold">
            ↑
          </div>
          <div>
            <div className="text-white/60 font-sans text-[10px] uppercase tracking-widest font-bold">Inquiries</div>
            <div className="font-bold text-sm">19,420 Ops</div>
          </div>
          <div className="ml-2 text-[10px] text-blue-400 font-bold font-sans">BNB</div>
        </motion.div>

      </motion.div>
    </div>
  );
}
