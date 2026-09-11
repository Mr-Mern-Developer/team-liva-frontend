'use client';

import { useMemo, useState } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const LABELS = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];

const SERIES = {
  claims: { label: 'Claims processed', data: [120, 310, 480, 620, 850, 990, 1150] },
  tickets: { label: 'Tickets resolved', data: [45, 120, 210, 340, 450, 520, 610] },
  uptime: { label: 'Uptime %', data: [99.9, 99.9, 100, 99.8, 100, 100, 100] },
};

export default function LivePortal() {
  const [tab, setTab] = useState('claims');

  const chartData = useMemo(
    () => ({
      labels: LABELS,
      datasets: [
        {
          label: SERIES[tab].label,
          data: SERIES[tab].data,
          borderColor: '#00a896',
          backgroundColor: 'rgba(0, 168, 150, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#00a896',
        },
      ],
    }),
    [tab]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { display: false } },
        y: {
          // Uptime sits in a narrow band near 100 — a zero baseline would flatten it.
          beginAtZero: tab !== 'uptime',
          ticks: { color: '#64748b' },
          grid: { color: 'rgba(0,0,0,0.04)' },
        },
      },
    }),
    [tab]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="eyebrow">Client Portal Simulator</p>
        <h2 className="section-title">Live Operational Governance</h2>
      </div>

      <div className="space-y-6 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          <h3 className="text-base font-black text-brand-900">
            Active Operations &amp; Development Center #04
          </h3>
          <div
            role="tablist"
            aria-label="Operational metric"
            className="flex items-center gap-2 overflow-x-auto rounded-xl border bg-slate-50 p-1 shadow-sm"
          >
            {Object.keys(SERIES).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-black capitalize transition-colors ${
                  tab === key ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-brand-900'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-60 w-full sm:h-64">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </section>
  );
}
