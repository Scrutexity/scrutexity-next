import { NextResponse } from "next/server";
import { saveScanRecord } from "@/lib/funnel/db";
import { signScanToken } from "@/lib/funnel/auth";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targetUrl = body.targetUrl || "https://example.com";
    
    // Simulate real AI audit delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const scanId = `scan_${Date.now()}`;
    const isDemo = targetUrl.includes("example.com");
    const authLevel = isDemo ? "DEMO" : "LOCKED";
    const hash = crypto.createHash("sha256").update(targetUrl + Date.now()).digest("hex");

    // Generate the full payload record
    const fullPackage = {
      scanId,
      targetUrl,
      scannedAt: new Date().toISOString(),
      totalGapsFound: 15,
      authLevel: "PURCHASED" as const, // The raw package structure is always the full "PURCHASED" state
      provenanceHash: hash,
      exhibits: [
        {
          id: `ex-${Date.now()}-1`,
          originalClaimText: "Clinically proven to reverse cellular aging in 14 days and guarantee 5x ROI.",
          remediatedClaimText: "Formulated with cellular nutrients observed to support hydration and metabolic resilience.",
          vector: {
            id: "FTC_SEC_5",
            name: "FTC Section 5 (Deceptive)",
            description: "Unsubstantiated performance claim",
            severity: "HIGH" as const
          },
          missingSupportReason: "Preserves commercial intent within evidentiary bounds"
        }
      ]
    };

    // Save to DB
    await saveScanRecord({
      id: scanId,
      targetUrl,
      isDemo,
      authLevel,
      fullPackage,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Generate JWT Token
    const scanToken = await signScanToken(scanId, authLevel);

    return NextResponse.json({ scanId, scanToken, isDemo });
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
