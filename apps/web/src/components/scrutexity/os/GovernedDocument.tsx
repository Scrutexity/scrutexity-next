import type { ReactNode } from 'react';

const SERIF = 'var(--font-instrument-serif), Georgia, serif';
const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

/**
 * GovernedDocument — the human-facing artifact (Risk Map, Owner Brief).
 *
 * Warm-ivory "architectural paper" with a faint grid, an editorial serif title,
 * and a terracotta ledger seal in the footer. Server-rendered (no client hooks).
 */
export function GovernedDocument({
  title,
  date,
  seal = '0x8f9a17f4e8d2',
  children,
}: {
  title: string;
  date: string;
  seal?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden border border-espresso/10 bg-bone p-8 shadow-[0_22px_70px_-50px_rgba(28,24,20,0.45)] sm:p-12">
      {/* Faint architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(28,24,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,24,20,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-espresso pb-6">
          <h3 className="text-3xl leading-none text-espresso sm:text-5xl" style={{ fontFamily: SERIF }}>
            {title}
          </h3>
          <span className="shrink-0 text-[10px] uppercase tracking-widest text-espresso/50" style={{ fontFamily: MONO }}>
            {date}
          </span>
        </div>

        <div className="mb-12 leading-relaxed text-espresso/90">{children}</div>

        {/* Ledger seal */}
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-espresso/10 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-clay" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-clay" style={{ fontFamily: MONO }}>
              Seal · {seal}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-espresso/40" style={{ fontFamily: MONO }}>
            Read-only analysis
          </span>
        </div>
      </div>
    </div>
  );
}

export default GovernedDocument;
