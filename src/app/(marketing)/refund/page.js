import LegalPage from '@/components/LegalPage';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Refund and Cancellation Policy',
  description:
    'Billing cycles, replacement windows, milestone terms and dispute resolution for Teamliva staffing, BPO, web development and design engagements.',
  path: '/refund',
});

const SECTIONS = [
  {
    heading: 'Staffing & BPO Subscriptions',
    body: [
      'Managed staffing and BPO pods operate on a monthly billing cycle. Clients may request a replacement professional within the first 5 business days if initial fit does not meet expectations. Retainer deposits for custom squad mobilization are non-refundable once hardware provisioning and BAA execution have commenced.',
    ],
  },
  {
    heading: 'Web Development & Design Projects',
    body: [
      'Project fees are divided into milestone payments. Milestone deposits are non-refundable once creative design or coding sprints have been initiated. If a project is cancelled by the client prior to milestone completion, work completed up to that date will be delivered, and unused milestone balances will be reviewed for credit.',
    ],
  },
  {
    heading: 'Dispute Resolution',
    body: [
      `To request a review of an invoice or service delivery, please contact our operations desk at ${SITE.email} within 7 days of invoice receipt.`,
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund and Cancellation Policy"
      updated="September 7, 2026"
      sections={SECTIONS}
    />
  );
}
