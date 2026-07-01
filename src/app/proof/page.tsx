
import GovButton from '@/components/GovButton';
import Link from 'next/link';
import { ShieldCheck, FileText, Lock } from 'lucide-react';

export const metadata = {
  title: 'Proof | Scrutexity',
  description: 'How Scrutexity documents missed-demand recovery during the 14-day pilot. Verified client references available under NDA.',
};

// Illustrative sample of what a Day-14 owner brief contains.
// NOTE: This is a labeled demonstration, not a client result. Replace this whole
// block with a real, named, consented case study (video + redacted ledger) the
// moment one pilot owner agrees to go on record. Until then: nothing is presented as a real outcome.
const briefLineItems = [
  { source: 'Missed call · injectables inquiry', status: 'Booked consult', note: 'Routed to staff-approved follow-up' },
  { source: 'Abandoned booking form', status: 'Re-engaged', note: 'Deposit link sent, awaiting confirmation' },
  { source: 'Instagram DM · Morpheus8', status: 'Clinical question', note: 'Escalated to licensed staff — no AI advice sent' },
];

export default function Proof() {
  return (
    <div className="min-h-screen bg-ivory text-[#221f1b] font-sans selection:bg-terracotta/20">

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <p className="section-kicker text-center">Pilot artifacts</p>
        <h1 className="mt-4 text-center font-display text-5xl tracking-tight text-[#221f1b] md:text-6xl">
          Proof that reads like an owner brief, not an agency report.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-[#6b6259]">
          We don&rsquo;t publish hype. The buying signal is the artifact: what was surfaced,
          how it was routed, and what you could verify yourself. Estimates require manual verification.
        </p>

        {/* Illustrative brief — clearly labeled */}
        <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-[#e1d4c5] bg-[#fffaf2] shadow-[0_24px_70px_rgba(85,62,41,0.10)]">
          <div className="flex items-center justify-between border-b border-[#e1d4c5] bg-[#f3eadf] px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-terracotta" />
              <span className="font-display text-xl text-[#221f1b]">Sample Day-14 Owner Brief</span>
            </div>
            <span className="rounded-full border border-terracotta/30 bg-terracotta/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#9b6a51]">
              Illustrative
            </span>
          </div>

          <div className="divide-y divide-[#efe2d2]">
            {briefLineItems.map((item) => (
              <div key={item.source} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#221f1b]">{item.source}</p>
                  <p className="text-sm text-[#7a7066]">{item.note}</p>
                </div>
                <span className="mt-1 shrink-0 rounded-full bg-[#eef3ea] px-3 py-1 text-xs font-semibold text-[#607461] sm:mt-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <p className="border-t border-[#e1d4c5] bg-[#fbf7ef] px-6 py-4 text-xs leading-6 text-[#7a7066]">
            Illustrative structure only — not a client outcome. Every line in a real brief is tied to source,
            transcript, and booking status. Figures are estimates requiring manual verification.
          </p>
        </div>

        {/* Verified references — the honest trust signal */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: 'BAA-ready', b: 'Business Associate terms handled before any patient-adjacent workflow goes live.' },
            { icon: Lock, t: 'References under NDA', b: 'Active pilot clinics will speak with serious, qualified owners directly. Ask on your fit call.' },
            { icon: FileText, t: 'You own the record', b: 'Transcripts, briefs, and routing rules stay yours — not locked in a retainer.' },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-[#e1d4c5] bg-[#fffaf2]/76 p-6">
              <c.icon className="h-6 w-6 text-terracotta" />
              <h3 className="mt-4 font-semibold text-[#221f1b]">{c.t}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5f574f]">{c.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e1d4c5] bg-[#f3eadf] p-8 sm:flex-row">
          <p className="text-base font-semibold text-[#221f1b]">Want a brief like this for your own practice?</p>
          <GovButton href="/pilot" className="btn-md">
            Start the 14-day pilot &rarr;
          </GovButton>
        </div>
      </main>
    </div>
  );
}
