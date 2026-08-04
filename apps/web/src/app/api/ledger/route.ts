import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clinicId = searchParams.get('clinic_id');

  if (!clinicId) {
    return NextResponse.json({ error: 'Missing clinic_id parameter' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    // Strictly selecting non-PHI operational fields
    const result = await client.query(
      `SELECT id, event_type, timestamp, risk_flags, governance_hash 
       FROM intent_events 
       WHERE clinic_id = $1 
       ORDER BY timestamp DESC LIMIT 50`,
      [clinicId]
    );
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Cryptographic ledger query failed' }, { status: 500 });
  }
}
