'use client';

import { motion } from 'framer-motion'
import { COPY } from '../lib/constants'
import { useStore } from '../lib/store'
import { playHaptic } from '../lib/audio'

const FeaturesGrid = () => {
  const setActiveModule = useStore((state) => state.setActiveModule)
  const activeModule = useStore((state) => state.activeModule)

  return (
    <section id="core-features" className="reveal-section py-32 bg-transparent relative z-10 border-t border-charcoal/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-terracotta/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="mb-20 text-center">
          <span className="text-clay font-sans tracking-[0.2em] text-xs font-semibold uppercase mb-4 block">Recovery Systems</span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white">Revenue Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COPY.modules.map((module) => (
            <motion.div 
              key={module.number} 
              className="port-card glass-panel p-10 cursor-crosshair relative overflow-hidden bg-cream/80 hover:bg-charcoal/[0.05] transition-colors border border-charcoal/10"
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => {
                setActiveModule(module.number)
                playHaptic('hover')
              }}
              onMouseLeave={() => setActiveModule(null)}
              onClick={() => playHaptic('lock')}
            >
              {/* Dynamic Glow Line */}
              <div 
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-terracotta to-transparent transition-opacity duration-300 pointer-events-none" 
                style={{ opacity: activeModule === module.number ? 1 : 0 }} 
              />
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="mb-6 pb-6 border-b border-charcoal/10">
                    <span className="text-clay font-sans text-xs tracking-widest font-bold uppercase block mb-2">The Leak</span>
                    <h4 className="text-xl font-bold font-display text-white mb-2">{module.problem}</h4>
                    <p className="text-white/60 font-sans text-sm leading-relaxed italic">"{module.outcome}"</p>
                  </div>
                  
                  <div>
                    <span className="text-white/70 font-sans text-[10px] tracking-widest font-bold uppercase block mb-2">The Fix</span>
                    <h3 className="text-2xl font-bold font-display text-white mb-3">{module.name}</h3>
                    <p className="text-white/80 font-sans text-sm leading-relaxed">{module.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
