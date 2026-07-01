import { Metadata } from 'next';
import WeekendRecoveryContent from './WeekendRecoveryContent';

export const metadata: Metadata = {
  title: 'Case Study: Weekend Recovery | Scrutexity',
  description: '30-day audit of a high-volume NYC metro medspa. 47 after-hours inquiries, 14 automatically booked, $2,100 in deposits captured, $11,400 projected treatment pipeline recovered.',
};

export default function WeekendRecoveryPage() {
  return <WeekendRecoveryContent />;
}
