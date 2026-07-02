// Source-linked FDA enforcement tracker entries.
// Every entry must cite a primary source (fda.gov) or be marked TODO_SOURCE.
// Reviewed date must be updated whenever entries are added or re-verified.
//
// Wave-level pattern descriptions come from the letters themselves and FDA's
// announcement of each wave; do not add per-company specifics without reading
// the individual letter. All 20 sourceUrls verified HTTP 200 on 2026-07-02.

export interface EnforcementEntry {
  id: string;
  agency: string;
  market: string;
  pattern: string;
  severity: 'High' | 'Medium' | 'Low';
  sourceUrl: string;
  status: string;
  company: string; // display name
  date: string;    // ISO date of the letter
}

export const ENFORCEMENT_TRACKER_LAST_REVIEWED = '2026-07-02';

const WL_BASE =
  'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters';

const SEPT_2025_PATTERN =
  'False/misleading compounded GLP-1 claims; implied equivalence to FDA-approved drugs (FD&C Act §502(a), §502(bb))';
const JUNE_2026_PATTERN =
  'False/misleading claims for compounded semaglutide/tirzepatide (FD&C Act §502(a), §502(bb))';
const TELEHEALTH_MARKET = 'Compounded GLP-1 / Telehealth';

export const ENFORCEMENT_TRACKER: EnforcementEntry[] = [
  // ── September 9, 2025 wave — FDA warned telehealth companies over
  //    compounded GLP-1 marketing claims. ─────────────────────────────
  {
    id: 'ET-001',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: 'FDA-approved implication; brand-equivalence phrasing',
    severity: 'High',
    company: 'GLP-1 Solution',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/glp-1-solution-715883-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-002',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'Hims & Hers Health, Inc. (dba Hers)',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/hims-hers-health-inc-dba-hers-716825-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-003',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'JulyMD',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/julymd-716828-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-004',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'Lumimeds',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/lumimeds-716510-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-005',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'GenLabMeds',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/genlabmeds-713650-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-006',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'The HCG Institute',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/hcg-institute-716512-09092025`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-007',
    agency: 'FDA',
    market: 'Compounded GLP-1 / Med Spa & Wellness',
    pattern: SEPT_2025_PATTERN,
    severity: 'High',
    company: 'Body Good Studio',
    date: '2025-09-09',
    sourceUrl: `${WL_BASE}/body-good-studio-716460-09092025`,
    status: 'Warning letter issued',
  },

  // ── February 2026 ────────────────────────────────────────────────────
  {
    id: 'ET-008',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: 'FDA-approved implication; clinically-proven phrasing',
    severity: 'High',
    company: 'MEDVi, LLC (dba MEDVi)',
    date: '2026-02-20',
    sourceUrl: `${WL_BASE}/medvi-llc-dba-medvi-721455-02202026`,
    status: 'Warning letter issued',
  },

  // ── June 8, 2026 wave — 25 warning letters to telehealth companies
  //    over compounded semaglutide/tirzepatide website claims. ─────────
  {
    id: 'ET-009',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Trinity HealthCare Supply, LLC (dba altRx)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/trinity-healthcare-supply-llc-dba-altrx-728236-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-010',
    agency: 'FDA',
    market: 'Compounded GLP-1 / Weight Loss Clinic',
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Medica Weight Loss',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/medica-weight-loss-728284-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-011',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Momentum Health 360 (dba Momentum Health)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/momentum-health-360-dba-momentum-health-728286-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-012',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'NativeMed LLC',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/nativemed-llc-dba-nativemed-728287-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-013',
    agency: 'FDA',
    market: 'Compounded GLP-1 / IV & Wellness',
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'HydraMed IV LLC (dba HydraMed)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/hydramed-iv-llc-dba-hydramed-728282-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-014',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Nexus Health Solutions LLC (dba Harper Meds)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/nexus-health-solutions-llc-dba-harper-meds-728281-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-015',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'FitRX, LLC (dba AM RX)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/fitrx-llc-dba-am-rx-728275-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-016',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Altru Telehealth, LLC',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/altru-telehealth-llc-dba-altru-telehealth-728274-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-017',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Eden Health International Inc. (dba Eden)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/eden-health-international-inc-dba-eden-728279-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-018',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Amie Health, Inc. (dba Amie)',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/amie-health-inc-dba-amie-728276-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-019',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'Thrivelab Co.',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/thrivelab-co-dba-thrivelab-728294-06082026`,
    status: 'Warning letter issued',
  },
  {
    id: 'ET-020',
    agency: 'FDA',
    market: TELEHEALTH_MARKET,
    pattern: JUNE_2026_PATTERN,
    severity: 'High',
    company: 'VivioMD Group LLC',
    date: '2026-06-08',
    sourceUrl: `${WL_BASE}/viviomd-group-llc-dba-viviomd-728295-06082026`,
    status: 'Warning letter issued',
  },
];
