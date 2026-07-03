'use server';

import {
  createScan,
  updateScanStatus,
  insertRisks,
  insertLead,
  getAllScans,
  getScan,
  getRisksByScan,
  type ScanRecord,
  type ClaimRisk,
} from '@/lib/db';
import { randomUUID } from 'node:crypto';
import { fetchPublicPage } from '@/lib/ssrf';

// ── Helpers ──

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── System Prompt ──

const AUDIT_SYSTEM_PROMPT = `You are an institutional claims auditor. Analyze the provided web copy and extract a comprehensive landscape of regulatory and compliance risks. Do not generate performative text.

Return a valid JSON object with a single root key "risk_landscape" containing an array of claim objects based on these criteria:
1. Regulatory Keyword Scoring: Flag terms with strict legal/regulatory weight (e.g., FDA-cleared, guaranteed, permanent). Verify if a visible citation exists.
2. Drift Detection: Identify structural language drift where a claim shifts from aspirational to definitive.
3. Severity: Assign a severity_score (1-5) based on unverified claim liability.
4. Remediation: Provide a "safer_wording" alternative that removes the regulatory tripwire while maintaining marketing value.

Exact JSON schema required:
{
  "risk_landscape": [
    {
      "claim_text": "string",
      "severity_score": "number (1-5)",
      "regulatory_triggers_found": ["string array"],
      "visible_citation_present": "boolean",
      "drift_detected": "boolean",
      "drift_context": "string or null",
      "safer_wording": "string"
    }
  ]
}`;

// ── Main Action ──

export async function runAudit(
  url: string,
): Promise<{ success: boolean; scanId?: string; error?: string }> {
  if (!url) return { success: false, error: 'URL is required' };

  const scanId = randomUUID();
  const ts = new Date().toISOString();

  // Phase 0 — SSRF-safe validation + fetch (shared guard: src/lib/ssrf.ts).
  // Rejects private/reserved targets, credentials, non-standard ports,
  // redirect-to-internal, oversize bodies, and non-HTML responses before
  // any content reaches the model.
  let normalized: string;
  let plainText: string;
  try {
    const { url: canonical, html } = await fetchPublicPage(url, { timeoutMs: 20_000 });
    normalized = canonical;
    plainText = stripHtml(html).slice(0, 12000);
  } catch {
    return { success: false, error: 'Only public website URLs are supported.' };
  }

  try {
    // Phase 1 — Init scan record (URL already validated + canonicalized)
    createScan(scanId, normalized, ts);

    // Phase 3 — Gemini extraction (Gemini API key is set in Vercel env)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      updateScanStatus(scanId, 'failed');
      return { success: false, error: 'GEMINI_API_KEY not set in environment' };
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        AUDIT_SYSTEM_PROMPT,
        `Target URL: ${normalized}\n\nScraped Copy:\n${plainText}`,
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const raw = aiResponse.text;
    if (!raw) {
      updateScanStatus(scanId, 'failed');
      return { success: false, error: 'Empty response from Gemini' };
    }

    const payload = JSON.parse(raw) as { risk_landscape?: unknown[] };

    if (!Array.isArray(payload.risk_landscape) || payload.risk_landscape.length === 0) {
      updateScanStatus(scanId, 'failed');
      return { success: false, error: 'No claims detected in response' };
    }

    // Phase 4 — Persist multi-claim array
    insertRisks(scanId, payload.risk_landscape as Parameters<typeof insertRisks>[1]);

    // Phase 5 — Mark complete
    updateScanStatus(scanId, 'complete');

    return { success: true, scanId };
  } catch (err) {
    updateScanStatus(scanId, 'failed');
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      return { success: false, error: 'Page did not respond within 20s' };
    }
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}

// ── Read Operations ──

export async function fetchScans(): Promise<ScanRecord[]> {
  return getAllScans();
}

export async function fetchRisksByScan(scanId: string): Promise<ClaimRisk[]> {
  return getRisksByScan(scanId);
}

export async function fetchScanWithRisks(scanId: string): Promise<{
  scan: ScanRecord | null;
  risks: ClaimRisk[];
}> {
  const scan = getScan(scanId) ?? null;
  const risks = scan ? getRisksByScan(scanId) : [];
  return { scan, risks };
}

export async function submitLead(
  scanId: string,
  email: string,
  name?: string,
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Valid email required' };
  }
  insertLead(scanId, email, name ?? null);
  return { success: true };
}
