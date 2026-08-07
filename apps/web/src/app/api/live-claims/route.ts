import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    // Query the 30 most recent claim risks joined with scans metadata
    const { data: claims, error } = await supabase
      .from('claim_risks')
      .select(`
        id,
        scan_id,
        claim_text,
        severity_score,
        regulatory_triggers,
        visible_citation,
        drift_detected,
        drift_context,
        safer_wording,
        scans (
          target_url,
          created_at
        )
      `)
      .order('id', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Failed to query live claims from Supabase:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    if (!claims) {
      return NextResponse.json([]);
    }

    // Normalize and deserialize as before
    const normalized = claims.map((row: any) => {
      let triggers: string[] = [];
      if (Array.isArray(row.regulatory_triggers)) {
        triggers = row.regulatory_triggers;
      } else if (typeof row.regulatory_triggers === 'string') {
        try {
          triggers = JSON.parse(row.regulatory_triggers);
        } catch {
          triggers = [row.regulatory_triggers];
        }
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
        scannedUrl: row.scans?.target_url,
        scannedAt: row.scans?.created_at,
      };
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Unexpected error querying live claims:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
