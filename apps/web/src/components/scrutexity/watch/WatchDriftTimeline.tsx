"use client";

import { motion } from "framer-motion";
import { Clock, ShieldAlert, CheckCircle2 } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const TIMELINE_DATA = [
  {
    date: "Aug 06, 2026",
    status: "high-risk",
    event: "Marketing Update via CMS",
    oldText: "In a clinical study, participants experienced an average of 15% reduction in body weight over 12 weeks when used as directed.",
    newText: "Clinically proven to deliver 22% weight loss and reverse cellular aging.",
    vector: "FTC_SEC_5 (Unsubstantiated mechanism & absolute outcome)",
  },
  {
    date: "Jul 15, 2026",
    status: "safe",
    event: "Legal Remediation Applied",
    oldText: "Guaranteed to burn fat permanently without diet or exercise.",
    newText: "In a clinical study, participants experienced an average of 15% reduction in body weight over 12 weeks when used as directed.",
    vector: "Counsel Approved Baseline",
  },
  {
    date: "Jun 01, 2026",
    status: "high-risk",
    event: "Initial Page Launch",
    oldText: null,
    newText: "Guaranteed to burn fat permanently without diet or exercise.",
    vector: "FTC_SEC_5 (Guaranteed Outcome)",
  }
];

export function WatchDriftTimeline() {
  return (
    <div className="relative border-l border-sand-deep/40 ml-4 md:ml-8 pl-8 space-y-12">
      {TIMELINE_DATA.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          className="relative"
        >
          {/* Node on the line */}
          <div className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-paper flex items-center justify-center ${
            item.status === 'high-risk' ? 'bg-exposure-red' : 'bg-bureau-sage'
          }`}>
            {item.status === 'high-risk' && (
              <span className="absolute w-8 h-8 rounded-full bg-exposure-red/20 animate-ping" />
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
              {item.date}
            </span>
            <div className="h-px flex-1 bg-sand-deep/20" />
            <span className="text-[10px] font-mono text-muted bg-paper border border-sand-deep/30 px-2 py-0.5 rounded" style={{ fontFamily: MONO }}>
              {item.event}
            </span>
          </div>

          <div className={`bg-paper-light border rounded-xl p-5 ${
            item.status === 'high-risk' ? 'border-exposure-red/30' : 'border-bureau-sage/30'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              {item.status === 'high-risk' ? (
                <>
                  <ShieldAlert size={14} className="text-exposure-red" />
                  <span className="text-xs font-mono text-exposure-red uppercase" style={{ fontFamily: MONO }}>
                    DRIFT DETECTED: {item.vector}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} className="text-bureau-sage" />
                  <span className="text-xs font-mono text-bureau-sage uppercase" style={{ fontFamily: MONO }}>
                    SECURE BASELINE ESTABLISHED
                  </span>
                </>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {item.oldText && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>Previous Version</span>
                  <p className="text-sm text-muted line-through decoration-sand-deep/50">{item.oldText}</p>
                </div>
              )}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted uppercase" style={{ fontFamily: MONO }}>New Version</span>
                <p className={`text-sm font-medium ${item.status === 'high-risk' ? 'text-exposure-red' : 'text-bureau-sage'}`}>
                  {item.newText}
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
