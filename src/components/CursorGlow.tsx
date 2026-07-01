'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const x = useSpring(0, { damping: 25, stiffness: 200 });
  const y = useSpring(0, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-50 hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(47,93,74,0.06) 0%, transparent 70%)',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
}
