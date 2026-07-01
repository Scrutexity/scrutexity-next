"use client";
import React from "react";
import { motion } from "framer-motion";

interface ArtifactReceiptProps {
  id: string;
  timestamp: string;
  hash: string;
  metric: string;
  value: string;
}

export function ArtifactReceipt({ id, timestamp, hash, metric, value }: ArtifactReceiptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="clinical-glass p-5 flex flex-col gap-3 max-w-sm w-full"
    >
      <div className="flex justify-between items-center text-xs font-mono text-charcoal-muted">
        <span>ID: {id}</span>
        <span>{timestamp}</span>
      </div>
      <div className="h-[1px] w-full border-t border-dashed border-ivory-deep"></div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-charcoal-muted">{metric}</span>
        <span className="font-display text-3xl text-charcoal">{value}</span>
      </div>
      <div className="h-[1px] w-full border-t border-dashed border-ivory-deep mt-2"></div>
      <div className="text-[10px] font-mono text-charcoal-muted break-all">
        SHA256: {hash}
      </div>
      <div className="text-[10px] font-mono text-sage-deep mt-2 uppercase tracking-widest text-center">
        Reviewed by Scrutexity Network
      </div>
    </motion.div>
  );
}
