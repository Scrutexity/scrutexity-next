PRAGMA foreign_keys = ON;

-- Agencies are the primary distribution channel. A direct clinic lead can
-- remain unattached until an agency relationship exists.
CREATE TABLE IF NOT EXISTS agencies (
  agency_id INTEGER PRIMARY KEY AUTOINCREMENT,
  agency_name TEXT NOT NULL,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'prospect',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS snapshot_requests (
  request_id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_name TEXT NOT NULL,
  clinic_url TEXT NOT NULL,
  email TEXT NOT NULL,
  agency_id INTEGER,
  status TEXT NOT NULL DEFAULT 'new',
  pdf_path TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

CREATE TABLE IF NOT EXISTS audits (
  audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER,
  agency_id INTEGER,
  clinic_name TEXT NOT NULL,
  clinic_url TEXT NOT NULL,
  vertical TEXT NOT NULL DEFAULT 'med_spa',
  package_type TEXT NOT NULL DEFAULT 'free_snapshot',
  status TEXT NOT NULL DEFAULT 'draft',
  reviewer_name TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  FOREIGN KEY (request_id) REFERENCES snapshot_requests(request_id),
  FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

-- The Claim Record Dataset. Every PDF receipt must create structured records
-- here so the moat compounds instead of disappearing into static documents.
CREATE TABLE IF NOT EXISTS claim_records (
  claim_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
  audit_id INTEGER NOT NULL,
  agency_id INTEGER,
  claim_text TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_surface TEXT NOT NULL DEFAULT 'website',
  risk_level TEXT NOT NULL CHECK (risk_level IN ('High', 'Medium', 'Low')),
  risk_category TEXT NOT NULL,
  evidence_gap TEXT NOT NULL,
  suggested_rewrite TEXT NOT NULL,
  vertical TEXT NOT NULL DEFAULT 'med_spa',
  status TEXT NOT NULL DEFAULT 'reviewed',
  reference_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (audit_id) REFERENCES audits(audit_id),
  FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

CREATE INDEX IF NOT EXISTS idx_snapshot_requests_email
  ON snapshot_requests(email);

CREATE INDEX IF NOT EXISTS idx_snapshot_requests_status
  ON snapshot_requests(status);

CREATE INDEX IF NOT EXISTS idx_audits_agency_status
  ON audits(agency_id, status);

CREATE INDEX IF NOT EXISTS idx_claim_records_audit
  ON claim_records(audit_id);

CREATE INDEX IF NOT EXISTS idx_claim_records_risk
  ON claim_records(risk_level, risk_category);

CREATE INDEX IF NOT EXISTS idx_claim_records_vertical_created
  ON claim_records(vertical, created_at);
