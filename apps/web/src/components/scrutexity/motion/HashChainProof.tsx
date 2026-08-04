'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, Plus } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

type Block = {
  id: string;
  payload: string;
  prevHash: string;
  currentHash: string;
  timestamp: string;
};

const INITIAL_BLOCKS: Block[] = [
  {
    id: 'block_01',
    payload: 'Observed claim: Clinically proven to reduce body weight by 22%.',
    prevHash: '0000000000000000',
    currentHash: 'b5e3c2b18f92a1b5',
    timestamp: '16:10:04',
  },
  {
    id: 'block_02',
    payload: 'Pattern match: outcome claim with visible-evidence gap.',
    prevHash: 'b5e3c2b18f92a1b5',
    currentHash: '3a4f92b7c6d1e8fa',
    timestamp: '16:12:15',
  },
];

export function HashChainProof() {
  const shouldReduce = useReducedMotion();
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [isSealing, setIsSealing] = useState(false);

  function handleSealBlock() {
    if (isSealing) return;
    setIsSealing(true);
    setTimeout(() => {
      const prevBlock = blocks[blocks.length - 1];
      const newBlock: Block = {
        id: `block_0${blocks.length + 1}`,
        payload: 'CRT appended: review record sealed to previous digest.',
        prevHash: prevBlock.currentHash,
        currentHash: Math.random().toString(16).substring(2, 10) + '2f8a9e',
        timestamp: new Date().toLocaleTimeString(),
      };
      setBlocks((prev) => [...prev, newBlock]);
      setIsSealing(false);
    }, 1200);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg border border-sand-deep/40 bg-bone shadow-[0_18px_44px_rgba(85,62,41,0.06)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="font-mono text-[10px] text-sage-deep uppercase tracking-wider">Proof Infrastructure</span>
          <h3 className="font-display text-2xl text-espresso mt-1">CRT Hash-Chain Record</h3>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-mist">
            A review record is not a claim of safety. It is a dated artifact showing what was
            observed, what support was visible, and where the evidence gap existed.
          </p>
        </div>
        <button
          onClick={handleSealBlock}
          disabled={isSealing}
          className="flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-bone shadow-sm hover:bg-clay-deep transition-all duration-300 disabled:opacity-50"
        >
          {isSealing ? 'Compiling...' : 'Append CRT'}
          <Plus size={14} />
        </button>
      </div>

      {/* Grid of Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <AnimatePresence initial={false}>
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative rounded-lg border border-sand-deep/45 bg-cream/70 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-sand-deep/20 pb-2">
                  <span className="font-mono text-[9px] text-mist">{block.id.toUpperCase()}</span>
                  <Lock size={12} className="text-sage-deep" />
                </div>
                <div className="space-y-3 font-mono text-[10px] text-mist">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-mist/60">Claim Payload</span>
                    <p className="text-espresso font-sans text-sm font-medium leading-relaxed italic mt-0.5">
                      &quot;{block.payload}&quot;
                    </p>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-mist/60 block">Previous Hash</span>
                    <span className="text-espresso font-bold">{block.prevHash}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-sand-deep/20 pt-3">
                <span className="text-[8px] font-mono uppercase tracking-wider text-mist/60 block">Block SHA256</span>
                <span className="text-xs font-mono text-sage-deep font-bold truncate block">
                  {block.currentHash}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Temporary Loading Block */}
        {isSealing && !shouldReduce && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.5 }}
            className="rounded-lg border border-dashed border-sand-deep/60 bg-cream/30 p-5 flex items-center justify-center min-h-[180px]"
          >
            <div className="text-center font-mono text-xs text-mist">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="inline-block h-5 w-5 border-2 border-clay border-t-transparent rounded-full mb-3"
              />
              <p>Appending CRT...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
