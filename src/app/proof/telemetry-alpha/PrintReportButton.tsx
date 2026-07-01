"use client";

import { Download } from "lucide-react";

export default function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#1C1C1C]/20 bg-[#1C1C1C] px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F8F4F0] transition-colors hover:bg-[#B86F4F] print:hidden"
    >
      <Download size={15} aria-hidden="true" />
      Export PDF
    </button>
  );
}
