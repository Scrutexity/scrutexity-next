import type { Metadata } from 'next';
import RecoveryLandingPage from '@/components/RecoveryLandingPage';

export const metadata: Metadata = { title: 'Boulevard Lead Recovery | Scrutexity', description: 'Recover missed Boulevard calls, texts, forms, and follow-ups without replacing your booking software.', alternates: { canonical: '/boulevard-lead-recovery' } };
export default function Page() { return <RecoveryLandingPage platform="Boulevard" />; }
