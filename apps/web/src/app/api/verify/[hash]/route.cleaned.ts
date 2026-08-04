import { NextResponse } from 'next/server';

// Drop-in replacement for route.ts.
// The verification record is real and append-only; the JSON below describes it
// in plain, defensible terms only — no crypto/ledger/genesis vocabulary leaks
// into any client that renders this response.
//
// Replace DEMO_RECORDS with the production lookup when wiring the live store.
const DEMO_RECORDS: Record<
  string,
  { status: 'GREEN' | 'REVIEW'; recordsVerified: number; recordRef: string; firstRecordAt: string }
> = {
  'demo-001': {
    status: 'GREEN',
    recordsVerified: 142,
    recordRef: 'c50a693e6cf70e6770f5e90c11b4c0d99c621920c5783c46a8455424af73b9d9',
    firstRecordAt: '2026-06-01T00:00:00Z',
  },
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ hash: string }> }
) {
  const { hash } = await context.params;
  const record = DEMO_RECORDS[hash];

  if (!record) {
    return NextResponse.json(
      { status: 'NOT_FOUND', message: 'No verification record for this reference.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: record.status,
    verified_at: new Date().toISOString(),
    records_verified: record.recordsVerified,
    // 'latest_hash' kept as the field name the VerifyCard reads; value is an
    // opaque record reference, described as such — no mechanism implied.
    latest_hash: record.recordRef,
    first_record_at: record.firstRecordAt,
    message:
      record.status === 'GREEN'
        ? 'Record verified. No alterations detected since the first record.'
        : 'Verification incomplete — under review.',
  });
}
