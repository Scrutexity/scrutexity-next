"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HoverProofLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  imageSrc?: string;
}

export function HoverProofLink({
  href,
  className,
  style,
  children,
  imageSrc = "/receipt-2.png",
}: HoverProofLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-sand-deep/30 bg-bone shadow-[0_20px_40px_-20px_rgba(28,24,20,0.5)]"
          >
            <div className="border-b border-sand-deep/20 bg-cream px-3 py-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-sage-deep">
                Proof Artifact Preview
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone">
              {/* Added blur and brightness adjustments to make it a "teaser" */}
              <Image
                src={imageSrc}
                alt="Proof Receipt Teaser"
                fill
                className="object-cover object-top blur-[1px] brightness-105 contrast-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bone/40 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
