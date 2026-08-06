"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * HashShuffle — progressive character-shuffle for hash/timestamp data.
 * Runs only when a real final string is passed (dormant honesty guardrail:
 * the homepage never passes one, so this never fakes a digest).
 * Uses useAnimationFrame — no interval thrash, locks in characters
 * left-to-right, then settles.
 */
export function HashShuffle({
  finalHash,
  durationMs = 800,
}: {
  finalHash: string;
  durationMs?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(true);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    setIsScrambling(true);
    startTime.current = null;
  }, [finalHash]);

  useAnimationFrame((time) => {
    if (!isScrambling) return;
    if (startTime.current === null) startTime.current = time;
    const elapsed = time - startTime.current;
    if (elapsed >= durationMs) {
      setDisplayText(finalHash);
      setIsScrambling(false);
      return;
    }
    const scrambled = finalHash
      .split("")
      .map((char, index) => {
        const lockTime = (durationMs / finalHash.length) * index;
        if (elapsed > lockTime) return char;
        return CHARSET[Math.floor(Math.random() * CHARSET.length)];
      })
      .join("");
    setDisplayText(scrambled);
  });

  return (
    <motion.span
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex max-w-[220px] items-center rounded-full border border-sand-deep bg-cream px-3 py-1 font-mono text-[12px] font-medium tracking-tight text-teal-deep md:max-w-[300px]"
    >
      {displayText || finalHash}
    </motion.span>
  );
}
