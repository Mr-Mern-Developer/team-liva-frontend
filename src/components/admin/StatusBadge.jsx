'use client';

const TONES = {
  new: 'bg-brand-50 text-brand-600 ring-brand-500/30',
  contacted: 'bg-indigo-50 text-indigo-700 ring-indigo-500/30',
  qualified: 'bg-amber-50 text-amber-700 ring-amber-500/30',
  won: 'bg-emerald-50 text-emerald-700 ring-emerald-500/30',
  closed: 'bg-slate-100 text-slate-600 ring-slate-400/30',
  read: 'bg-indigo-50 text-indigo-700 ring-indigo-500/30',
  replied: 'bg-emerald-50 text-emerald-700 ring-emerald-500/30',
  archived: 'bg-slate-100 text-slate-600 ring-slate-400/30',
  screening: 'bg-indigo-50 text-indigo-700 ring-indigo-500/30',
  interview: 'bg-amber-50 text-amber-700 ring-amber-500/30',
  hired: 'bg-emerald-50 text-emerald-700 ring-emerald-500/30',
  rejected: 'bg-rose-50 text-rose-700 ring-rose-500/30',
};

/** Read-only pill, and the styling source for the inline status <select>. */
export function statusClasses(status) {
  return TONES[status] || TONES.closed;
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-wide ring-1 ${statusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}
