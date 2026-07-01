'use client';
 
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { MouseEvent, useRef } from 'react';
 
export default function AtmosphericAirlock({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
 
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
 
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
 
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${smoothX}px ${smoothY}px,
      rgba(107, 133, 118, 0.05), 
      transparent 80%
    )
  `;
 
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#FBFBFA] overflow-hidden group border-y border-[#E5E3DF]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background }}
      />
 
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(26,26,26,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
 
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
