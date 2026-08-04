'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const CHECKLIST_SECTIONS = [
  {
    label: 'Supplier identity',
    fields: [
      { field: 'Supplier name', example: 'Shenzhen Idea Light Co., Ltd' },
      { field: 'Factory location', example: 'Shenzhen, Guangdong, China' },
      { field: 'Product model(s)', example: 'RL-1000, RL-2000' },
      { field: 'Device category', example: 'Red-light therapy panel / hair-growth cap' },
    ],
  },
  {
    label: 'Regulatory & FDA status',
    fields: [
      { field: 'FDA registration/listing status', example: 'Registered, FEI number on file' },
      { field: '510(k) number or exemption rationale', example: 'K213025 (predicate) / 510(k) exempt under 21 CFR 890.xxxx' },
      { field: 'U.S. agent name and contact', example: 'Name, email, phone on file' },
      { field: 'Intended use as filed vs as marketed', example: 'Cleared for androgenic alopecia — not marketed for alopecia areata' },
    ],
  },
  {
    label: 'Documentation & quality',
    fields: [
      { field: 'QMS documentation (ISO 13485, etc.)', example: 'ISO 13485:2016 cert on file, valid through 2027' },
      { field: 'Labeling files (device, packaging, IFU)', example: 'English labeling reviewed; IFU matches cleared indications' },
      { field: 'Claims library (what the supplier says publicly)', example: '6 claims from catalog; 4 match cleared use, 2 need qualification' },
      { field: 'Test reports (safety, EMC, biocompatibility)', example: 'IEC 60601-1-2, ISO 10993 filed' },
      { field: 'Sample QA process', example: 'Pre-shipment inspection protocol agreed; AQL 1.0' },
    ],
  },
  {
    label: 'Commercial & logistics',
    fields: [
      { field: 'Country-of-origin marking readiness', example: 'Product and packaging marked "Made in China"' },
      { field: 'Warranty / replacement terms', example: '1-year manufacturer warranty, DOA replacement within 30 days' },
      { field: 'MOQ (minimum order quantity)', example: '50 units per model, mixable across 3 SKUs' },
      { field: 'Lead time', example: '30 days from confirmed order, FOB Shenzhen' },
    ],
  },
];

export function SupplierDiligenceChecklist() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setOpenSection(openSection === label ? null : label);
  };

  return (
    <div className="rounded-2xl border border-sand-deep/30 bg-bone overflow-hidden">
      <div className="px-6 py-5 border-b border-sand-deep/20 bg-cream/50">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-sage-deep shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-sage-deep font-semibold">
              Supplier Diligence Checklist
            </p>
            <p className="text-xs text-mist mt-0.5">
              16 fields across 4 sections. Documentation framework, not supplier approval.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-sand-deep/15">
        {CHECKLIST_SECTIONS.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-cream/50 transition-colors"
            >
              <span className="font-semibold text-sm text-espresso">{section.label}</span>
              <ChevronDown
                size={16}
                className={`text-mist shrink-0 transition-transform duration-300 ${
                  openSection === section.label ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openSection === section.label && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 space-y-3">
                    {section.fields.map((item) => (
                      <div key={item.field} className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 py-2 border-b border-sand-deep/10 last:border-0">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-sage-deep mt-0.5 shrink-0" />
                          <span className="text-xs text-espresso font-medium">{item.field}</span>
                        </div>
                        <span className="text-xs text-mist/70 ml-5 sm:ml-0 italic">{item.example}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-cream/60 border-t border-sand-deep/15">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-mist shrink-0 mt-0.5" />
          <p className="text-[10px] text-mist/60 leading-relaxed">
            This checklist is a documentation framework, not a supplier approval or regulatory certification.
            Completing it means you asked the right questions — not that the answers were independently verified.
            Consult qualified legal, regulatory, and customs professionals before committing to any supplier or import.
          </p>
        </div>
      </div>
    </div>
  );
}
