'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { submitInquiry } from '@/lib/api';
import { SERVICE_OPTIONS, TEAM_SIZE_OPTIONS } from '@/lib/data';

const EMPTY = {
  service: 'Healthcare Staffing',
  teamSize: '4 - 10 Members Managed Pod',
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  interestedTalent: null,
};

/**
 * Three-step "Enterprise Solution Inquiry" form. Step 3 POSTs to
 * /api/inquiries and surfaces per-field errors returned by the API.
 */
export default function QuoteModal({ isOpen, onClose, prefill }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);

  // Re-seed from the trigger (a service card or roster card) on each open.
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
      setForm({ ...EMPTY, ...prefill });
    }
  }, [isOpen, prefill]);

  // Escape closes; body scroll is locked while the dialog is up.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const update = useCallback((patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  if (!isOpen) return null;

  const validateStep3 = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Work email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setSubmitting(true);
    const toastId = toast.loading('Submitting your inquiry…');
    try {
      const res = await submitInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        service: form.service,
        teamSize: form.teamSize,
        message: form.message.trim(),
        interestedTalent: form.interestedTalent || undefined,
      });
      toast.success(res.message || 'Inquiry received.', { id: toastId });
      onClose();
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      toast.error(err.message || 'Could not submit your inquiry.', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative max-h-[90vh] w-full max-w-lg animate-fade-up space-y-6 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl focus:outline-none sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close inquiry form"
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
        >
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
        </button>

        <div>
          <span className="text-xs font-black uppercase text-brand-600">Step {step} of 3</span>
          <h2 id="quote-title" className="mt-1 text-xl font-black text-brand-900">
            Enterprise Solution Inquiry
          </h2>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 flex-1 rounded-full ${n <= step ? 'bg-brand-500' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-700">Select service category:</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update({ service: s })}
                  aria-pressed={form.service === s}
                  className={`rounded-2xl border p-3 text-left text-xs font-black transition-colors ${
                    form.service === s
                      ? 'border-brand-500 bg-brand-50 text-brand-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(2)} className="btn-primary w-full">
              Next: Scope &amp; Size
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="q-team-size" className="label">
                Scope or team size
              </label>
              <select
                id="q-team-size"
                value={form.teamSize}
                onChange={(e) => update({ teamSize: e.target.value })}
                className="field"
              >
                {TEAM_SIZE_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="q-message" className="label">
                Project details <span className="font-bold normal-case text-slate-400">(optional)</span>
              </label>
              <textarea
                id="q-message"
                rows={4}
                value={form.message}
                onChange={(e) => update({ message: e.target.value })}
                placeholder="Tell us about timelines, systems in use, or compliance needs."
                className="field resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="btn-ghost w-1/3">
                Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="btn-primary w-2/3">
                Next: Contact Info
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="q-name" className="label">
                Full name
              </label>
              <input
                id="q-name"
                type="text"
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'q-name-error' : undefined}
                className={`field ${errors.name ? 'field-error' : ''}`}
                placeholder="Jane Doe"
              />
              {errors.name && (
                <p id="q-name-error" className="mt-1 text-[11px] font-bold text-rose-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="q-email" className="label">
                Work email
              </label>
              <input
                id="q-email"
                type="email"
                value={form.email}
                onChange={(e) => update({ email: e.target.value })}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'q-email-error' : undefined}
                className={`field ${errors.email ? 'field-error' : ''}`}
                placeholder="jane@company.com"
              />
              {errors.email && (
                <p id="q-email-error" className="mt-1 text-[11px] font-bold text-rose-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="q-company" className="label">
                  Company <span className="font-bold normal-case text-slate-400">(optional)</span>
                </label>
                <input
                  id="q-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => update({ company: e.target.value })}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="q-phone" className="label">
                  Phone <span className="font-bold normal-case text-slate-400">(optional)</span>
                </label>
                <input
                  id="q-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="field"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 text-[11px] font-bold text-slate-600">
              <span className="text-brand-600">{form.service}</span> &middot; {form.teamSize}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={submitting}
                className="btn-ghost w-1/3"
              >
                Back
              </button>
              <button type="submit" disabled={submitting} className="btn-primary w-2/3">
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
