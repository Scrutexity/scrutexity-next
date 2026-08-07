import { 
  FullExhibitPackage, 
  RedactedScanResult, 
  PartialRevealResult, 
  AuthLevel 
} from "@/components/scrutexity/funnel/types";

/**
 * STRICK SECURITY BOUNDARY
 * Projects the raw database FullExhibitPackage based on the provided authorized level.
 * Original and remediated claim text are aggressively stripped out unless explicitly authorized.
 */
export function projectScanResult(
  fullPackage: FullExhibitPackage, 
  authLevel: AuthLevel
): RedactedScanResult | PartialRevealResult | FullExhibitPackage {
  
  // 1. LOCKED State (Free Snapshot, no email)
  if (authLevel === "LOCKED") {
    // Only return the structural shape of Exhibit A, no claims, no matrix
    const redacted: RedactedScanResult = {
      scanId: fullPackage.scanId,
      targetUrl: fullPackage.targetUrl,
      scannedAt: fullPackage.scannedAt,
      totalGapsFound: fullPackage.totalGapsFound,
      authLevel: "LOCKED",
      exhibitAStructure: fullPackage.exhibits.length > 0 
        ? {
            vectorId: fullPackage.exhibits[0].vector.id,
            hasRemediation: !!fullPackage.exhibits[0].remediatedClaimText
          }
        : { vectorId: "UNKNOWN", hasRemediation: false }
    };
    return redacted;
  }

  // 2. EMAIL CAPTURED State (Partial Reveal)
  if (authLevel === "EMAIL_CAPTURED") {
    // Reveal Exhibit A fully, but omit all other exhibits
    const partial: PartialRevealResult = {
      scanId: fullPackage.scanId,
      targetUrl: fullPackage.targetUrl,
      scannedAt: fullPackage.scannedAt,
      totalGapsFound: fullPackage.totalGapsFound,
      authLevel: "EMAIL_CAPTURED",
      exhibitA: fullPackage.exhibits[0] // Assume at least 1 exhibit exists
    };
    return partial;
  }

  // 3. PURCHASED / DEMO State (Full Unlock)
  if (authLevel === "PURCHASED" || authLevel === "DEMO") {
    return fullPackage;
  }

  throw new Error("Invalid auth level provided for projection.");
}
