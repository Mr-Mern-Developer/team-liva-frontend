import LegalPage from '@/components/LegalPage';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms and Conditions',
  description:
    'The terms governing use of the Teamliva website and our staffing, BPO, web development and graphic design engagements.',
  path: '/terms',
});

const SECTIONS = [
  {
    heading: 'Introduction',
    body: [
      'Welcome to Teamliva ("Company", "we", "our", "us"). By accessing or using our website, platform, and enterprise staffing, web development, and design services, you agree to comply with and be bound by these Terms and Conditions.',
    ],
  },
  {
    heading: 'Services & Engagements',
    body: [
      'Teamliva provides curated recruitment, remote staffing, back-office BPO pods, web development solutions, and graphic design solutions. All service engagements are governed by custom Statements of Work (SOW) agreed upon by both parties and supervised under active SLA guidelines.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All deliverables produced under Web Development and Graphic Design solutions become the sole property of the client upon full payment of agreed invoices. Teamliva retains proprietary frameworks used in general service delivery.',
    ],
  },
  {
    heading: 'Contact Information',
    body: [`For any questions regarding these terms, please contact us at ${SITE.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="September 7, 2026" sections={SECTIONS} />
  );
}
