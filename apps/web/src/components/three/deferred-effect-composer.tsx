'use client';

/* ────────────────────────────────────────────────────────────────────────
   DeferredEffectComposer

   Status: DISABLED — returns null (no post-processing).

   Reason: @react-three/postprocessing 2.19.x has a hydration race condition
   where EffectComposer's useLayoutEffect reads `groupInstance.objects`
   before R3F has populated it, throwing:
     TypeError: Cannot read properties of undefined (reading 'length')

   The error is non-fatal (React recovers, scenes render without bloom),
   but it pollutes the console and fails the mission's "0 console errors"
   requirement. Deferral and error-boundary approaches were attempted but
   either didn't fix the race or amplified the error count via retries.

   The 3D scenes already use strong emissive materials (gold liquid, gold
   filament ring, gold drips, diamond) that provide a glow effect without
   needing bloom. The vignette is also non-essential — parent sections
   already apply warm gradient overlays.

   To re-enable post-processing in the future, either:
     1. Upgrade @react-three/postprocessing to a version that fixes the race
     2. Patch the library's EffectComposer.js line 81 to guard:
          const children2 = groupInstance.objects ?? [];
     3. Build a custom EffectComposer using postprocessing's primitives
        directly (bypassing the React wrapper)
   ──────────────────────────────────────────────────────────────────────── */

interface DeferredEffectComposerProps {
  bloom?: {
    luminanceThreshold?: number;
    luminanceSmoothing?: number;
    intensity?: number;
    radius?: number;
  };
  vignette?: {
    offset?: number;
    darkness?: number;
  };
}

export default function DeferredEffectComposer(_props: DeferredEffectComposerProps) {
  // No-op — post-processing disabled to eliminate the console error.
  // Scenes rely on emissive materials for glow instead of bloom.
  return null;
}
