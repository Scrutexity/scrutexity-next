import { FullExhibitPackage, AuthLevel } from "@/components/scrutexity/funnel/types";
import {
  saveScanRecordSupabase,
  getScanRecordSupabase,
  updateScanAuthLevelSupabase,
} from "./supabase-db";

export interface ScanRecord {
  id: string;
  targetUrl: string;
  isDemo: boolean;
  authLevel: AuthLevel;
  email?: string;
  fullPackage: FullExhibitPackage;
  provenanceHash?: string;
  createdAt: Date;
  updatedAt: Date;
  purchasedAt?: Date;
}

// In-memory fallback for the demo slice (no Supabase env configured yet).
// In production (env present), all three functions persist to the `scans`
// table in Supabase via supabase-db.ts — no serverless-incompatible storage.
const mockDB = new Map<string, ScanRecord>();

export async function saveScanRecord(record: ScanRecord) {
  const persisted = await saveScanRecordSupabase(record);
  if (!persisted) mockDB.set(record.id, record);
}

export async function getScanRecord(id: string): Promise<ScanRecord | null> {
  const persisted = await getScanRecordSupabase(id);
  if (persisted) return persisted;
  return mockDB.get(id) || null;
}

export async function updateScanAuthLevel(id: string, authLevel: AuthLevel, email?: string) {
  const persisted = await updateScanAuthLevelSupabase(id, authLevel, email);
  if (persisted) return;

  const record = mockDB.get(id);
  if (!record) throw new Error("Scan record not found");
  
  record.authLevel = authLevel;
  if (email) record.email = email;
  record.updatedAt = new Date();
  
  if (authLevel === "PURCHASED") {
    record.purchasedAt = new Date();
  }
  
  mockDB.set(id, record);
}
