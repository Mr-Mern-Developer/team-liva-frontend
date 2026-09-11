'use client';

/**
 * Generic submissions table. `columns` is [{ key, label, render?, className? }];
 * it scrolls horizontally on small screens rather than squeezing the page.
 */
export default function DataTable({ columns, rows, loading, emptyText, error, onRetry }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-xs font-black text-slate-500">
        <i className="fa-solid fa-spinner fa-spin text-brand-500" aria-hidden="true" />
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3 py-16 text-center">
        <p className="text-xs font-black text-rose-600">{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-ghost mx-auto text-[11px]">
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!rows.length) {
    return (
      <p className="py-16 text-center text-xs font-black text-slate-400">
        {emptyText || 'Nothing here yet.'}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row._id}
              className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/80"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3.5 align-top text-xs font-bold text-slate-700 ${
                    col.className || ''
                  }`}
                >
                  {col.render ? col.render(row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
