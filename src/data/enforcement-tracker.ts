// Source-linked FDA enforcement tracker entries.
// Every entry must cite a primary source (fda.gov) or be marked TODO_SOURCE.
// Reviewed date must be updated whenever entries are added or re-verified.

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

export const ENFORCEMENT_TRACKER_LAST_REVIEWED = '2026-07-01';

export const ENFORCEMENT_TRACKER: EnforcementEntry[] = [
  {
    id: 'ET-001',
    agency: 'FDA',
    market: 'Compounded GLP-1 / Telehealth',
    pattern: 'FDA-approved implication; brand-equivalence phrasing',
    severity: 'High',
    company: 'GLP-1 Solution',
    date: '2025-09-09',
    sourceUrl:
      'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/glp-1-solution-715883-09092025',
    status: 'Warning letter issued',
  },
  {
    id: 'ET-002',
    agency: 'FDA',
    market: 'Compounded GLP-1 / Telehealth',
    pattern: 'FDA-approved implication; clinically-proven phrasing',
    severity: 'High',
    company: 'MEDVi, LLC (dba MEDVi)',
    date: '2026-02-20',
    sourceUrl:
      'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/medvi-llc-dba-medvi-721455-02202026',
    status: 'Warning letter issued',
  },
  {
    id: 'ET-003',
    agency: 'FDA',
    market: 'Compounded GLP-1 / Outsourcing Facility',
    pattern: 'Unverified — source pending',
    severity: 'High',
    company: 'TODO_SOURCE — verify before publish',
    date: '2026-06-08',
    sourceUrl: 'TODO_SOURCE',
    status: 'Status not posted by FDA',
  },
];
