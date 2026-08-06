import type { Metadata } from 'next';
import AgentAuditContent from '@/components/scrutexity/agent-audit-content';

export const metadata: Metadata = {
  title: 'Agent Audit Receipt | Scrutexity',
  description: 'Verify what your AI voice agent or chatbot is allowed to promise before you deploy it. Paste your transcript for an instant compliance scan.',
  alternates: { canonical: '/agent-audit' },
  robots: { index: false, follow: true },
};

export default function AgentAuditPage() {
  return <AgentAuditContent />;
}
