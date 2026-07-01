import type { Metadata } from 'next';
import MedicalWellnessContent from '@/components/scrutexity/medical-wellness-content';

export const metadata: Metadata = {
  title: 'Scrutexity Medical & Wellness | Recover Missed Bookings Without Risky Marketing',
  description:
    'Recover missed bookings without risky medical marketing. For med spas, urgent care clinics, veterinary practices, wellness centers, and spas. Read-only first, BAA on request before patient-adjacent activation, staff-approved follow-up, SHA-256 seals available.',
  alternates: { canonical: '/medical-wellness' },
};

export default function MedicalWellnessPage() {
  return <MedicalWellnessContent />;
}
