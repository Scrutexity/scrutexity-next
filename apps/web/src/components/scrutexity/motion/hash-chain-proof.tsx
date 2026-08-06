"use client";
import { motion, AnimatePresence } from "framer-motion";
import { HashShuffle } from "@/components/scrutexity/motion/hash-shuffle";

/**
 * HashChainProof — live proof-receipt tick for the scan flow.
 *
 * Honesty guardrail: this card renders a SHA-256 digest ONLY when a real
 * `hash` prop is passed (a live scan record). Without one it shows a muted
 * "awaiting live scan record" placeholder — never a static/fake hash.
 */
export function HashChainProof({
  isScanning,
  hash,
  vectorsLabel = "FTC / FDA Pattern Match",
}: {
  isScanning?: boolean;
  hash?: string;
  vectorsLabel?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-sand-deep bg-bone p-5 font-mono text-xs text-mist shadow-sm">
      <div className="flex items-center justify-between border-b border-sand-deep/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-realta opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-realta" />
          </span>
          <span className="font-semibold tracking-tight text-espresso">PROOF_CHAIN_ID // #8F92-2026</span>
        </div>
        <span className="rounded-full border border-realta/20 bg-realta/10 px-3 py-0.5 text-[10px] font-sans font-medium text-realta-deep">
          TIMESTAMPED
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-mist/60">SHA-256 DIGEST:</span>
          {hash ? (
            <HashShuffle finalHash={hash} durationMs={800} />
          ) : (
            <span className="max-w-[220px] truncate font-medium text-espresso md:max-w-[300px]">
              — awaiting live scan record
            </span>
          )}
        </div>

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 flex items-center justify-between border-t border-sand-deep/40 pt-2 text-[11px] text-realta-deep"
            >
              <span>VECTORS_MAPPED: {vectorsLabel}</span>
              <span className="animate-pulse">Computing hash-chain...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
