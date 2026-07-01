'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const WebGLScene = dynamic(() => import('@/components/WebGLScene'), {
  ssr: false,
  loading: () => null,
});

const enabled = process.env.NEXT_PUBLIC_ENABLE_2026_UI === 'true';
const performanceMode = process.env.NEXT_PUBLIC_2026_PERFORMANCE_MODE === 'true';

export default function WebGLBackground() {
  const [canRender, setCanRender] = useState(false);
  const pathname = usePathname();
  const density = pathname === '/revenue-leak-audit' ? 'low' : 'standard';

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    let delayTimer = 0;
    let idleCallback = 0;

    const initialize = () => {
      const canvas = document.createElement('canvas');
      const webgl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
      const shouldRender = !reduced.matches && desktop.matches && Boolean(webgl);
      setCanRender(shouldRender);
      if (shouldRender) console.info('WebGL background delayed after LCP');
    };

    const schedule = () => {
      window.clearTimeout(delayTimer);
      if ('cancelIdleCallback' in window && idleCallback) window.cancelIdleCallback(idleCallback);
      if (reduced.matches || !desktop.matches) {
        setCanRender(false);
        return;
      }
      delayTimer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleCallback = window.requestIdleCallback(initialize, { timeout: 1500 });
        } else {
          initialize();
        }
      }, performanceMode ? 2500 : 500);
    };

    schedule();
    reduced.addEventListener('change', schedule);
    desktop.addEventListener('change', schedule);
    return () => {
      window.clearTimeout(delayTimer);
      if ('cancelIdleCallback' in window && idleCallback) window.cancelIdleCallback(idleCallback);
      reduced.removeEventListener('change', schedule);
      desktop.removeEventListener('change', schedule);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(244,194,215,0.22),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(194,174,232,0.20),transparent_34%),linear-gradient(135deg,#fbf7ef,#f7f0e9)]"
    >
      {canRender && <WebGLScene density={density} />}
    </div>
  );
}
