'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { submitApplication } from '@/lib/api';
import { EXPERIENCE_OPTIONS, POSITION_OPTIONS } from '@/lib/data';

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  position: POSITION_OPTIONS[0],
  experience: EXPERIENCE_OPTIONS[1],
  portfolio: '',
  resumeUrl: '',
  coverNote: '',
};

export default function ApplicationForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const toastId = toast.loading('Submitting your application…');
    try {
      const res = await submitApplication({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        position: form.position,
        experience: form.experience,
        portfolio: form.portfolio.trim(),
        resumeUrl: form.resumeUrl.trim(),
        coverNote: form.coverNote.trim(),
      });
      toast.success(res.message || 'Application received.', { id: toastId });
      setForm(EMPTY);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      toast.error(err.message || 'Could not submit your application.', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-name" className="label">
            Full name
          </label>
          <input
            id="a-name"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            className={`field ${errors.fullName ? 'field-error' : ''}`}
            placeholder="Jane Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-[11px] font-bold text-rose-600">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="a-email" className="label">
            Email
          </label>
          <input
            id="a-email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={`field ${errors.email ? 'field-error' : ''}`}
            placeholder="jane@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-[11px] font-bold text-rose-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-position" className="label">
            Position
          </label>
          <select
            id="a-position"
            value={form.position}
            onChange={(e) => update('position', e.target.value)}
            className="field"
          >
            {POSITION_OPTIONS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="a-exp" className="label">
            Experience
          </label>
          <select
            id="a-exp"
            value={form.experience}
            onChange={(e) => update('experience', e.target.value)}
            className="field"
          >
            {EXPERIENCE_OPTIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-phone" className="label">
            Phone <span className="font-bold normal-case text-slate-400">(optional)</span>
          </label>
          <input
            id="a-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="a-portfolio" className="label">
            Portfolio URL <span className="font-bold normal-case text-slate-400">(optional)</span>
          </label>
          <input
            id="a-portfolio"
            type="url"
            value={form.portfolio}
            onChange={(e) => update('portfolio', e.target.value)}
            className="field"
            placeholder="https://"
          />
        </div>
      </div>

      <div>
        <label htmlFor="a-resume" className="label">
          Resume link <span className="font-bold normal-case text-slate-400">(Drive / Dropbox)</span>
        </label>
        <input
          id="a-resume"
          type="url"
          value={form.resumeUrl}
          onChange={(e) => update('resumeUrl', e.target.value)}
          className="field"
          placeholder="https://drive.google.com/..."
        />
      </div>

      <div>
        <label htmlFor="a-note" className="label">
          Cover note <span className="font-bold normal-case text-slate-400">(optional)</span>
        </label>
        <textarea
          id="a-note"
          rows={4}
          value={form.coverNote}
          onChange={(e) => update('coverNote', e.target.value)}
          className="field resize-none"
          placeholder="What kind of engagement are you looking for?"
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
        {submitting ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}
