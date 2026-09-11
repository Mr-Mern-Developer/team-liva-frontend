'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { submitContact } from '@/lib/api';

const EMPTY = { name: '', email: '', company: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
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
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const toastId = toast.loading('Sending your message…');
    try {
      const res = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      toast.success(res.message || 'Message sent.', { id: toastId });
      setForm(EMPTY);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      toast.error(err.message || 'Could not send your message.', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="c-name"
          label="Full name"
          value={form.name}
          onChange={(v) => update('name', v)}
          error={errors.name}
          placeholder="Jane Doe"
        />
        <Field
          id="c-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update('email', v)}
          error={errors.email}
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="c-company"
          label="Company"
          optional
          value={form.company}
          onChange={(v) => update('company', v)}
          error={errors.company}
        />
        <Field
          id="c-phone"
          label="Phone"
          type="tel"
          optional
          value={form.phone}
          onChange={(v) => update('phone', v)}
          error={errors.phone}
        />
      </div>

      <Field
        id="c-subject"
        label="Subject"
        value={form.subject}
        onChange={(v) => update('subject', v)}
        error={errors.subject}
        placeholder="Scaling a 6-person RCM pod"
      />

      <div>
        <label htmlFor="c-message" className="label">
          Message
        </label>
        <textarea
          id="c-message"
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'c-message-error' : undefined}
          className={`field resize-none ${errors.message ? 'field-error' : ''}`}
          placeholder="Tell us what you need and the timeline you're working to."
        />
        {errors.message && (
          <p id="c-message-error" className="mt-1 text-[11px] font-bold text-rose-600">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
        {submitting ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}

function Field({ id, label, value, onChange, error, type = 'text', placeholder, optional }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-bold normal-case text-slate-400"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? 'field-error' : ''}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[11px] font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
