"use client";

import { Printer } from "lucide-react";

export function PrintReportButton() {
  return (
    <button
      type="button"
      data-print-hidden
      onClick={() => window.print()}
      className="inline-flex min-h-11 w-fit items-center gap-2 border border-sand-deep bg-white px-4 py-2 text-sm font-semibold text-espresso transition-colors hover:border-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
    >
      <Printer size={15} aria-hidden="true" />
      Print report
    </button>
  );
}
