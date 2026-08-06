import { Metadata } from 'next';
import CompanyContent from './CompanyContent';

export const metadata: Metadata = {
  title: 'Company | Scrutexity',
  description: 'We build infrastructure for medical aesthetics. Not chatbots. Scrutexity was built by sitting behind the front desks of high-volume clinics, watching $150 leads evaporate at 10 PM.',
  robots: { index: false, follow: true },
};

export default function CompanyPage() {
  return <CompanyContent />;
}
