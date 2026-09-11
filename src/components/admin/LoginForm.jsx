'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { clearSession, getToken, login, setSession } from '@/lib/api';

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Arriving here after a rejected guard means the stored token is no good.
  useEffect(() => {
    if (reason) clearSession();
    else if (getToken()) router.replace('/admin/dashboard');
  }, [reason, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(email.trim(), password);
      setSession(res.data.token, res.data.user);
      router.replace('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Sign in failed.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-black tracking-tight text-white">
            TEAM<span className="text-brand-500">LIVA</span>
          </Link>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Operations Console
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8"
          noValidate
        >
          <h1 className="text-lg font-black text-brand-900">Sign in</h1>

          {reason === 'auth' && (
            <p className="rounded-xl bg-amber-50 p-3 text-[11px] font-bold text-amber-800">
              Please sign in to open the dashboard.
            </p>
          )}
          {reason === 'expired' && (
            <p className="rounded-xl bg-amber-50 p-3 text-[11px] font-bold text-amber-800">
              Your session expired. Sign in again.
            </p>
          )}
          {reason === 'forbidden' && (
            <p className="rounded-xl bg-rose-50 p-3 text-[11px] font-bold text-rose-700">
              That account cannot access the operations console.
            </p>
          )}

          <div>
            <label htmlFor="admin-email" className="label">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              placeholder="you@teamliva.com"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-rose-50 p-3 text-[11px] font-bold text-rose-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5">
            {submitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>

          <Link
            href="/"
            className="block text-center text-[11px] font-extrabold text-slate-500 hover:text-brand-600"
          >
            ← Back to website
          </Link>
        </form>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-950" />}>
      <LoginFormInner />
    </Suspense>
  );
}
