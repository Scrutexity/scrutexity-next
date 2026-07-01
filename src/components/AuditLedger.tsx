'use client';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AuditLedger({ clinicId }: { clinicId: string }) {
  const { data, error } = useSWR(`/api/ledger?clinic_id=${clinicId}`, fetcher, { refreshInterval: 60000 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (error) return <div className="text-red-500 font-mono text-sm">Failed to load recovery record.</div>;
  if (!data) return <div className="text-slate-400 font-mono text-sm">Loading your recovery record...</div>;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-4xl font-mono text-sm shadow-2xl">
      <h3 className="text-slate-100 font-semibold mb-4 tracking-tight">Intent Ledger (60-Second Governance Proof)</h3>
      <div className="space-y-2">
        {data.map((event: any) => (
          <div 
            key={event.id} 
            className="bg-slate-900 border border-slate-800 rounded p-4 cursor-pointer hover:bg-slate-800 transition-colors" 
            onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
          >
            <div className="flex justify-between text-slate-300 items-center">
              <span className="font-medium text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {event.event_type.toUpperCase()}
              </span>
              <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
            </div>
            {expandedId === event.id && (
              <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500 break-all leading-relaxed">
                <p><strong className="text-slate-400">Cryptographic Hash:</strong> {event.governance_hash}</p>
                <p className="mt-1"><strong className="text-slate-400">Enforced Action:</strong> {event.risk_flags.length > 0 ? 'ROUTED_TO_CLINICAL_STAFF' : 'LOGGED_AND_VERIFIED'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
