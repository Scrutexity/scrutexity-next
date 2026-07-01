import type { Metadata } from 'next';
import RecoveryLandingPage from '@/components/RecoveryLandingPage';

export const metadata: Metadata = { title: 'Mangomint Lead Recovery | Scrutexity', description: 'Recover missed Mangomint calls, texts, forms, and follow-ups without replacing your booking software.', alternates: { canonical: '/mangomint-lead-recovery' } };
export default function Page() { return <RecoveryLandingPage platform="Mangomint" />; }
