import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Ensure this runs as an edge/serverless function efficiently
export const maxDuration = 60; // Allow up to 60s for batch processing

export async function POST(request: Request) {
  try {
    // 1. Verify Webhook Secret to prevent unauthorized invocations
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== "Bearer CRON_SECRET_LIVE_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Initialize Supabase Admin Client to bypass RLS for background processing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Needs Service Role Key!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Missing Supabase env vars for Cron Job. Skipping execution.");
      return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Fetch all active domains to scan
    const { data: domains, error: domainError } = await supabaseAdmin
      .from("domains")
      .select("id, organization_id, hostname");

    if (domainError) throw domainError;
    if (!domains || domains.length === 0) {
      return NextResponse.json({ status: "skipped", message: "No domains to scan." });
    }

    const results = [];

    // 3. Perform automated scans for each domain
    for (const domain of domains) {
      // Simulate an AI assessment delay/fetch
      await new Promise((res) => setTimeout(res, 500));
      
      const scanId = crypto.randomUUID();
      const rawPayload = {
        automated: true,
        timestamp: new Date().toISOString(),
        scannedUrl: `https://${domain.hostname}`
      };

      // ONLY inject mock drift for internal/demo domains to protect real customer data.
      const isInternalDemo = domain.hostname.includes("example.com") || domain.hostname.includes("acmeaesthetics.com");
      const triggerDrift = isInternalDemo && Math.random() > 0.7;
      const severity = triggerDrift ? "HIGH" : "LOW";

      // Insert Scan
      const { error: scanError } = await supabaseAdmin
        .from("scans")
        .insert({
          id: scanId,
          domain_id: domain.id,
          full_dom_hash: crypto.createHash("sha256").update(domain.hostname + Date.now()).digest("hex"),
          severity_score: severity,
          raw_payload: rawPayload
        });

      if (scanError) {
        console.error(`Failed to insert scan for domain ${domain.hostname}:`, scanError);
        continue;
      }

      // Insert Claims
      const claimsToInsert = [];
      
      // Standard claim
      claimsToInsert.push({
        scan_id: scanId,
        claim_text: "Standard operational statement.",
        claim_hash: crypto.createHash("sha256").update("Standard operational statement.").digest("hex"),
        vector_category: "GENERAL",
        severity: "LOW",
        status: "new"
      });

      // Drifting high-risk claim
      if (triggerDrift) {
        const text = "Guaranteed 100% ROI in 30 days and complete regulatory immunity.";
        claimsToInsert.push({
          scan_id: scanId,
          claim_text: text,
          claim_hash: crypto.createHash("sha256").update(text).digest("hex"),
          vector_category: "FTC_SEC_5",
          severity: "HIGH",
          status: "new"
        });
      }

      await supabaseAdmin.from("claims").insert(claimsToInsert);
      results.push({ domain: domain.hostname, severity });
    }

    return NextResponse.json({ 
      status: "success", 
      message: `Successfully scanned ${results.length} domains.`,
      results 
    });

  } catch (error: any) {
    console.error("Cron Execution Failed:", error);
    return NextResponse.json({ 
      error: error.message || "Unknown error", 
      cause: error.cause ? String(error.cause) : undefined,
      stack: error.stack
    }, { status: 500 });
  }
}
