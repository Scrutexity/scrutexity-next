import crypto from 'crypto';

export type AuditSeal = {
  sealVersion: "scrutexity-seal-v1";
  algorithm: "sha256";
  url: string;
  auditId?: string;
  capturedAt: string;
  contentLength: number;
  sha256: string;
  normalizedSha256: string;
  normalization: {
    trimWhitespace: boolean;
    collapseWhitespace: boolean;
    lowercase: boolean;
  };
  disclaimer: string;
};

export function normalizeContent(content: string): string {
  // Trim leading/trailing whitespace
  let normalized = content.trim();
  // Normalize line endings
  normalized = normalized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Collapse repeated horizontal spaces/tabs to a single space
  normalized = normalized.replace(/[ \t]+/g, ' ');
  // Collapse multiple consecutive newlines to a single newline
  normalized = normalized.replace(/\n+/g, '\n');
  return normalized;
}

export function createAuditSeal(input: {
  rawContent: string;
  url: string;
  auditId?: string;
}): AuditSeal {
  const normalized = normalizeContent(input.rawContent);
  const rawHash = crypto.createHash('sha256').update(input.rawContent).digest('hex');
  const normalizedHash = crypto.createHash('sha256').update(normalized).digest('hex');

  return {
    sealVersion: "scrutexity-seal-v1",
    algorithm: "sha256",
    url: input.url,
    auditId: input.auditId,
    capturedAt: new Date().toISOString(),
    contentLength: input.rawContent.length,
    sha256: rawHash,
    normalizedSha256: normalizedHash,
    normalization: {
      trimWhitespace: true,
      collapseWhitespace: true,
      lowercase: false
    },
    disclaimer: "This seal verifies the reviewed content snapshot, not the truth, legality, clinical accuracy, ranking outcome, or compliance status of any claim."
  };
}
