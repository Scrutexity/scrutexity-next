'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, FileCheck2, Database } from 'lucide-react';
import { fetchTelemetry } from '@/actions/telemetry';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MirrorAuditSection() {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    fetchTelemetry().then(setTelemetry).catch(console.error);
  }, []);

  return (
    <section className="relative px-6 py-24 md:py-32 bg-cream overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-[100%] bg-clay/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-clay-deep mb-5 font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-clay-deep opacity-40 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-deep" />
            </span>
            Scrutexity audits itself first
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-espresso tracking-tight leading-[1.1] flex flex-col items-center gap-3"
          >
            <span>Diagnose on AuditGPT.</span>
            <span className="italic text-clay">
              Govern inside{' '}
              <motion.span 
                className="inline-block text-sage-deep not-italic font-medium"
                animate={{ opacity: [0.7, 1, 0.7], y: [0, -2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Scrutexity.
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-mist leading-[1.6]"
          >
            Our claims are governed by the same infrastructure we provide to you.
            Live telemetry ensures our proof matches our promises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Telemetry Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4 bg-bone border border-sand-deep/30 rounded-2xl p-6"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono text-mist tracking-widest">Claim Health</span>
              <span className="font-display text-3xl text-espresso">{telemetry ? `${telemetry.claimHealthScore} / 100` : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono text-mist tracking-widest">Unsupported</span>
              <span className="font-display text-3xl text-clay">{telemetry ? telemetry.unsupportedLanguageCount : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono text-mist tracking-widest">Proof Assets</span>
              <span className="font-display text-3xl text-sage-deep">{telemetry ? telemetry.proofArtifactsCount : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono text-mist tracking-widest">AI Surfaces</span>
              <span className="font-display text-3xl text-espresso">{telemetry ? telemetry.aiAnswerSurfacesCount : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-mono text-mist tracking-widest">Workflows</span>
              <span className="font-display text-3xl text-espresso">{telemetry ? telemetry.recoveryWorkflowsCount : '—'}</span>
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="bg-cream-deep border border-clay/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-clay to-transparent opacity-50" />
            <Activity className="text-clay mb-4" size={24} />
            <h3 className="font-display text-2xl text-espresso mb-2">Claim flagged</h3>
            <p className="text-sm text-mist leading-relaxed">System identifies language that exceeds available evidence.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="bg-cream-deep border border-sand-deep/40 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sand-deep to-transparent opacity-50" />
            <Database className="text-mist mb-4" size={24} />
            <h3 className="font-display text-2xl text-espresso mb-2">Proof attached</h3>
            <p className="text-sm text-mist leading-relaxed">Primary source review artifacts are linked directly to the claim.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="bg-sage-soft/10 border border-sage-deep/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage-deep to-transparent opacity-50" />
            <ShieldCheck className="text-sage-deep mb-4" size={24} />
            <h3 className="font-display text-2xl text-espresso mb-2">Safer replacement approved</h3>
            <p className="text-sm text-mist leading-relaxed">Governed messaging drops in, satisfying both marketing intent and compliance.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
