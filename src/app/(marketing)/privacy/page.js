import LegalPage from '@/components/LegalPage';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Teamliva collects, uses and protects corporate contact details, resumes and project data under HIPAA and SOC2 privacy protocols.',
  path: '/privacy',
});

const SECTIONS = [
  {
    heading: 'Data Collection',
    body: [
      'Teamliva collects corporate contact details, professional resumes, and project specifications when submitted via our platform or inquiry forms. We adhere to strict HIPAA and SOC2 privacy protocols for all healthcare and enterprise client data.',
    ],
  },
  {
    heading: 'Use of Information',
    body: [
      'Information collected is strictly used for candidate matching, managed squad deployment, project delivery, and operational communication. We never sell or distribute client data to third parties.',
    ],
  },
  {
    heading: 'Data Retention',
    body: [
      'Inquiry, contact and application records are retained for as long as needed to service the relationship, and are removed on request. Email us to have your record deleted.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [`Questions regarding our privacy practices should be directed to ${SITE.email}.`],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="September 7, 2026" sections={SECTIONS} />;
}
