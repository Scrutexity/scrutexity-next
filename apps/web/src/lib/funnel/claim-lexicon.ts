/**
 * Deterministic first-pass claim surface scan.
 *
 * This is NOT the full review. It runs no model and makes no judgement about
 * whether a claim is true, supported, or lawful. It finds language patterns
 * that regulators have historically treated as high-scrutiny, quotes the exact
 * text found, and reports where it appeared.
 *
 * Everything it returns is a literal substring of the fetched page. If it
 * cannot quote it, it does not report it.
 */

export type ClaimCategory =
  | "absolute_efficacy"
  | "regulatory_status"
  | "guaranteed_outcome"
  | "superlative"
  | "safety_absolute"
  | "timeframe_promise";

export type LexiconEntry = {
  category: ClaimCategory;
  label: string;
  /** Why a reviewer looks at this language. Never a legal conclusion. */
  why: string;
  patterns: RegExp[];
};

export const LEXICON: LexiconEntry[] = [
  {
    category: "absolute_efficacy",
    label: "Absolute efficacy",
    why: "States an outcome as certain. Reviewers look for visible evidence supporting the strength of the wording.",
    patterns: [
      /\bclinically proven\b/gi,
      /\bscientifically proven\b/gi,
      /\bproven to (?:reverse|cure|eliminate|remove|restore)\b/gi,
      /\bguarantees? results?\b/gi,
      /\bpermanently (?:removes?|eliminates?|cures?)\b/gi,
    ],
  },
  {
    category: "regulatory_status",
    label: "Regulatory status language",
    why: "Approval, clearance and registration have precise meanings that differ from each other.",
    patterns: [
      /\bFDA[- ]approved\b/gi,
      /\bFDA[- ]cleared\b/gi,
      /\bFDA[- ]registered\b/gi,
      /\bmedically approved\b/gi,
      /\bboard[- ]certified\b/gi,
    ],
  },
  {
    category: "guaranteed_outcome",
    label: "Guaranteed outcome",
    why: "Guarantees invite scrutiny of whether the promise is qualified anywhere visible to the buyer.",
    patterns: [
      /\bguaranteed?\b/gi,
      /\b\d+x (?:ROI|return|results?)\b/gi,
      /\brisk[- ]free\b/gi,
      /\bno[- ]risk\b/gi,
    ],
  },
  {
    category: "superlative",
    label: "Unqualified superlative",
    why: "Best, safest and #1 are comparative claims; reviewers look for the basis of comparison.",
    patterns: [
      /\b(?:the )?#1\b/gi,
      /\bbest[- ]in[- ]class\b/gi,
      /\bworld[’']?s (?:best|leading|safest)\b/gi,
      /\bmost effective\b/gi,
      /\bsafest\b/gi,
    ],
  },
  {
    category: "safety_absolute",
    label: "Absolute safety",
    why: "Statements with no qualification are read strictly, particularly for medical and wellness offerings.",
    patterns: [
      /\b(?:completely|totally|100%) safe\b/gi,
      /\bno side effects\b/gi,
      /\bpainless\b/gi,
      /\bzero downtime\b/gi,
    ],
  },
  {
    category: "timeframe_promise",
    label: "Specific timeframe promise",
    why: "A named timeframe is a measurable promise, so reviewers look for the evidence behind the number.",
    patterns: [
      /\bin (?:as little as )?\d+ (?:days?|weeks?|hours?)\b/gi,
      /\bovernight results?\b/gi,
      /\bimmediate results?\b/gi,
      /\binstantly?\b/gi,
    ],
  },
];

export type LexiconFinding = {
  category: ClaimCategory;
  label: string;
  why: string;
  /** The exact matched text, verbatim from the page. */
  match: string;
  /** Surrounding sentence, so the quote is never shown without context. */
  context: string;
};

/** Trim a context window to a readable sentence around the match. */
function contextAround(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 90);
  const end = Math.min(text.length, index + length + 90);
  let slice = text.slice(start, end).trim();
  if (start > 0) slice = "…" + slice;
  if (end < text.length) slice = slice + "…";
  return slice;
}

/**
 * Scan normalized page text. Returns at most `limit` findings, de-duplicated
 * by matched text so one repeated phrase does not dominate the result.
 */
export function scanForClaimLanguage(text: string, limit = 8): LexiconFinding[] {
  const findings: LexiconFinding[] = [];
  const seen = new Set<string>();

  for (const entry of LEXICON) {
    for (const pattern of entry.patterns) {
      // Fresh regex per pass: shared /g regexes carry lastIndex between calls.
      const re = new RegExp(pattern.source, pattern.flags);
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        const key = m[0].toLowerCase();
        if (seen.has(key)) break;
        seen.add(key);
        findings.push({
          category: entry.category,
          label: entry.label,
          why: entry.why,
          match: m[0],
          context: contextAround(text, m.index, m[0].length),
        });
        break; // one example per pattern keeps the result readable
      }
    }
  }

  return findings.slice(0, limit);
}
