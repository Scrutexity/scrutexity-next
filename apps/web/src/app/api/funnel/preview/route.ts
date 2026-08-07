import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import { scanForClaimLanguage } from "@/lib/funnel/claim-lexicon";
import { contentDigest } from "@/lib/funnel/provenance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 2_000_000;
const FETCH_TIMEOUT_MS = 8_000;
/** Below this, a fetch has told us nothing useful and must fail explicitly
 *  rather than report an empty result as a clean one. */
const MIN_READABLE_CHARS = 1_200;

/**
 * Instant claim surface preview.
 *
 * Fetches the submitted page server-side, extracts visible text, and reports
 * exact quoted phrases that match a deterministic high-scrutiny lexicon.
 *
 * What this is:  a real reading of the real page, quoted verbatim.
 * What it isn't: the full review. No model runs here. It makes no judgement
 *                about truth, support, or legality, and says so in the payload.
 *
 * Every finding carries the literal matched text plus surrounding context, so
 * nothing is displayed that cannot be pointed at on the customer's own page.
 */

/** Block private, loopback, link-local and cloud metadata ranges. */
function isBlockedAddress(addr: string): boolean {
  if (addr.includes(":")) {
    const v6 = addr.toLowerCase();
    return (
      v6 === "::1" ||
      v6.startsWith("fc") ||
      v6.startsWith("fd") ||
      v6.startsWith("fe80") ||
      v6.startsWith("::ffff:")
    );
  }
  const p = addr.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n))) return true;
  const [a, b] = p;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) || // link-local + AWS/GCP metadata 169.254.169.254
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  );
}

async function assertPublicHost(hostname: string): Promise<void> {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".internal") || h.endsWith(".local")) {
    throw new Error("blocked host");
  }
  const records = await dns.lookup(hostname, { all: true });
  if (records.length === 0) throw new Error("unresolvable host");
  for (const r of records) {
    if (isBlockedAddress(r.address)) throw new Error("blocked address");
  }
}

/** Strip scripts, styles and tags. Page text is untrusted data, never input
 *  to any instruction path. */
function extractVisibleText(html: string): { text: string; title: string | null } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : null;

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

  return { text, title };
}

export async function POST(request: Request) {
  let raw: string;
  try {
    const body = await request.json();
    raw = String(body.url ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!raw) return NextResponse.json({ error: "url is required" }, { status: 400 });
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;

  let target: URL;
  try {
    target = new URL(raw);
    if (target.protocol !== "http:" && target.protocol !== "https:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Enter a valid website address." }, { status: 400 });
  }

  try {
    await assertPublicHost(target.hostname);
  } catch {
    return NextResponse.json(
      { error: "That address could not be reached from a public network." },
      { status: 400 }
    );
  }

  let html: string;
  let status: number;
  try {
    const res = await fetch(target.toString(), {
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "User-Agent": "ScrutexityPreview/1.0 (+https://www.scrutexity.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    status = res.status;

    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("html")) {
      return NextResponse.json(
        { error: "That address did not return a web page." },
        { status: 422 }
      );
    }

    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "That page is too large to preview." }, { status: 413 });
    }
    html = new TextDecoder().decode(buf);
  } catch {
    return NextResponse.json(
      { error: "We could not reach that page. Nothing was analysed." },
      { status: 502 }
    );
  }

  const { text, title } = extractVisibleText(html);

  // A thin response must not be reported as a clean result. Many marketing
  // sites render their copy with JavaScript, so a server-side fetch returns a
  // near-empty shell. Saying "no high-scrutiny phrasing found" in that case
  // would be a fabricated reassurance: we did not find nothing, we read
  // almost nothing. The threshold is deliberately well above the length of a
  // typical shell so this fails loudly rather than passing quietly.
  if (text.length < MIN_READABLE_CHARS) {
    return NextResponse.json(
      {
        error:
          "We could only read a fraction of that page, so we cannot report on it. Sites that render their copy with JavaScript need the full review, which loads the page in a browser.",
        charsAnalysed: text.length,
        reason: "insufficient_text",
      },
      { status: 422 }
    );
  }

  const findings = scanForClaimLanguage(text);

  return NextResponse.json({
    url: target.toString(),
    host: target.hostname,
    title,
    httpStatus: status,
    retrievedAt: new Date().toISOString(),
    charsAnalysed: text.length,
    contentSha256: contentDigest(text),
    findings,
    // Stated in the payload so no consumer can present this as a full review.
    scope:
      "First-pass language scan of the fetched page. No model was run. This identifies high-scrutiny phrasing only, and makes no determination about accuracy, evidence, or compliance.",
  });
}
