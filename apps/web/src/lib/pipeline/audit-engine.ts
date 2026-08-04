export type RiskSeverity = 'low' | 'moderate' | 'critical';

export interface ComplianceRule {
  id: string;
  agency: 'FTC' | 'FDA' | 'STATE_MEDICAL_BOARD';
  triggerPattern: RegExp;
  severityScore: number;
  riskLevel: RiskSeverity;
  institutionalRewrite: string;
}

export const REGULATORY_DICTIONARY: ComplianceRule[] = [
  {
    id: 'ftc_sec5_absolute_guarantee',
    agency: 'FTC',
    triggerPattern: /\b(guarantees?|100%|zero side effects|completely safe|overnight)\b/i,
    severityScore: 85,
    riskLevel: 'critical',
    institutionalRewrite: 'Demonstrated to support clinical outcomes under professional supervision. Individual results vary.'
  },
  {
    id: 'fda_approval_misrepresentation',
    agency: 'FDA',
    triggerPattern: /\b(fda-?approved)\b/i,
    severityScore: 90,
    riskLevel: 'critical',
    institutionalRewrite: 'FDA-cleared for designated indications.'
  },
  {
    id: 'unqualified_yield_claim',
    agency: 'FTC',
    triggerPattern: /\b(triple your revenue|guaranteed ROI|instant returns)\b/i,
    severityScore: 75,
    riskLevel: 'moderate',
    institutionalRewrite: 'Designed to support operational efficiency and capture missed booking opportunities.'
  },
  {
    id: 'glp1_unapproved_compounding',
    agency: 'FDA',
    triggerPattern: /\b(compounded (ozempic|wegovy|semaglutide|tirzepatide)|compounding fda-approved|generic ozempic)\b/i,
    severityScore: 95,
    riskLevel: 'critical',
    institutionalRewrite: 'Custom compounded formulation prepared by a state-licensed pharmacy. Compounded drugs are not FDA-approved.'
  },
  {
    id: 'botox_permanence_promise',
    agency: 'STATE_MEDICAL_BOARD',
    triggerPattern: /\b(permanently? (erase|remove) wrinkles|erase aging|wrinkle-free forever|stop aging)\b/i,
    severityScore: 80,
    riskLevel: 'critical',
    institutionalRewrite: 'Temporarily improves the appearance of moderate to severe lines. Periodic maintenance required.'
  },
  {
    id: 'laser_painless_permanent',
    agency: 'FDA',
    triggerPattern: /\b(painless laser|painless treatment|permanently remove hair|risk-free treatment|100% hair removal)\b/i,
    severityScore: 70,
    riskLevel: 'moderate',
    institutionalRewrite: 'Well-tolerated clinical device for long-term hair reduction. Transient discomfort may occur.'
  }
];

export function extractCleanClaims(html: string): string[] {
  if (!html) return [];
  // Insert structural boundaries around tags to prevent block element mergers
  const spacedHtml = html.replace(/</g, ' <').replace(/>/g, '> ');

  // Strip tags and normalize white space
  const text = spacedHtml
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Split text into structural sentences
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

export function runRegulatoryCrossReference(extractedClaims: string[]) {
  const findings: Array<{
    claimText: string;
    ruleId: string;
    severity: number;
    agency: 'FTC' | 'FDA' | 'STATE_MEDICAL_BOARD';
    saferWording: string;
  }> = [];

  for (const claim of extractedClaims) {
    for (const rule of REGULATORY_DICTIONARY) {
      if (rule.triggerPattern.test(claim)) {
        findings.push({
          claimText: claim,
          ruleId: rule.id,
          severity: rule.severityScore,
          agency: rule.agency,
          saferWording: rule.institutionalRewrite,
        });
      }
    }
  }

  return findings;
}

export interface BlockCitationResult {
  hasCitation: boolean;
  proofStrength: 'high' | 'moderate' | 'weak' | 'none';
  matchedUrls: string[];
}

export function evaluateBlockCitations(blockHtml: string): BlockCitationResult {
  // Check for footnote/citation symbols
  const hasCitationMark = /([*†]|\s*\[\d+\])/.test(blockHtml);

  // Extract outgoing links
  const hrefRegex = /href=["']([^"']+)["']/gi;
  const matchedUrls: string[] = [];
  let match;
  while ((match = hrefRegex.exec(blockHtml)) !== null) {
    matchedUrls.push(match[1]);
  }

  if (matchedUrls.length === 0) {
    return {
      hasCitation: hasCitationMark,
      proofStrength: hasCitationMark ? 'moderate' : 'none',
      matchedUrls: [],
    };
  }

  let bestStrength: 'high' | 'moderate' | 'weak' = 'weak';

  for (const url of matchedUrls) {
    try {
      const hostname = new URL(url).hostname.toLowerCase();
      if (
        hostname.endsWith('.gov') ||
        hostname.endsWith('.edu') ||
        hostname.includes('ncbi.nlm.nih.gov') ||
        hostname.includes('clinicaltrials.gov')
      ) {
        bestStrength = 'high';
        break; // maximum strength reached
      }

      const isWeak =
        hostname.includes('instagram.com') ||
        hostname.includes('facebook.com') ||
        hostname.includes('twitter.com') ||
        hostname.includes('youtube.com') ||
        hostname.includes('tiktok.com');

      if (!isWeak && bestStrength !== 'high') {
        bestStrength = 'moderate';
      }
    } catch {
      if (!url.startsWith('#') && !url.includes('instagram') && !url.includes('facebook')) {
        bestStrength = 'moderate';
      }
    }
  }

  return {
    hasCitation: true,
    proofStrength: bestStrength,
    matchedUrls,
  };
}

export interface StructuralAuditResult {
  claimText: string;
  ruleId: string;
  severity: number;
  agency: 'FTC' | 'FDA' | 'STATE_MEDICAL_BOARD';
  saferWording: string;
  hasCitation: boolean;
  proofStrength: 'high' | 'moderate' | 'weak' | 'none';
  matchedUrls: string[];
}

export function runStructuralIngestion(html: string): StructuralAuditResult[] {
  if (!html) return [];

  // Split HTML on block boundary tags
  const blockRegex = /<\/?(p|div|li|h1|h2|h3|h4|h5|h6|section|article|ol|ul|td|tr)[^>]*>/gi;
  const blocks = html
    .split(blockRegex)
    .map((b) => b?.trim())
    .filter((b) => b && b.length > 5);

  const results: StructuralAuditResult[] = [];

  for (const block of blocks) {
    const cleanClaims = extractCleanClaims(block);
    if (cleanClaims.length === 0) continue;

    const findings = runRegulatoryCrossReference(cleanClaims);
    if (findings.length === 0) continue;

    const citation = evaluateBlockCitations(block);

    for (const f of findings) {
      results.push({
        claimText: f.claimText,
        ruleId: f.ruleId,
        severity: f.severity,
        agency: f.agency,
        saferWording: f.saferWording,
        hasCitation: citation.hasCitation,
        proofStrength: citation.proofStrength,
        matchedUrls: citation.matchedUrls,
      });
    }
  }

  return results;
}
