import type { Metadata } from 'next';
import MedicalWellnessContent from '@/components/scrutexity/medical-wellness-content';

export const metadata: Metadata = {
  title: 'Scrutexity Medical & Wellness | Recover Missed Bookings Without Risky Marketing',
  description:
    'Recover missed bookings without risky medical marketing. For med spas, urgent care clinics, veterinary practices, wellness centers, and spas. Read-only first, staff-approved follow-up, claims-first governance.',
  alternates: { canonical: '/medical-wellness' },
  robots: { index: false, follow: true },
};

export default function MedicalWellnessPage() {
  return <MedicalWellnessContent />;
}
