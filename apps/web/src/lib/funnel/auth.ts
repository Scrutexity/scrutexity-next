import { SignJWT, jwtVerify } from "jose";
import { AuthLevel } from "@/components/scrutexity/funnel/types";

// In production, this should be in process.env
const SECRET_KEY = process.env.SCAN_TOKEN_SECRET || "fallback_secret_key_change_me_in_prod";
const secret = new TextEncoder().encode(SECRET_KEY);

export interface ScanTokenPayload {
  scanId: string;
  authLevel: AuthLevel;
}

export async function signScanToken(scanId: string, authLevel: AuthLevel): Promise<string> {
  return new SignJWT({ scanId, authLevel })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyScanToken(token: string): Promise<ScanTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    
    if (typeof payload.scanId === "string" && typeof payload.authLevel === "string") {
      return {
        scanId: payload.scanId,
        authLevel: payload.authLevel as AuthLevel,
      };
    }
    return null;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
}
