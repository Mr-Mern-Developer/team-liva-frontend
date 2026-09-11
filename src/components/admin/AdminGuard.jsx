'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ApiError, clearSession, fetchMe, getToken } from '@/lib/api';

const ALLOWED_ROLES = ['admin', 'ops'];

/**
 * Client-side route guard. It verifies the stored token against
 * GET /api/auth/me, so a forged localStorage entry gets rejected by the
 * server rather than trusted here. Anyone without a valid admin/ops session
 * is redirected to /admin/login with a reason.
 *
 * Note: this guards the UI. The real protection is that every admin endpoint
 * requires the bearer token server-side — a static export cannot gate routes.
 */
export default function AdminGuard({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!getToken()) {
        router.replace('/admin/login?reason=auth');
        return;
      }

      try {
        const res = await fetchMe();
        if (cancelled) return;

        const me = res.data.user;
        if (!ALLOWED_ROLES.includes(me.role)) {
          clearSession();
          router.replace('/admin/login?reason=forbidden');
          return;
        }

        setUser(me);
        setChecking(false);
      } catch (err) {
        if (cancelled) return;
        clearSession();

        // A network failure shouldn't read as "your session expired".
        const reason =
          err instanceof ApiError && err.status === 401 ? 'expired' : 'auth';
        router.replace(`/admin/login?reason=${reason}`);
      }
    };

    verify();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-sm font-black text-slate-500">
          <i className="fa-solid fa-spinner fa-spin text-brand-500" aria-hidden="true" />
          Verifying session…
        </div>
      </div>
    );
  }

  return children(user);
}
