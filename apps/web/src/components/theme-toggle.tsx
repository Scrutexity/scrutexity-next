'use client';

import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'scrutexity-theme';

/**
 * Inlined in <head> so the stored theme is applied before first paint.
 * Without this the page renders light, then snaps to dark on hydration.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    // Light is the canonical brand surface. Dark applies only when the
    // visitor has explicitly chosen it — we do not follow the OS by default.
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // Suppress transitions during the swap so colors cut over cleanly
  root.classList.add('theme-switching');
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  window.setTimeout(() => root.classList.remove('theme-switching'), 60);
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light';
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode) — theme still applies for this session */
      }
      return next;
    });
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light' : 'Dark'}
      className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-sand-deep/60 text-mist transition-colors hover:border-clay hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 ${className}`}
    >
      {/* Render a stable icon until mounted so SSR and client markup match */}
      {mounted && isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  );
}
