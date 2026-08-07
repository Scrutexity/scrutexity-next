import { NextResponse } from "next/server";
import { updateScanAuthLevel, getScanRecord } from "@/lib/funnel/db";
import { verifyScanToken, signScanToken } from "@/lib/funnel/auth";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const oldToken = authHeader.split(" ")[1];
    
    const body = await request.json();
    const { scanId, email } = body;

    const payload = await verifyScanToken(oldToken);
    if (!payload || payload.scanId !== scanId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const record = await getScanRecord(scanId);
    if (!record) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    // Only upgrade if currently LOCKED
    if (record.authLevel === "LOCKED") {
      await updateScanAuthLevel(scanId, "EMAIL_CAPTURED", email);
    }

    // Issue new upgraded token
    const newToken = await signScanToken(scanId, record.authLevel === "LOCKED" ? "EMAIL_CAPTURED" : record.authLevel);

    return NextResponse.json({ scanToken: newToken });
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
