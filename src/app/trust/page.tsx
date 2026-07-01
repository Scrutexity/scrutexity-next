import { Metadata } from 'next';
import TrustCenterContent from './TrustCenterContent';

export const metadata: Metadata = {
  title: 'Trust Center | Scrutexity',
  description: 'Absolute compliance. Absolute control. Deterministic PHI stripping, zero-retention compute, SOC 2 Type II infrastructure, and 1-click access revocation. BAA signed before activation.',
};

export default function TrustPage() {
  return <TrustCenterContent />;
}
