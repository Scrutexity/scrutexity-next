import { createAuditSeal, normalizeContent } from '../src/lib/audit-seal';
import * as assert from 'assert';
import crypto from 'crypto';

console.log("Running AuditGPT TS Seal Helper smoke tests...");

const rawContent = "   Hello   World! \r\n This is a claim page.   \n\n\n  Another line. ";
const url = "https://example.com";
const auditId = "smoke-test";

const seal1 = createAuditSeal({ rawContent, url, auditId });
const seal2 = createAuditSeal({ rawContent, url, auditId });

// Same input produces same hash
assert.strictEqual(seal1.sha256, seal2.sha256);
assert.strictEqual(seal1.normalizedSha256, seal2.normalizedSha256);

// Changed input produces different hash
const seal3 = createAuditSeal({ rawContent: rawContent + "extra", url, auditId });
assert.notStrictEqual(seal1.sha256, seal3.sha256);

// Normalization verification
console.log("Actual normalized content:", JSON.stringify(normalizeContent(rawContent)));
const expectedNormalized = "Hello World! \n This is a claim page. \n Another line.";
const expectedHash = crypto.createHash('sha256').update(expectedNormalized).digest('hex');
assert.strictEqual(seal1.normalizedSha256, expectedHash);

console.log("✓ TS Seal Helper smoke tests passed successfully!");
