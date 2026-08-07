import crypto from "crypto";

/**
 * Content-addressed provenance for scan records.
 *
 * The previous implementation was `sha256(targetUrl + Date.now())`. That hashes
 * a URL and a clock. It cannot substantiate what a page contained, it changes
 * on every rescan of identical content, and two different scans of the same
 * unchanged page produce unrelated digests. It was decorative.
 *
 * WHAT A DIGEST FROM THIS MODULE PROVES
 *   - The exact evidence object passed in serializes to this digest.
 *   - Given the same stored evidence, the digest reproduces byte for byte.
 *   - If any recorded field changes, the digest changes.
 *
 * WHAT IT DOES NOT PROVE
 *   - That the captured content is what a third party would have seen. We
 *     record what we retrieved, at a time, from an address. Nothing more.
 *   - That the content is accurate, lawful, or compliant.
 *   - Anything about a moment before we captured it. This is not a notary and
 *     not a blockchain, and should never be described as one.
 *   - That the record is immutable. It is a hash of a row we control. Making
 *     it tamper-evident to an outside party requires publishing the digest
 *     somewhere we do not control, which we do not currently do.
 *
 * Use `contentDigest` for captured page content, and `canonicalDigest` for a
 * structured evidence bundle.
 */

/** Deterministic JSON: keys sorted at every level so serialization is stable
 *  regardless of property insertion order. */
function canonicalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(canonicalize);
  return Object.keys(value as Record<string, unknown>)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = canonicalize((value as Record<string, unknown>)[key]);
      return acc;
    }, {});
}

/** Stable serialization of an evidence bundle. Exported so a verifier can
 *  reproduce exactly what was hashed. */
export function canonicalSerialize(evidence: unknown): string {
  return JSON.stringify(canonicalize(evidence));
}

/** SHA-256 over the canonical serialization of an evidence bundle. */
export function canonicalDigest(evidence: unknown): string {
  return crypto.createHash("sha256").update(canonicalSerialize(evidence), "utf8").digest("hex");
}

/**
 * SHA-256 over normalized captured page text.
 *
 * Normalization collapses whitespace and trims, so trivial reflow does not
 * register as a content change. It deliberately does NOT lowercase or strip
 * punctuation: for claim review, "FDA-approved" and "FDA approved" are
 * materially different strings and must produce different digests.
 */
export function contentDigest(rawText: string): string {
  const normalized = rawText.replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

/** Reproduce a digest from stored evidence, for verification endpoints. */
export function verifyDigest(evidence: unknown, expectedDigest: string): boolean {
  return canonicalDigest(evidence) === expectedDigest;
}
