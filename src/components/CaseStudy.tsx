'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { COPY } from '../lib/constants'

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: string, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  const numeric = parseFloat(value.replace(/[$,KkMm]/g, ''))
  const hasDecimal = value.includes('.')
  
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = 16
    const totalSteps = duration / step
    const increment = numeric / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= numeric) {
        setDisplay(numeric)
        clearInterval(timer)
      } else {
        setDisplay(start)
      }
    }, step)

    return () => clearInterval(timer)
  }, [isInView, numeric])

  const formatted = hasDecimal ? display.toFixed(1) : Math.round(display).toLocaleString()

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-extrabold mb-2">
      {prefix}{formatted}{suffix}
    </div>
  )
}

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
              <span className="text-sage font-sans font-bold tracking-widest text-xs uppercase mb-4 block">Pilot Outcome</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-snug">&ldquo;{COPY.caseStudy.quote}&rdquo;</h3>
              <div className="text-gray-200/60 font-sans mb-8">
                <span className="font-bold text-gray-200">{COPY.caseStudy.author}</span> — {COPY.caseStudy.client}
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden border border-white/10">
                <Image src="/owneroff.webp" alt="Clinic recovery proof" fill className="object-cover object-center" sizes="50vw" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-clay">
                  <AnimatedCounter value={COPY.caseStudy.metric1} />
                </div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">{COPY.caseStudy.metric1Label}</div>
              </div>
              <div>
                <div className="text-gray-200">
                  <AnimatedCounter value={COPY.caseStudy.metric2} />
                </div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">{COPY.caseStudy.metric2Label}</div>
              </div>
              <div>
                <div className="text-sage">
                  <AnimatedCounter value={COPY.caseStudy.metric3} />
                </div>
                <div className="text-sm font-sans text-gray-200/60 uppercase tracking-wider">{COPY.caseStudy.metric3Label}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
