'use client';

import type { MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RevenueFlowCanvas = dynamic(() => import('@/components/RevenueFlowCanvas'), { ssr: false });

type MousePosition = { x: number; y: number };

interface DeviceCapabilities {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isLowEndGpu: boolean;
  canUseWebGL: boolean;
  particleCount: number;
}

interface DeviceDetectionProps {
  scrollProgress: MotionValue<number> | number;
  mousePosition: MousePosition;
}

function detectWebGL() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  return { canvas, gl };
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    prefersReducedMotion: false,
    isLowEndGpu: false,
    canUseWebGL: false,
    particleCount: 800,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const { gl } = detectWebGL();
      const renderer = gl?.getParameter(gl.RENDERER)?.toString().toLowerCase() ?? '';
      const maxTextureSize = gl?.getParameter(gl.MAX_TEXTURE_SIZE) ?? 0;
      const weakRenderer = /swiftshader|llvmpipe|software|intel hd graphics 4000/.test(renderer);
      const lowMemory = 'deviceMemory' in navigator && Number(navigator.deviceMemory) <= 4;
      const lowEndGpu = weakRenderer || maxTextureSize < 8192 || lowMemory;
      const isMobile = mobileQuery.matches;

      setCapabilities({
        isMobile,
        prefersReducedMotion: reducedMotionQuery.matches,
        isLowEndGpu: lowEndGpu,
        canUseWebGL: Boolean(gl) && !isMobile,
        particleCount: lowEndGpu ? 200 : 800,
      });
    };

    update();
    mobileQuery.addEventListener('change', update);
    reducedMotionQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      reducedMotionQuery.removeEventListener('change', update);
    };
  }, []);

  return capabilities;
}

export function StaticRevenueGradient() {
  return (
    <div
      aria-hidden="true"
      className="flow-static-gradient absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,125,107,0.24),transparent_28%),radial-gradient(circle_at_76%_34%,rgba(47,93,74,0.18),transparent_30%),radial-gradient(circle_at_50%_82%,rgba(232,224,216,0.50),transparent_34%),linear-gradient(135deg,#F5F0E8_0%,#EFE6D7_46%,#FFF8F2_100%)]"
    />
  );
}

export default function DeviceDetection({ scrollProgress, mousePosition }: DeviceDetectionProps) {
  const { canUseWebGL, prefersReducedMotion, particleCount } = useDeviceCapabilities();

  if (!canUseWebGL) return <StaticRevenueGradient />;

  return (
    <RevenueFlowCanvas
      scrollProgress={scrollProgress}
      mousePosition={mousePosition}
      particleCount={particleCount}
      reduceMotion={prefersReducedMotion}
    />
  );
}
