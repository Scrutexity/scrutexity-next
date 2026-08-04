"use client";
import React from "react";
import { motion } from "framer-motion";

interface ClaimCardProps {
  claim: string;
  riskScore: number;
  status: "Verified" | "Unsupported" | "Reviewing";
}

export function ClaimCard({ claim, riskScore, status }: ClaimCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="clinical-card p-6 flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-display text-2xl text-charcoal">{claim}</h3>
        <span
          className={`data-pill ${
            status === "Verified"
              ? "text-sage-deep border-sage-deep bg-sage/10"
              : status === "Unsupported"
              ? "text-terracotta border-terracotta bg-terracotta/10"
              : ""
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-charcoal/10">
        <span className="font-mono text-sm text-charcoal-muted">RISK SCORE:</span>
        <span className="font-mono text-lg font-semibold text-charcoal">{riskScore}/100</span>
      </div>
    </motion.div>
  );
}
