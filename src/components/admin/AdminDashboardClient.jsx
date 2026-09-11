'use client';

import AdminGuard from './AdminGuard';
import Dashboard from './Dashboard';

/** Guard first, dashboard only once a valid admin/ops session is confirmed. */
export default function AdminDashboardClient() {
  return <AdminGuard>{(user) => <Dashboard user={user} />}</AdminGuard>;
}
