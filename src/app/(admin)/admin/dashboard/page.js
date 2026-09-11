import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Operations Dashboard',
  description: 'Teamliva operations console — inquiries, messages and applications.',
  path: '/admin/dashboard',
  noIndex: true,
});

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
