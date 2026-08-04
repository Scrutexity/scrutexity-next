"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSTITUTIONAL_SPRING } from "@/lib/motion";
import { ShieldCheck, Plus } from "lucide-react";

interface Block {
  id: number;
  prevHash: string;
  currentHash: string;
  claimCount: number;
}

export function HashChainProof() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 101, prevHash: "0x0000...0000", currentHash: "0x3a12...f901", claimCount: 14 },
    { id: 102, prevHash: "0x3a12...f901", currentHash: "0x8e4b...11c2", claimCount: 8 },
  ]);

  const addBlock = () => {
    const lastBlock = blocks[blocks.length - 1];
    const newBlock: Block = {
      id: lastBlock.id + 1,
      prevHash: lastBlock.currentHash,
      currentHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
      claimCount: Math.floor(Math.random() * 20) + 1,
    };
    setBlocks((prev) => [...prev.slice(-2), newBlock]);
  };

  return (
    <div className="rounded-3xl border border-sand-deep/40 bg-cream-deep/95 p-6 md:p-8 shadow-[0_16px_48px_-16px_rgba(28,24,20,0.08)] backdrop-blur-lg font-mono">
      <div className="flex items-center justify-between pb-4 border-b border-sand-deep/20 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-sage-deep" />
          <span className="text-[10px] text-mist uppercase tracking-[0.18em] font-semibold">Append-Only Audit Ledger Stream</span>
        </div>
        <button
          onClick={addBlock}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-sage-deep/40 bg-sage/10 px-3.5 py-1.5 text-xs text-sage-deep font-semibold hover:bg-sage-deep hover:text-cream transition-all duration-300 shadow-sm"
        >
          <Plus size={14} />
          <span>Append Audit Block</span>
        </button>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center overflow-hidden">
        <AnimatePresence initial={false}>
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={INSTITUTIONAL_SPRING}
              className="w-full md:w-64 rounded-2xl border border-sand-deep/30 bg-bone/80 p-4 text-xs shadow-sm"
            >
              <div className="text-sage-deep font-bold text-[11px] uppercase tracking-wider">BLOCK #{block.id}</div>
              <div className="mt-3 text-mist/80 text-[10px]">
                PREV: <span className="text-espresso font-semibold">{block.prevHash}</span>
              </div>
              <div className="mt-1 text-mist/80 text-[10px]">
                HASH: <span className="text-sage-deep font-bold">{block.currentHash}</span>
              </div>
              <div className="mt-3 border-t border-sand-deep/20 pt-2 text-right text-mist text-[10px]">
                Claims Sealed: <span className="font-bold text-espresso">{block.claimCount}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
