'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { subscribeNewsletter } from '@/lib/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Enter a valid email address');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Subscribing…');
    try {
      const res = await subscribeNewsletter(email.trim());
      toast.success(res.message || 'Subscribed.', { id: toastId });
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Subscription failed.', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for updates
      </label>
      {/* text-base below sm stops iOS Safari zooming the page on focus. */}
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-base font-bold text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-xs"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-black text-brand-950 transition-colors hover:bg-teal-400 disabled:opacity-60"
      >
        {submitting ? <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> : 'Subscribe'}
      </button>
    </form>
  );
}
