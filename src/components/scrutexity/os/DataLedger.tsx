import type { ReactNode } from 'react';

const MONO = 'var(--font-jetbrains-mono), ui-monospace, Menlo, Monaco, monospace';

/**
 * DataLedger — the system-facing artifact (claim_scan.json, proof_block.tsx).
 *
 * A deep-espresso "governed terminal" with a warm syntax palette — clay strings,
 * bone keys, sage values — instead of harsh neon highlighting. Server-rendered.
 * Pass `children` to supply your own colorized payload; otherwise an illustrative
 * claim-scan record is shown (all clinical figures are bracketed placeholders).
 */
export function DataLedger({ filename, children }: { filename: string; children?: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-bone/10 bg-espresso shadow-[inset_0_1px_0_rgba(248,243,234,0.05)]">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-bone/5 bg-bone/5 px-5 py-3">
        <span className="text-xs tracking-[0.2em] text-bone/60" style={{ fontFamily: MONO }}>
          {filename}
        </span>
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bone/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-bone/10" />
        </div>
      </div>

      {/* Code payload */}
      <div className="overflow-x-auto p-5 sm:p-6">
        <pre className="text-[13px] leading-relaxed" style={{ fontFamily: MONO }}>
          <code className="text-bone/80">{children ?? <DefaultPayload />}</code>
        </pre>
      </div>
    </div>
  );
}

/** Illustrative claim-scan record — warm syntax, placeholder data. */
function DefaultPayload() {
  const key = 'text-bone';
  const str = 'text-clay';
  const val = 'text-sage';
  return (
    <>
      {'{\n'}
      {'  '}
      <span className={key}>&quot;artifact_id&quot;</span>: <span className={str}>&quot;CS-118&quot;</span>,{'\n'}
      {'  '}
      <span className={key}>&quot;status&quot;</span>: <span className={str}>&quot;UNSUPPORTED&quot;</span>,{'\n'}
      {'  '}
      <span className={key}>&quot;claim&quot;</span>: <span className={str}>&quot;Lose 20 lbs in your first month&quot;</span>,{'\n'}
      {'  '}
      <span className={key}>&quot;confidence&quot;</span>: <span className={val}>0.94</span>,{'\n'}
      {'  '}
      <span className={key}>&quot;evidence_linked&quot;</span>: <span className={val}>false</span>,{'\n'}
      {'  '}
      <span className={key}>&quot;proxy_rewrite&quot;</span>:{' '}
      <span className={str}>&quot;In the [ILLUSTRATIVE_TRIAL] trial…&quot;</span>
      {'\n'}
      {'}'}
    </>
  );
}

export default DataLedger;
