import { Metadata } from 'next';
import BoulevardIntegrationContent from './BoulevardIntegrationContent';

export const metadata: Metadata = {
  title: 'Boulevard Integration | Scrutexity',
  description: 'A native Boulevard integration built for the luxury aesthetics ledger. Read live provider availability, respect room resource constraints, and write confirmed bookings with Stripe deposit IDs attached.',
};

export default function BoulevardIntegrationPage() {
  return <BoulevardIntegrationContent />;
}
