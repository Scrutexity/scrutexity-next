import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAudit } from '@/data/claim-audits';
import ClaimAuditPublicContent from '@/components/scrutexity/claim-audit-public-content';
import { getAuditEntitlement } from '@/lib/entitlements';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ publicId: string }> },
): Promise<Metadata> {
  const { publicId } = await params;
  const audit = getAudit(publicId);
  if (!audit) {
    return { title: 'Claim Audit not found | Scrutexity' };
  }
  return {
    title: `AuditGPT Claim Audit Report · ${audit.companyType} | Scrutexity`,
    description: `Public Claim Audit Report. ${audit.claimsReviewed} claims reviewed against the four-question framework. Primary risk theme: ${audit.primaryRiskTheme}. Audited on ${audit.auditDate}.`,
    alternates: { canonical: `/claim-audit/${audit.publicId}` },
    robots: { index: false, follow: false },
  };
}

export default async function ClaimAuditPublicPage({
  params,
  searchParams,
}: {
  params: Promise<{ publicId: string }>;
  searchParams: Promise<{ unlocked?: string }>;
}) {
  const { publicId } = await params;
  const { unlocked } = await searchParams;
  const audit = getAudit(publicId);
  if (!audit) notFound();

  // Check the durable DB for payment entitlement status
  const entitlementRecord = await getAuditEntitlement(publicId);

  // Allow ?unlocked=1 parameter only in non-production environments
  const devUnlock = process.env.NODE_ENV !== 'production' && unlocked === '1';

  const isUnlocked = devUnlock || entitlementRecord.unlocked;

  return <ClaimAuditPublicContent audit={audit} unlocked={isUnlocked} />;
}
