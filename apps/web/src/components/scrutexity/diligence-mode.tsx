'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Volume2, VolumeX } from 'lucide-react';
import { useSound } from './sound-provider';
import { cn } from '@/lib/utils';

/**
 * DiligenceMode — highest conversion-leverage item.
 *
 * Toggles between two visual registers for the two distinct buyers:
 * - Clinic mode (default): warm, cinematic, emotional revenue-recovery framing
 * - Diligence mode (PE/operator): cooler palette, reduced motion, denser data,
 *   audit-trail emphasis, multi-location framing
 *
 * The toggle itself signals "we know who's actually signing this contract."
 */

interface ModeContextValue {
  diligence: boolean;
  toggle: () => void;
}

const ModeContext = createContext<ModeContextValue>({
  diligence: false,
  toggle: () => {},
});

export const useDiligenceMode = () => useContext(ModeContext);

export function DiligenceModeProvider({ children }: { children: React.ReactNode }) {
  const [diligence, setDiligence] = useState(false);

  useEffect(() => {
    // Apply diligence mode to the document root
    if (diligence) {
      document.documentElement.classList.add('diligence-mode');
    } else {
      document.documentElement.classList.remove('diligence-mode');
    }
  }, [diligence]);

  const toggle = () => setDiligence((v) => !v);

  return (
    <ModeContext.Provider value={{ diligence, toggle }}>
      {children}
    </ModeContext.Provider>
  );
}

/**
 * The floating toggle — sits in the bottom-left, above the scroll-chrome bar.
 * Shows the current mode + sound toggle.
 */
export function DiligenceModeToggle() {
  const { diligence, toggle } = useDiligenceMode();
  const { enabled: soundOn, toggle: toggleSound } = useSound();

  return (
    <div className="fixed bottom-[72px] left-4 z-40 flex flex-col gap-2">
      {/* Diligence mode toggle */}
      <button
        onClick={toggle}
        className={cn(
          'group flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md transition-all',
          diligence
            ? 'bg-ink/90 border-ink text-ivory'
            : 'paper-glass border-sand-deep/50 text-mist hover:text-ink'
        )}
        aria-label={diligence ? 'Switch to clinic mode' : 'Switch to diligence mode'}
        title={diligence ? 'Diligence mode — cooler, data-forward' : 'Clinic mode — warm, cinematic'}
      >
        <Eye size={14} strokeWidth={1.8} className={diligence ? 'text-gold' : ''} />
        <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
          {diligence ? 'Diligence' : 'Clinic'}
        </span>
      </button>

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className={cn(
          'flex items-center justify-center rounded-full border w-[34px] h-[34px] backdrop-blur-md transition-all',
          soundOn
            ? 'bg-sage/90 border-sage text-cream'
            : 'paper-glass border-sand-deep/50 text-mist hover:text-ink'
        )}
        aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
        title={soundOn ? 'Sound on' : 'Sound off'}
      >
        {soundOn ? <Volume2 size={14} strokeWidth={1.8} /> : <VolumeX size={14} strokeWidth={1.8} />}
      </button>
    </div>
  );
}
