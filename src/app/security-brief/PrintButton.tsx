'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#b9825f] px-6 py-3 text-sm font-semibold text-[#fffaf2] shadow-[0_12px_30px_-10px_rgba(185,130,95,0.65)] transition duration-200 hover:bg-[#a66f4f] focus:outline-none focus:ring-2 focus:ring-[#b9825f] focus:ring-offset-2 focus:ring-offset-[#fbf7ef]"
    >
      <Printer className="h-4 w-4" />
      Download PDF
    </button>
  );
}
