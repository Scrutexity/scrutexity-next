import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FullExhibitPackage, AuthLevel } from '@/components/scrutexity/funnel/types';
import type { ScanRecord } from './db';

let client: SupabaseClient | null = null;

/**
 * Server-side Supabase client (service role). Returns null when the env is
 * absent so the funnel degrades to the in-memory demo instead of crashing.
 * Production persistence kicks in automatically once
 * NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set (post-rotation).
 */
function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

function rowToRecord(row: any): ScanRecord {
  return {
    id: row.id,
    targetUrl: row.target_url,
    isDemo: row.is_demo,
    authLevel: row.auth_level as AuthLevel,
    email: row.email ?? undefined,
    fullPackage: row.full_package as FullExhibitPackage,
    provenanceHash: row.provenance_hash ?? undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    purchasedAt: row.purchased_at ? new Date(row.purchased_at) : undefined,
  };
}

export async function saveScanRecordSupabase(record: ScanRecord): Promise<boolean> {
  const c = getClient();
  if (!c) return false;
  const { error } = await c.from('scans').upsert({
    id: record.id,
    target_url: record.targetUrl,
    is_demo: record.isDemo,
    auth_level: record.authLevel,
    email: record.email ?? null,
    full_package: record.fullPackage as unknown as object,
    provenance_hash: record.provenanceHash ?? null,
    created_at: record.createdAt.toISOString(),
    updated_at: record.updatedAt.toISOString(),
    purchased_at: record.purchasedAt?.toISOString() ?? null,
  });
  return !error;
}

export async function getScanRecordSupabase(id: string): Promise<ScanRecord | null> {
  const c = getClient();
  if (!c) return null;
  const { data, error } = await c.from('scans').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return rowToRecord(data);
}

export async function updateScanAuthLevelSupabase(
  id: string,
  authLevel: AuthLevel,
  email?: string
): Promise<boolean> {
  const c = getClient();
  if (!c) return false;
  const patch: Record<string, unknown> = {
    auth_level: authLevel,
    updated_at: new Date().toISOString(),
  };
  if (email) patch.email = email;
  if (authLevel === 'PURCHASED') patch.purchased_at = new Date().toISOString();
  const { error } = await c.from('scans').update(patch).eq('id', id);
  return !error;
}
