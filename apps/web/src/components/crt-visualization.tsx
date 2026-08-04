'use client';

import { motion } from 'framer-motion';

const payload = {
  record_id: 'crt_8f92a1b',
  timestamp: new Date().toISOString(),
  visibility_index: {
    claim_drift: 0.04,
    proof_status: 'inadequate',
    ai_answer_risk: 'elevated',
  },
  remediation_nodes: [
    { type: 'wording_adjustment', confidence: 0.92, status: 'pending' },
  ],
  infrastructure: 'read-only',
};

export function CRTVisualization() {
  return (
    <div className="group relative mx-auto max-w-3xl rounded-2xl bg-espresso p-1 shadow-sm">
      {/* Atmospheric clay glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-clay/10 opacity-0 blur-2xl transition duration-1000 group-hover:opacity-100" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative rounded-xl border border-sand-deep/20 bg-espresso p-6 md:p-8"
      >
        {/* Header bar */}
        <div className="mb-6 flex items-center justify-between border-b border-sand-deep/10 pb-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mist/70">
            Standardized Output Payload
          </span>
          <span className="flex h-2 w-2 rounded-full bg-clay shadow-[0_0_8px_rgba(183,137,107,0.5)]" />
        </div>

        {/* JSON payload */}
        <pre className="overflow-x-auto">
          <code className="text-[13px] leading-relaxed text-bone/90">
            <span className="text-mist/60">{'{'}</span>
            {'\n'}
            <span className="text-clay">  &ldquo;record_id&rdquo;</span>:{' '}
            <span className="text-mist">&ldquo;crt_8f92a1b&rdquo;</span>,
            {'\n'}
            <span className="text-clay">  &ldquo;timestamp&rdquo;</span>:{' '}
            <span className="text-mist">&ldquo;{payload.timestamp}&rdquo;</span>,
            {'\n'}
            <span className="text-clay">  &ldquo;visibility_index&rdquo;</span>:{' '}
            <span className="text-mist/60">{'{'}</span>
            {'\n'}
            <span className="text-clay">    &ldquo;claim_drift&rdquo;</span>:{' '}
            <span className="text-bone">0.04</span>,
            {'\n'}
            <span className="text-clay">    &ldquo;proof_status&rdquo;</span>:{' '}
            <span className="text-mist">&ldquo;inadequate&rdquo;</span>,
            {'\n'}
            <span className="text-clay">    &ldquo;ai_answer_risk&rdquo;</span>:{' '}
            <span className="text-mist">&ldquo;elevated&rdquo;</span>
            {'\n'}
            <span className="text-mist/60">  {'}'}</span>,
            {'\n'}
            <span className="text-clay">  &ldquo;infrastructure&rdquo;</span>:{' '}
            <span className="text-mist">&ldquo;read-only&rdquo;</span>
            {'\n'}
            <span className="text-mist/60">{'}'}</span>
          </code>
        </pre>
      </motion.div>
    </div>
  );
}
