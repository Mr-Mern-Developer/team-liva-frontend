'use client';

import { useEffect, useRef } from 'react';

import StatusBadge from './StatusBadge';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Field layout per tab — mirrors what each collection actually stores. */
const LAYOUTS = {
  inquiries: {
    title: (r) => r.name,
    fields: [
      { label: 'Email', key: 'email', type: 'email' },
      { label: 'Phone', key: 'phone', type: 'tel' },
      { label: 'Company', key: 'company' },
      { label: 'Service', key: 'service' },
      { label: 'Scope', key: 'teamSize' },
    ],
    body: { label: 'Project details', key: 'message' },
  },
  contacts: {
    title: (r) => r.name,
    fields: [
      { label: 'Email', key: 'email', type: 'email' },
      { label: 'Phone', key: 'phone', type: 'tel' },
      { label: 'Company', key: 'company' },
      { label: 'Subject', key: 'subject' },
    ],
    body: { label: 'Message', key: 'message' },
  },
  applications: {
    title: (r) => r.fullName,
    fields: [
      { label: 'Email', key: 'email', type: 'email' },
      { label: 'Phone', key: 'phone', type: 'tel' },
      { label: 'Position', key: 'position' },
      { label: 'Experience', key: 'experience' },
      { label: 'Portfolio', key: 'portfolio', type: 'url' },
      { label: 'Resume', key: 'resumeUrl', type: 'url' },
    ],
    body: { label: 'Cover note', key: 'coverNote' },
  },
};

export default function RecordModal({ record, tab, onClose, onDelete, deleting }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!record) return undefined;

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
  }, [record, onClose]);

  if (!record) return null;

  const layout = LAYOUTS[tab];

  const renderValue = (field) => {
    const value = record[field.key];
    if (!value) return <span className="text-slate-400">—</span>;

    if (field.type === 'email') {
      return (
        <a href={`mailto:${value}`} className="text-brand-600 hover:underline">
          {value}
        </a>
      );
    }
    if (field.type === 'tel') {
      return (
        <a href={`tel:${value}`} className="text-brand-600 hover:underline">
          {value}
        </a>
      );
    }
    if (field.type === 'url') {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-brand-600 hover:underline"
        >
          {value}
        </a>
      );
    }
    return value;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-title"
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl focus:outline-none"
      >
        <header className="sticky top-0 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 id="record-title" className="text-lg font-black text-brand-900">
              {layout.title(record)}
            </h2>
            <p className="mt-1 text-[11px] font-bold text-slate-500">
              Received {formatDate(record.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={record.status} />
            <button
              onClick={onClose}
              aria-label="Close details"
              className="text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="space-y-5 px-6 py-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            {layout.fields.map((field) => (
              <div key={field.key}>
                <dt className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {field.label}
                </dt>
                <dd className="mt-1 text-xs font-bold text-slate-800">{renderValue(field)}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              {layout.body.label}
            </h3>
            <div className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-xs font-semibold leading-relaxed text-slate-700">
              {record[layout.body.key] || (
                <span className="text-slate-400">Nothing was written here.</span>
              )}
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
          <a
            href={`mailto:${record.email}`}
            className="rounded-xl bg-brand-900 px-4 py-2.5 text-[11px] font-black text-white hover:bg-brand-600"
          >
            <i className="fa-solid fa-reply mr-1.5" aria-hidden="true" />
            Reply by email
          </a>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-ghost px-4 py-2.5 text-[11px]">
              Close
            </button>
            <button
              onClick={() => onDelete(record)}
              disabled={deleting}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-[11px] font-black text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
            >
              {deleting ? (
                <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
              ) : (
                <>
                  <i className="fa-solid fa-trash mr-1.5" aria-hidden="true" />
                  Delete
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
