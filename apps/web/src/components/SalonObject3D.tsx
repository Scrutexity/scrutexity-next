'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SalonObjectCanvas = dynamic(() => import('@/components/SalonObjectCanvas'), { ssr: false, loading: () => null });
const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export default function SalonObject3D() {
  const [desktopMotion, setDesktopMotion] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeout = 0;
    const schedule = () => {
      window.clearTimeout(timeout);
      if (!desktop.matches || reduced.matches) {
        setDesktopMotion(false);
        return;
      }
      timeout = window.setTimeout(() => setDesktopMotion(true), performanceMode ? 3500 : 1200);
    };
    schedule();
    desktop.addEventListener('change', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.clearTimeout(timeout);
      desktop.removeEventListener('change', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

  if (!enabled || !desktopMotion) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed bottom-5 right-5 z-10 hidden h-40 w-40 overflow-hidden rounded-full opacity-40 md:block">
      <SalonObjectCanvas />
    </div>
  );
}
