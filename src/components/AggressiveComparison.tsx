'use client';
import { Reveal } from './Reveal';

const rows = [
  { label: 'Recovers missed calls',       scrutexity: true,  crm: false, agency: false, nothing: false },
  { label: 'Recovers no-shows',           scrutexity: true,  crm: false, agency: false, nothing: false },
  { label: 'Recovers after-hours DMs',    scrutexity: true,  crm: false, agency: false, nothing: false },
  { label: 'Integrates with Boulevard',   scrutexity: true,  crm: true,  agency: false, nothing: true  },
  { label: '$0 if it doesn\'t work',      scrutexity: true,  crm: false, agency: false, nothing: true  },
];

const cols = [
  { key: 'scrutexity', label: 'Scrutexity', highlight: true },
  { key: 'crm',        label: 'Your CRM',   highlight: false },
  { key: 'agency',     label: 'Your Agency',highlight: false },
  { key: 'nothing',    label: 'Doing Nothing', highlight: false },
] as const;

function Cell({ ok, highlight }: { ok: boolean; highlight: boolean }) {
  return (
    <td className={`px-6 py-4 text-center text-base ${highlight ? 'bg-white' : ''}`}>
      {ok ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f0ebe2] text-[0.7rem] font-bold text-[#8a5a2e]">✓</span>
      ) : (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f5ece9] text-[0.7rem] font-bold text-[#9a4a33]">✕</span>
      )}
    </td>
  );
}

export default function AggressiveComparison() {
  return (
    <section id="compare" className="bg-[#f4ecdf] py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-[1160px]">
        <Reveal className="max-w-[50ch] mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
            The real choice on the table
          </span>
          <h2 className="mt-3 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[2.8rem]">
            Compare us to what you actually have.
          </h2>
          <p className="mt-4 text-[1.08rem] text-[#6b6259]">
            Not some hypothetical platform. Your CRM. Your agency. The status quo.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto rounded-[20px] border border-[#e1d4c5] shadow-[0_1px_2px_rgba(44,36,24,.04),0_14px_36px_-16px_rgba(44,36,24,.12)]">
            <table className="w-full min-w-[560px] border-collapse bg-[#fffaf2]">
              <thead>
                <tr className="border-b border-[#e1d4c5]">
                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6259]" />
                  {cols.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-5 text-center text-sm font-semibold ${
                        col.highlight
                          ? 'bg-white text-[#221f1b] border-x border-[#e1d4c5]'
                          : 'text-[#786e63]'
                      }`}
                    >
                      {col.highlight ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-terracotta" />
                          {col.label}
                        </span>
                      ) : col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[#e1d4c5] last:border-0 ${i % 2 === 1 ? 'bg-[#faf6ef]' : ''}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#3d3731]">{row.label}</td>
                    <Cell ok={row.scrutexity} highlight />
                    <Cell ok={row.crm} highlight={false} />
                    <Cell ok={row.agency} highlight={false} />
                    <Cell ok={row.nothing} highlight={false} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
