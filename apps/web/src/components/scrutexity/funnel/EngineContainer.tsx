"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useScanToken } from "./hooks/useScanToken";
import { useFunnelResult } from "./hooks/useFunnelResult";
import { LockedState } from "./states/LockedState";
import { PartialState } from "./states/PartialState";
import { UnlockedState } from "./states/UnlockedState";

interface EngineContainerProps {
  scanId: string | null;
  isDemo?: boolean;
}

export function EngineContainer({ scanId, isDemo = false }: EngineContainerProps) {
  const { token, saveToken } = useScanToken();
  const { payload } = useFunnelResult(scanId, token, isDemo);

  // TODO: Add demo override behavior if `isDemo` is true and no scanId

  const handleEmailCaptured = async (email: string) => {
    try {
      const res = await fetch('/api/funnel/capture-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ email, scanId })
      });
      
      if (!res.ok) throw new Error("Failed to capture email");
      
      const { scanToken } = await res.json();
      saveToken(scanToken);
    } catch (error) {
      console.error("Email capture failed:", error);
    }
  };

  const handlePurchaseSuccess = () => {
    // In a full production app, the backend webhook updates the DB to PURCHASED.
    // The client could just poll or we can optimistically re-fetch here.
    // By re-fetching result/[scanId] with our EMAIL_CAPTURED token, 
    // the backend will see the DB is PURCHASED and return the full payload.
    // For this slice, we will just force a re-fetch of the payload by triggering a token save.
    // Since the token hasn't changed, we can force a reload by re-setting the same token,
    // but the cleanest way without a dedicated "refresh" function is to just let the success callback
    // trigger a manual fetch or we can just append a dummy query param if we had one.
    // To keep it simple, we'll just save the token again to trigger the effect.
    if (token) saveToken(token);
    console.log("Purchase complete, unlocking full record.");
  };

  if (payload.state === "LOADING") {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-paper-light border border-sand-deep/40 rounded-2xl shadow-xl">
        <div className="animate-pulse text-sm font-mono text-muted uppercase tracking-widest">
          Analyzing Domain Surface...
        </div>
      </div>
    );
  }

  if (payload.state === "ERROR") {
    return (
      <div className="w-full p-8 text-center bg-paper-light border border-exposure-red/40 rounded-2xl">
        <p className="text-exposure-red">An error occurred while fetching the audit record.</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div layout className="w-full max-w-4xl mx-auto z-20 relative">
        <AnimatePresence mode="wait">
          
          {payload.state === "LOCKED" && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LockedState data={payload.data} onEmailCaptured={handleEmailCaptured} />
            </motion.div>
          )}

          {payload.state === "PARTIAL" && (
            <motion.div
              key="partial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PartialState data={payload.data} onPurchaseSuccess={handlePurchaseSuccess} />
            </motion.div>
          )}

          {(payload.state === "UNLOCKED" || payload.state === "DEMO") && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <UnlockedState data={payload.data} />
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
