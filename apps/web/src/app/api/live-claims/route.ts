import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'telemetry.db');
    const db = new Database(dbPath);

    // Query the 30 most recent claim risks joined with scans metadata
    const claims = db.prepare(`
      SELECT cr.*, s.scanned_url, s.scanned_at
      FROM claim_risks cr
      JOIN scans s ON cr.scan_id = s.scan_id
      ORDER BY cr.id DESC
      LIMIT 30
    `).all();

    db.close();

    // Deserialize regulatory triggers JSON array
    const normalized = claims.map((row: any) => {
      let triggers: string[] = [];
      try {
        triggers = JSON.parse(row.regulatory_triggers);
      } catch {
        triggers = [row.regulatory_triggers];
      }
      return {
        id: row.id,
        scanId: row.scan_id,
        claimText: row.claim_text,
        severityScore: row.severity_score,
        regulatoryTriggers: triggers,
        visibleCitation: Boolean(row.visible_citation),
        driftDetected: Boolean(row.drift_detected),
        driftContext: row.drift_context,
        saferWording: row.safer_wording,
        scannedUrl: row.scanned_url,
        scannedAt: row.scanned_at,
      };
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Failed to query live claims:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
