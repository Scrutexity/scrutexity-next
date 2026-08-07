import Database from 'better-sqlite3';
import path from 'path';
import { existsSync } from 'fs';

// ── Database Path ──
const dbPath = path.join(process.cwd(), 'telemetry.db');
let db: any;
try {
  if (process.env.VERCEL && !existsSync(dbPath)) {
    console.warn("Serverless environment detected without telemetry.db. Operating in stub mode.");
    db = new Proxy({}, { 
      get: () => () => new Proxy({}, { 
        get: (target, prop) => {
          if (prop === 'all') return () => [];
          if (prop === 'get') return () => null;
          if (prop === 'run') return () => {};
          return () => {};
        }
      }) 
    });
  } else {
    db = new Database(dbPath);
  }
} catch (error) {
  console.warn("Failed to initialize local sqlite database. Operating in stub mode.", error);
  db = new Proxy({}, { get: () => () => ({ all: ()=>[], get: ()=>null, run: ()=>{} }) });
}

// ── TypeScript Contracts ──

export interface ScanRecord {
  scan_id: string;
  scanned_url: string;
  scanned_at: string;
  status: 'pending' | 'complete' | 'failed';
}

export interface ClaimRisk {
  id: number;
  scan_id: string;
  claim_text: string;
  severity_score: number;
  regulatory_triggers: string[];
  visible_citation: boolean;
  drift_detected: boolean;
  drift_context: string | null;
  safer_wording: string | null;
}

export interface LeadRecord {
  id: number;
  scan_id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface ClaimRiskInput {
  claim_text: string;
  severity_score: number;
  regulatory_triggers_found: string[];
  visible_citation_present: boolean;
  drift_detected: boolean;
  drift_context: string | null;
  safer_wording: string | null;
}

// ── Schema Initialization ──
db.exec(`
  CREATE TABLE IF NOT EXISTS telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    claimHealthScore INTEGER NOT NULL,
    unsupportedLanguageCount INTEGER NOT NULL,
    proofArtifactsCount INTEGER NOT NULL,
    aiAnswerSurfacesCount INTEGER NOT NULL,
    recoveryWorkflowsCount INTEGER NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS scans (
    scan_id TEXT PRIMARY KEY,
    scanned_url TEXT NOT NULL,
    scanned_at TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'complete', 'failed'))
  );

  CREATE TABLE IF NOT EXISTS claim_risks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id TEXT NOT NULL,
    claim_text TEXT NOT NULL,
    severity_score INTEGER NOT NULL,
    regulatory_triggers TEXT NOT NULL,
    visible_citation INTEGER NOT NULL DEFAULT 0,
    drift_detected INTEGER NOT NULL DEFAULT 0,
    drift_context TEXT,
    safer_wording TEXT,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS cms_audit_logs (
    document_id TEXT PRIMARY KEY,
    author_name TEXT DEFAULT 'unknown',
    author_role TEXT DEFAULT 'unknown',
    scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ── Telemetry ──
const stmt = db.prepare('SELECT COUNT(*) as count FROM telemetry');
const row = stmt.get() as { count: number };

if (row.count === 0) {
  const insert = db.prepare(`
    INSERT INTO telemetry (
      claimHealthScore, unsupportedLanguageCount, proofArtifactsCount,
      aiAnswerSurfacesCount, recoveryWorkflowsCount
    ) VALUES (?, ?, ?, ?, ?)
  `);
  insert.run(84, 2, 6, 5, 3);
}

export function getTelemetryData() {
  const query = db.prepare('SELECT * FROM telemetry ORDER BY updatedAt DESC LIMIT 1');
  return query.get() as {
    claimHealthScore: number;
    unsupportedLanguageCount: number;
    proofArtifactsCount: number;
    aiAnswerSurfacesCount: number;
    recoveryWorkflowsCount: number;
    updatedAt: string;
  };
}

// ── Scans CRUD ──

const insertScanStmt = db.prepare(
  'INSERT INTO scans (scan_id, scanned_url, scanned_at, status) VALUES (?, ?, ?, ?)',
);
const updateScanStatusStmt = db.prepare(
  'UPDATE scans SET status = ? WHERE scan_id = ?',
);
const getScanStmt = db.prepare('SELECT * FROM scans WHERE scan_id = ?');
const getAllScansStmt = db.prepare('SELECT * FROM scans ORDER BY scanned_at DESC');
const getRisksByScanStmt = db.prepare(
  'SELECT * FROM claim_risks WHERE scan_id = ? ORDER BY severity_score DESC',
);
const insertRiskStmt = db.prepare(`
  INSERT INTO claim_risks
    (scan_id, claim_text, severity_score, regulatory_triggers, visible_citation, drift_detected, drift_context, safer_wording)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

export function createScan(scanId: string, url: string, timestamp: string): void {
  insertScanStmt.run(scanId, url, timestamp, 'pending');
}

export function updateScanStatus(scanId: string, status: 'complete' | 'failed'): void {
  updateScanStatusStmt.run(status, scanId);
}

export function getScan(scanId: string): ScanRecord | undefined {
  return getScanStmt.get(scanId) as ScanRecord | undefined;
}

export function getAllScans(): ScanRecord[] {
  return getAllScansStmt.all() as ScanRecord[];
}

export function getRisksByScan(scanId: string): ClaimRisk[] {
  const rows = getRisksByScanStmt.all(scanId) as Array<Record<string, unknown>>;
  return rows.map(deserializeRisk);
}

export function insertRisks(scanId: string, risks: ClaimRiskInput[]): void {
  const insertMany = db.transaction((items: ClaimRiskInput[]) => {
    for (const r of items) {
      insertRiskStmt.run(
        scanId,
        r.claim_text,
        r.severity_score,
        JSON.stringify(r.regulatory_triggers_found),
        r.visible_citation_present ? 1 : 0,
        r.drift_detected ? 1 : 0,
        r.drift_context ?? null,
        r.safer_wording ?? null,
      );
    }
  });
  insertMany(risks);
}

function deserializeRisk(row: Record<string, unknown>): ClaimRisk {
  return {
    id: row.id as number,
    scan_id: row.scan_id as string,
    claim_text: row.claim_text as string,
    severity_score: row.severity_score as number,
    regulatory_triggers: JSON.parse(row.regulatory_triggers as string) as string[],
    visible_citation: Boolean(row.visible_citation),
    drift_detected: Boolean(row.drift_detected),
    drift_context: row.drift_context as string | null,
    safer_wording: row.safer_wording as string | null,
  };
}

// ── Leads CRUD ──

const insertLeadStmt = db.prepare(
  'INSERT INTO leads (scan_id, email, name, created_at) VALUES (?, ?, ?, ?)',
);

export function insertLead(scanId: string, email: string, name: string | null): void {
  insertLeadStmt.run(scanId, email, name ?? null, new Date().toISOString());
}

// ── Webhook Ingestion CRUD ──

const insertCmsAuditLogStmt = db.prepare(`
  INSERT INTO cms_audit_logs (document_id, author_name, author_role)
  VALUES (?, ?, ?)
  ON CONFLICT(document_id) DO UPDATE SET
    author_name = excluded.author_name,
    author_role = excluded.author_role,
    scanned_at = CURRENT_TIMESTAMP
`);

export function insertCmsAuditLog(documentId: string, name: string, role: string): void {
  insertCmsAuditLogStmt.run(documentId, name, role);
}

export function incrementTelemetryStats(unsupported: number, proofs: number): void {
  const current = getTelemetryData();
  if (!current) return;

  const baseHealth = 90;
  const newUnsupportedCount = current.unsupportedLanguageCount + unsupported;
  const newClaimHealthScore = Math.max(30, Math.min(99, baseHealth - newUnsupportedCount * 3));

  const insert = db.prepare(`
    INSERT INTO telemetry (
      claimHealthScore, unsupportedLanguageCount, proofArtifactsCount,
      aiAnswerSurfacesCount, recoveryWorkflowsCount
    ) VALUES (?, ?, ?, ?, ?)
  `);
  
  insert.run(
    newClaimHealthScore,
    newUnsupportedCount,
    current.proofArtifactsCount + proofs,
    current.aiAnswerSurfacesCount,
    current.recoveryWorkflowsCount
  );
}
