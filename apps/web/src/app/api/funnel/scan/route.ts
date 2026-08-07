import { NextResponse } from "next/server";
import { saveScanRecord } from "@/lib/funnel/db";
import { signScanToken } from "@/lib/funnel/auth";
import { SYNTHETIC_DEMO_PACKAGE, DEMO_HOSTS, isDemoTarget } from "@/lib/funnel/demo-fixture";
import { canonicalDigest } from "@/lib/funnel/provenance";

const BACKEND_URL = process.env.CANONICAL_BACKEND_URL ?? "https://scrutexity-api.vercel.app";
const INTERNAL_KEY = process.env.INTERNAL_ADMIN_KEY;

/**
 * Free snapshot scan.
 *
 * This route previously returned the same hardcoded exhibit for every URL
 * after a 1500ms "simulate real AI audit delay", with a provenance hash of
 * sha256(url + Date.now()). Any customer scanning any site received identical
 * fabricated findings, attributed to their own domain, sealed with a hash that
 * proved nothing. For a product whose premise is the gap between claims and
 * evidence, that gap existed inside the product itself.
 *
 * Behaviour now:
 *   - Demo hosts (example.com) return a fixture that is explicitly flagged
 *     `synthetic: true` so the UI can label it. It is never attributed to a
 *     customer domain.
 *   - Real URLs are forwarded to the canonical backend, which owns the actual
 *     pipeline (Playwright crawl, claim extraction, pattern match, scoring).
 *   - If that backend is unreachable or fails, the response is an explicit
 *     `unavailable` status with zero findings. It never substitutes fabricated
 *     intelligence for unavailable intelligence.
 */
export async function POST(request: Request) {
  let targetUrl: string;
  try {
    const body = await request.json();
    targetUrl = String(body.targetUrl ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!targetUrl) {
    return NextResponse.json({ error: "targetUrl is required" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    return NextResponse.json(
      { error: "Enter a full http or https URL." },
      { status: 400 }
    );
  }

  const scanId = `scan_${Date.now()}`;

  // ── Demo path ──────────────────────────────────────────────────────────
  // Clearly labelled synthetic output, for the marketing walkthrough only.
  if (isDemoTarget(parsed.hostname)) {
    const fullPackage = {
      ...SYNTHETIC_DEMO_PACKAGE,
      scanId,
      targetUrl,
      scannedAt: new Date().toISOString(),
    };

    await saveScanRecord({
      id: scanId,
      targetUrl,
      isDemo: true,
      authLevel: "DEMO",
      fullPackage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const scanToken = await signScanToken(scanId, "DEMO");
    return NextResponse.json({
      scanId,
      scanToken,
      isDemo: true,
      synthetic: true,
      status: "completed",
    });
  }

  // ── Real path ──────────────────────────────────────────────────────────
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(INTERNAL_KEY ? { "x-internal-admin-key": INTERNAL_KEY } : {}),
      },
      body: JSON.stringify({ url: targetUrl, source_context: "free_snapshot" }),
      signal: AbortSignal.timeout(55_000),
    });

    if (!backendRes.ok) {
      console.warn(
        `[funnel/scan] backend ${BACKEND_URL}/api/scan returned ${backendRes.status} for ${parsed.hostname}`
      );
      return NextResponse.json(
        {
          status: "unavailable",
          error:
            "Live analysis is temporarily unavailable. No findings were produced for this URL.",
        },
        { status: 503 }
      );
    }

    const data = await backendRes.json();

    if (data.status === "failed" || !data.scan_id) {
      return NextResponse.json(
        {
          status: "failed",
          error: "We could not complete a review of that page.",
        },
        { status: 502 }
      );
    }

    // The backend persists claims under its own scan_id. Provenance is derived
    // from the evidence it actually captured, never from a clock.
    const provenanceHash = canonicalDigest({
      backendScanId: data.scan_id,
      targetUrl,
      scannerVersion: SCANNER_VERSION,
    });

    const fullPackage = {
      scanId,
      targetUrl,
      scannedAt: new Date().toISOString(),
      totalGapsFound: Array.isArray(data.claims) ? data.claims.length : 0,
      authLevel: "PURCHASED" as const,
      provenanceHash,
      backendScanId: data.scan_id,
      synthetic: false,
      exhibits: [],
    };

    await saveScanRecord({
      id: scanId,
      targetUrl,
      isDemo: false,
      authLevel: "LOCKED",
      fullPackage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const scanToken = await signScanToken(scanId, "LOCKED");
    return NextResponse.json({
      scanId,
      scanToken,
      isDemo: false,
      synthetic: false,
      status: "completed",
    });
  } catch (error) {
    console.error("[funnel/scan] backend unreachable:", error);
    return NextResponse.json(
      {
        status: "unavailable",
        error:
          "Live analysis is temporarily unavailable. No findings were produced for this URL.",
      },
      { status: 503 }
    );
  }
}

/** Bumped whenever scan inputs or extraction logic change, so a digest is
 *  only comparable against digests produced by the same scanner. */
const SCANNER_VERSION = "funnel-scan/2";
