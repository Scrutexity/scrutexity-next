import { FullExhibitPackage, AuthLevel } from "@/components/scrutexity/funnel/types";

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

// In-memory mock database for the vertical slice.
// In production, this is a Postgres table (scans) with a JSONB column (full_package).
const mockDB = new Map<string, ScanRecord>();

export async function saveScanRecord(record: ScanRecord) {
  mockDB.set(record.id, record);
}

export async function getScanRecord(id: string): Promise<ScanRecord | null> {
  return mockDB.get(id) || null;
}

export async function updateScanAuthLevel(id: string, authLevel: AuthLevel, email?: string) {
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
