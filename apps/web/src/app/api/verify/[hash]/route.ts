import { NextResponse } from 'next/server';

const DEMO_CHAIN: Record<string, { status: string; records: number; hash: string; verifiedSince: string }> = {
  'demo-001': {
    status: 'GREEN',
    records: 142,
    hash: 'c50a693e6cf70e6770f5e90c11b4c0d99c621920c5783c46a8455424af73b9d9',
    verifiedSince: '2026-06-01T00:00:00Z',
  },
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ hash: string }> }
) {
  const { hash } = await context.params;
  const record = DEMO_CHAIN[hash];

  if (!record) {
    return NextResponse.json(
      { status: 'NOT_FOUND', message: 'Hash not found in verification record' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: record.status,
    verified_at: new Date().toISOString(),
    records_verified: record.records,
    latest_hash: record.hash,
    verified_since: record.verifiedSince,
    governance_version: 'cpav-v1',
    message:
      record.status === 'GREEN'
        ? 'Record integrity verified. Zero tampering since origin.'
        : 'VERIFICATION FAILED',
  });
}
