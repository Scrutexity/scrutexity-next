"use client";

import { motion } from "framer-motion";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const EVENTS = [
  {
    date: "Aug 5, 2026",
    label: "First Observed",
    desc: "Original claim captured by Scrutexity.",
    color: "bg-mist",
  },
  {
    date: "Aug 5, 2026",
    label: "Reviewed",
    desc: "Evidence gap identified.",
    color: "bg-clay",
  },
  {
    date: "Aug 6, 2026",
    label: "Updated",
    desc: "Claim remediated on public page.",
    color: "bg-sage-deep",
  },
  {
    date: "Aug 6, 2026",
    label: "Status: Clarified",
    desc: "New language verified and recorded.",
    color: "bg-espresso",
  }
];

export function DatedRecordTimeline() {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="relative border-l-2 border-sand-deep/50 ml-4 md:ml-6 space-y-8 pb-4">
        {EVENTS.map((evt, i) => (
          <motion.div 
            key={evt.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative pl-8 md:pl-10"
          >
            {/* Timeline node */}
            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${evt.color} ring-4 ring-cream`} />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay" style={{ fontFamily: MONO }}>
                {evt.label}
              </span>
              <span className="text-sm font-semibold text-espresso" style={{ fontFamily: MONO }}>
                {evt.date}
              </span>
            </div>
            <p className="text-sm text-mist leading-relaxed">
              {evt.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
