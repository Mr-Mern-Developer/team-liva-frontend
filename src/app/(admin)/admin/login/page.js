import LoginForm from '@/components/admin/LoginForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin Sign In',
  description: 'Teamliva operations console sign-in.',
  path: '/admin/login',
  noIndex: true,
});

export default function AdminLoginPage() {
  return <LoginForm />;
}
