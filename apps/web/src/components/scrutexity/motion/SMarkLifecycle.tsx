"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSTITUTIONAL_SPRING } from "@/lib/motion";
import { ShieldCheck, AlertCircle, Clock } from "lucide-react";

type Status = "unverified" | "active" | "expired";

export function SMarkLifecycle() {
  const [status, setStatus] = useState<Status>("active");

  const statusConfig = {
    unverified: {
      label: "NO REVIEW RECORD",
      icon: Clock,
      color: "text-mist",
      bg: "bg-bone/80",
      border: "border-sand-deep/30",
      ttl: "N/A",
    },
    active: {
      label: "REVIEW RECORD ACTIVE",
      icon: ShieldCheck,
      color: "text-sage-deep",
      bg: "bg-sage/12",
      border: "border-sage-deep/40",
      ttl: "89 days remaining",
    },
    expired: {
      label: "RECORD EXPIRED (STALE COPY)",
      icon: AlertCircle,
      color: "text-clay",
      bg: "bg-clay/10",
      border: "border-clay/30",
      ttl: "0 days (Review required)",
    },
  };

  const CurrentIcon = statusConfig[status].icon;

  return (
    <div className="rounded-3xl border border-sand-deep/40 bg-cream-deep/95 p-6 md:p-8 max-w-md shadow-md backdrop-blur-md">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-mist font-semibold mb-4">
        S-MARK LIFECYCLE STATE PREVIEW
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={INSTITUTIONAL_SPRING}
          className={`flex items-center justify-between gap-3 rounded-2xl border p-4 font-mono text-xs ${statusConfig[status].bg} ${statusConfig[status].border}`}
        >
          <div className="flex items-center gap-2.5">
            <CurrentIcon size={16} className={statusConfig[status].color} />
            <span className={`font-bold ${statusConfig[status].color}`}>
              {statusConfig[status].label}
            </span>
          </div>
          <span className="text-[10px] text-espresso/70 font-sans">{statusConfig[status].ttl}</span>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
        <button
          onClick={() => setStatus("active")}
          className={`px-3 py-1.5 rounded-xl border transition-all text-[11px] font-medium ${
            status === "active"
              ? "border-sage-deep bg-sage-deep text-cream shadow-sm"
              : "border-sand-deep/40 bg-bone text-espresso hover:border-sand-deep"
          }`}
        >
          Set Active
        </button>
        <button
          onClick={() => setStatus("expired")}
          className={`px-3 py-1.5 rounded-xl border transition-all text-[11px] font-medium ${
            status === "expired"
              ? "border-clay bg-clay text-cream shadow-sm"
              : "border-sand-deep/40 bg-bone text-espresso hover:border-sand-deep"
          }`}
        >
          Simulate Expiration
        </button>
        <button
          onClick={() => setStatus("unverified")}
          className={`px-3 py-1.5 rounded-xl border transition-all text-[11px] font-medium ${
            status === "unverified"
              ? "border-espresso bg-espresso text-cream shadow-sm"
              : "border-sand-deep/40 bg-bone text-espresso hover:border-sand-deep"
          }`}
        >
          Reset State
        </button>
      </div>
    </div>
  );
}
