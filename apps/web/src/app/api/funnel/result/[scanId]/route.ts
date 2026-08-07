import { NextResponse } from "next/server";
import { getScanRecord } from "@/lib/funnel/db";
import { verifyScanToken } from "@/lib/funnel/auth";
import { projectScanResult } from "@/lib/funnel/projection";

export async function GET(request: Request, { params }: { params: Promise<{ scanId: string }> }) {
  const { scanId } = await params;
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyScanToken(token);

  if (!payload || payload.scanId !== scanId) {
    return NextResponse.json({ error: "Forbidden or Invalid Token" }, { status: 403 });
  }

  // Fetch the raw DB record (the source of truth)
  const record = await getScanRecord(scanId);
  if (!record) {
    return NextResponse.json({ error: "Scan not found" }, { status: 404 });
  }

  // Double-check authLevel logic: the DB authLevel takes precedence for projection safety.
  // The token's authLevel claim was validated by jose, but checking DB ensures we aren't using a stale token.
  // For the demo slice, we just use the DB's authLevel to drive the strict projection.
  const authorizedLevel = record.authLevel;

  try {
    // Project the full package strictly based on auth level (strips sensitive fields if locked)
    const projectedData = projectScanResult(record.fullPackage, authorizedLevel);
    
    // We override the authLevel in the projected data to match the DB's truth, just in case
    // (though projection layer should already do this)
    (projectedData as any).authLevel = authorizedLevel;

    return NextResponse.json(projectedData);
  } catch (error) {
    console.error("Projection error:", error);
    return NextResponse.json({ error: "Projection Error" }, { status: 500 });
  }
}
