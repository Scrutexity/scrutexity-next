import { Metadata } from 'next';
import InteractiveTriagePlayground from '@/components/InteractiveTriagePlayground';

export const metadata: Metadata = {
  title: 'Classification Sandbox | Scrutexity',
  description: 'Stress-test the deterministic classifier. See how Scrutexity handles scheduling inquiries vs. clinical concerns before anything touches your EMR.',
};

export default function TriagePage() {
  return <InteractiveTriagePlayground />;
}
