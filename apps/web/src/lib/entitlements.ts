import { Pool } from 'pg';
import path from 'path';

let pgPool: Pool | null = null;

if (process.env.POSTGRES_URL) {
  pgPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
}

// Lazy SQLite initialization for development
let sqliteDb: any = null;
function getSqliteDb() {
  if (!sqliteDb) {
    try {
      const fs = require('fs');
      const dbPath = path.join(process.cwd(), 'telemetry.db');
      
      if (process.env.VERCEL && !fs.existsSync(dbPath)) {
        console.warn("Serverless environment detected without telemetry.db. Operating entitlements in stub mode.");
        return null; // Return null instead of crashing
      }
      
      const Database = require('better-sqlite3');
      sqliteDb = new Database(dbPath);
      sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS unlocked_audits (
        id TEXT PRIMARY KEY,
        public_id TEXT NOT NULL,
        email TEXT,
        stripe_session_id TEXT UNIQUE NOT NULL,
        stripe_customer_id TEXT,
        price_id TEXT,
        amount_total INTEGER,
        currency TEXT DEFAULT 'usd',
        status TEXT NOT NULL DEFAULT 'paid',
        entitlement TEXT NOT NULL DEFAULT 'full_report',
        unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS unlocked_audits_public_id_idx ON unlocked_audits(public_id);
      CREATE INDEX IF NOT EXISTS unlocked_audits_email_idx ON unlocked_audits(email);
    `);
    } catch (error) {
      console.error('Failed to initialize sqlite entitlements:', error);
      sqliteDb = null;
      return null;
    }
  }
  return sqliteDb;
}

// Auto-initialize Postgres table if in production/Postgres mode
let pgInitialized = false;
async function ensurePgTable() {
  if (!pgPool || pgInitialized) return;
  try {
    const client = await pgPool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS unlocked_audits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        public_id TEXT NOT NULL,
        email TEXT,
        stripe_session_id TEXT UNIQUE NOT NULL,
        stripe_customer_id TEXT,
        price_id TEXT,
        amount_total INTEGER,
        currency TEXT DEFAULT 'usd',
        status TEXT NOT NULL DEFAULT 'paid',
        entitlement TEXT NOT NULL DEFAULT 'full_report',
        unlocked_at TIMESTAMPTZ DEFAULT now(),
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS unlocked_audits_public_id_idx ON unlocked_audits(public_id);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS unlocked_audits_email_idx ON unlocked_audits(email);
    `);
    client.release();
    pgInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Postgres entitlements table:', error);
  }
}

export interface UnlockAuditParams {
  publicId: string;
  email: string | null;
  stripeSessionId: string;
  stripeCustomerId: string | null;
  priceId: string | null;
  amountTotal: number | null;
  currency: string | null;
  entitlement?: string;
}

export async function unlockAudit(params: UnlockAuditParams) {
  const entitlement = params.entitlement || 'full_report';
  
  if (pgPool) {
    await ensurePgTable();
    const query = `
      INSERT INTO unlocked_audits (
        public_id, email, stripe_session_id, stripe_customer_id, 
        price_id, amount_total, currency, entitlement
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (stripe_session_id) DO UPDATE SET
        public_id = EXCLUDED.public_id,
        email = EXCLUDED.email,
        status = 'paid',
        unlocked_at = now()
    `;
    await pgPool.query(query, [
      params.publicId,
      params.email,
      params.stripeSessionId,
      params.stripeCustomerId,
      params.priceId,
      params.amountTotal,
      params.currency,
      entitlement
    ]);
  } else {
    const db = getSqliteDb();
    if (!db) {
      console.warn("Skipping sqlite execution on serverless (unlockAudit)");
      return;
    }
    const id = require('crypto').randomUUID();
    const stmt = db.prepare(`
      INSERT INTO unlocked_audits (
        id, public_id, email, stripe_session_id, stripe_customer_id, 
        price_id, amount_total, currency, entitlement
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (stripe_session_id) DO UPDATE SET
        public_id = excluded.public_id,
        email = excluded.email,
        status = 'paid',
        unlocked_at = CURRENT_TIMESTAMP
    `);
    stmt.run(
      id,
      params.publicId,
      params.email,
      params.stripeSessionId,
      params.stripeCustomerId,
      params.priceId,
      params.amountTotal,
      params.currency,
      entitlement
    );
  }
}

export async function isAuditUnlocked(params: { publicId: string; email?: string }): Promise<boolean> {
  const ent = await getAuditEntitlement(params.publicId);
  return ent.unlocked;
}

export async function getAuditEntitlement(publicId: string): Promise<{
  unlocked: boolean;
  entitlement: 'snapshot' | 'full_report' | 'monitoring' | 'agency';
}> {
  if (!publicId) {
    return { unlocked: false, entitlement: 'snapshot' };
  }

  let row: any = null;

  if (pgPool) {
    await ensurePgTable();
    const res = await pgPool.query(
      "SELECT entitlement, status FROM unlocked_audits WHERE public_id = $1 AND status = 'paid' LIMIT 1",
      [publicId]
    );
    row = res.rows[0];
  } else {
    const db = getSqliteDb();
    if (!db) {
      console.warn("Skipping sqlite execution on serverless (getAuditEntitlement)");
      return { unlocked: false, entitlement: 'snapshot' };
    }
    const stmt = db.prepare("SELECT entitlement, status FROM unlocked_audits WHERE public_id = ? AND status = 'paid' LIMIT 1");
    row = stmt.get(publicId);
  }

  if (row) {
    return {
      unlocked: true,
      entitlement: row.entitlement as any
    };
  }

  return {
    unlocked: false,
    entitlement: 'snapshot'
  };
}
