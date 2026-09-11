'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import DataTable from './DataTable';
import RecordModal from './RecordModal';
import { statusClasses } from './StatusBadge';
import {
  clearSession,
  deleteApplication,
  deleteContact,
  deleteInquiry,
  fetchApplications,
  fetchContacts,
  fetchInquiries,
  fetchStats,
  updateApplicationStatus,
  updateContactStatus,
  updateInquiryStatus,
} from '@/lib/api';

const TABS = [
  { key: 'inquiries', label: 'Inquiries', icon: 'fa-briefcase' },
  { key: 'contacts', label: 'Messages', icon: 'fa-envelope' },
  { key: 'applications', label: 'Applications', icon: 'fa-user-plus' },
];

const STATUS_OPTIONS = {
  inquiries: ['new', 'contacted', 'qualified', 'won', 'closed'],
  contacts: ['new', 'read', 'replied', 'archived'],
  applications: ['new', 'screening', 'interview', 'hired', 'rejected'],
};

const FETCHERS = {
  inquiries: fetchInquiries,
  contacts: fetchContacts,
  applications: fetchApplications,
};

const UPDATERS = {
  inquiries: updateInquiryStatus,
  contacts: updateContactStatus,
  applications: updateApplicationStatus,
};

const DELETERS = {
  inquiries: deleteInquiry,
  contacts: deleteContact,
  applications: deleteApplication,
};

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

export default function Dashboard({ user }) {
  const router = useRouter();
  const [tab, setTab] = useState('inquiries');
  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetchStats();
      setStats(res.data);
    } catch {
      /* tiles simply stay empty; the table below carries the real signal */
    }
  }, []);

  const loadRows = useCallback(async (which) => {
    setLoading(true);
    setError('');
    try {
      const res = await FETCHERS[which]('?limit=100');
      setRows(res.data.items);
    } catch (err) {
      setError(err.message || 'Could not load records.');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadRows(tab);
  }, [tab, loadRows]);

  const handleStatusChange = async (id, status) => {
    const previous = rows;
    // Optimistic: the select should feel instant, and we roll back on failure.
    setRows((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    setActive((prev) => (prev && prev._id === id ? { ...prev, status } : prev));
    try {
      await UPDATERS[tab](id, status);
      toast.success(`Status set to "${status}"`);
      loadStats();
    } catch (err) {
      setRows(previous);
      toast.error(err.message || 'Could not update status.');
    }
  };

  const handleDelete = async (record) => {
    const label = record.name || record.fullName || 'this record';
    // Deleting a submission is unrecoverable, so make it a deliberate click.
    if (!window.confirm(`Delete the record from ${label}? This cannot be undone.`)) return;

    setDeletingId(record._id);
    try {
      await DELETERS[tab](record._id);
      setRows((prev) => prev.filter((r) => r._id !== record._id));
      setActive(null);
      toast.success('Record deleted');
      loadStats();
    } catch (err) {
      toast.error(err.message || 'Could not delete the record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = () => {
    clearSession();
    router.replace('/admin/login');
  };

  const statusCell = (row) => (
    // text-base below sm: iOS Safari zooms the page whenever a focused control
    // renders under 16px, and the table already scrolls horizontally there.
    <select
      value={row.status}
      onChange={(e) => handleStatusChange(row._id, e.target.value)}
      aria-label={`Status for ${row.name || row.fullName}`}
      className={`rounded-lg px-2 py-1 text-base font-black uppercase tracking-wide ring-1 focus:outline-none focus:ring-2 sm:text-[10px] ${statusClasses(
        row.status
      )}`}
    >
      {STATUS_OPTIONS[tab].map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );

  // Long free text never fits a cell — open the full record instead.
  const viewCell = (bodyKey, label) => (row) => {
    const preview = row[bodyKey];
    return (
      <button
        onClick={() => setActive(row)}
        className="inline-flex max-w-[13rem] items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-left text-[11px] font-black text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50"
      >
        <i className="fa-regular fa-message shrink-0 text-[10px]" aria-hidden="true" />
        <span className="truncate">{preview ? preview.slice(0, 28) : `View ${label}`}</span>
      </button>
    );
  };

  const actionsCell = (row) => (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setActive(row)}
        aria-label="View full record"
        title="View"
        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-black text-slate-600 hover:bg-slate-50"
      >
        <i className="fa-solid fa-eye" aria-hidden="true" />
      </button>
      <button
        onClick={() => handleDelete(row)}
        disabled={deletingId === row._id}
        aria-label="Delete record"
        title="Delete"
        className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-[11px] font-black text-rose-600 hover:bg-rose-50 disabled:opacity-50"
      >
        <i
          className={`fa-solid ${deletingId === row._id ? 'fa-spinner fa-spin' : 'fa-trash'}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );

  const COLUMNS = {
    inquiries: [
      {
        key: 'name',
        label: 'Name',
        render: (r) => <span className="font-black text-brand-900">{r.name}</span>,
      },
      {
        key: 'email',
        label: 'Email',
        render: (r) => (
          <a href={`mailto:${r.email}`} className="text-brand-600 hover:underline">
            {r.email}
          </a>
        ),
      },
      { key: 'company', label: 'Company', render: (r) => r.company || '—' },
      { key: 'service', label: 'Service' },
      { key: 'teamSize', label: 'Scope' },
      { key: 'message', label: 'Message', render: viewCell('message', 'details') },
      { key: 'status', label: 'Status', render: statusCell },
      {
        key: 'createdAt',
        label: 'Received',
        render: (r) => <span className="whitespace-nowrap text-slate-500">{formatDate(r.createdAt)}</span>,
      },
      { key: 'actions', label: '', render: actionsCell },
    ],
    contacts: [
      {
        key: 'name',
        label: 'Name',
        render: (r) => <span className="font-black text-brand-900">{r.name}</span>,
      },
      {
        key: 'email',
        label: 'Email',
        render: (r) => (
          <a href={`mailto:${r.email}`} className="text-brand-600 hover:underline">
            {r.email}
          </a>
        ),
      },
      { key: 'company', label: 'Company', render: (r) => r.company || '—' },
      { key: 'subject', label: 'Subject' },
      { key: 'message', label: 'Message', render: viewCell('message', 'message') },
      { key: 'status', label: 'Status', render: statusCell },
      {
        key: 'createdAt',
        label: 'Received',
        render: (r) => <span className="whitespace-nowrap text-slate-500">{formatDate(r.createdAt)}</span>,
      },
      { key: 'actions', label: '', render: actionsCell },
    ],
    applications: [
      {
        key: 'fullName',
        label: 'Candidate',
        render: (r) => <span className="font-black text-brand-900">{r.fullName}</span>,
      },
      {
        key: 'email',
        label: 'Email',
        render: (r) => (
          <a href={`mailto:${r.email}`} className="text-brand-600 hover:underline">
            {r.email}
          </a>
        ),
      },
      { key: 'position', label: 'Position' },
      { key: 'experience', label: 'Experience' },
      {
        key: 'resumeUrl',
        label: 'Resume',
        render: (r) =>
          r.resumeUrl ? (
            <a
              href={r.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              Open
            </a>
          ) : (
            '—'
          ),
      },
      { key: 'coverNote', label: 'Cover note', render: viewCell('coverNote', 'note') },
      { key: 'status', label: 'Status', render: statusCell },
      {
        key: 'createdAt',
        label: 'Applied',
        render: (r) => <span className="whitespace-nowrap text-slate-500">{formatDate(r.createdAt)}</span>,
      },
      { key: 'actions', label: '', render: actionsCell },
    ],
  };

  const TILES = [
    { label: 'Inquiries', value: stats?.inquiries.total, badge: stats?.inquiries.new, icon: 'fa-briefcase' },
    { label: 'Messages', value: stats?.contacts.total, badge: stats?.contacts.new, icon: 'fa-envelope' },
    {
      label: 'Applications',
      value: stats?.applications.total,
      badge: stats?.applications.new,
      icon: 'fa-user-plus',
    },
    { label: 'Subscribers', value: stats?.subscribers, icon: 'fa-bell' },
    { label: 'Active talent', value: stats?.talents, icon: 'fa-users' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-brand-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Link href="/" className="text-lg font-black tracking-tight text-white">
              TEAM<span className="text-brand-500">LIVA</span>
            </Link>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Operations Console
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-black text-white">{user.name}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-brand-500">
                {user.role}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-black text-white transition-colors hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section aria-label="Summary">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {TILES.map((t) => (
              <li key={t.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    {t.label}
                  </span>
                  <i className={`fa-solid ${t.icon} text-slate-300`} aria-hidden="true" />
                </div>
                <p className="mt-2 text-2xl font-black text-brand-900">
                  {t.value ?? <span className="text-slate-300">–</span>}
                </p>
                {t.badge > 0 && (
                  <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-600">
                    {t.badge} new
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Submission type" className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-colors ${
                    tab === t.key
                      ? 'bg-brand-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <i className={`fa-solid ${t.icon}`} aria-hidden="true" />
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-slate-400">{rows.length} records</span>
              <button
                onClick={() => {
                  loadRows(tab);
                  loadStats();
                }}
                className="rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-600 hover:bg-slate-50"
              >
                <i className="fa-solid fa-rotate-right mr-1.5" aria-hidden="true" />
                Refresh
              </button>
            </div>
          </div>

          <DataTable
            columns={COLUMNS[tab]}
            rows={rows}
            loading={loading}
            error={error}
            onRetry={() => loadRows(tab)}
            emptyText={`No ${tab} submitted yet.`}
          />
        </section>
      </div>

      <RecordModal
        record={active}
        tab={tab}
        onClose={() => setActive(null)}
        onDelete={handleDelete}
        deleting={deletingId === active?._id}
      />
    </div>
  );
}
