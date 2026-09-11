'use client';

import { useMemo, useState } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useQuoteModal } from './QuoteModalProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HOURS_PER_MONTH = 160;
const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#0b1f3f',
        font: { family: 'Plus Jakarta Sans', weight: 700, size: 11 },
        boxWidth: 12,
      },
    },
    tooltip: {
      callbacks: { label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y}K` },
    },
  },
  scales: {
    x: { ticks: { color: '#64748b' }, grid: { display: false } },
    y: {
      ticks: { color: '#64748b', callback: (value) => `$${value}K` },
      grid: { color: 'rgba(0,0,0,0.04)' },
    },
  },
};

export default function RoiCalculator() {
  const { openQuote } = useQuoteModal();
  const [teamSize, setTeamSize] = useState(8);
  const [usRate, setUsRate] = useState(52);
  const [tlRate, setTlRate] = useState(18);

  const monthlyUS = teamSize * usRate * HOURS_PER_MONTH;
  const monthlyTL = teamSize * tlRate * HOURS_PER_MONTH;
  const annualSavings = (monthlyUS - monthlyTL) * 12;

  const chartData = useMemo(
    () => ({
      labels: YEARS,
      datasets: [
        {
          label: 'Traditional In-House ($K)',
          data: YEARS.map((_, i) => Math.round((monthlyUS * 12 * (i + 1)) / 1000)),
          backgroundColor: '#cbd5e1',
          borderRadius: 8,
        },
        {
          label: 'Teamliva Managed ($K)',
          data: YEARS.map((_, i) => Math.round((monthlyTL * 12 * (i + 1)) / 1000)),
          backgroundColor: '#00a896',
          borderRadius: 8,
        },
      ],
    }),
    [monthlyUS, monthlyTL]
  );

  return (
    <section id="calculator" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="eyebrow">Financial Simulation</p>
        <h2 className="section-title">Calculate Your Operational Savings</h2>
        <p className="mt-2 text-sm text-slate-600">
          Adjust squad size and hourly rates to compare traditional in-house costs with Teamliva.
        </p>
      </div>

      <div className="glass-card grid items-stretch gap-8 p-6 sm:p-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
          <div className="space-y-6">
            <Slider
              id="roi-team-size"
              label="Squad Size"
              display={`${teamSize} Professionals`}
              min={1}
              max={50}
              value={teamSize}
              onChange={setTeamSize}
            />
            <Slider
              id="roi-us-rate"
              label="Traditional Hourly Rate"
              display={`$${usRate}/hr`}
              min={25}
              max={120}
              value={usRate}
              onChange={setUsRate}
            />
            <Slider
              id="roi-tl-rate"
              label="Teamliva Managed Rate"
              display={`$${tlRate}/hr`}
              min={10}
              max={35}
              value={tlRate}
              onChange={setTlRate}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs font-bold text-slate-700">
            Projected Annual Savings:{' '}
            <strong className="text-base font-black text-brand-500">
              ${annualSavings.toLocaleString()}
            </strong>{' '}
            / year
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-slate-700">
              5-Year Cumulative Projections
            </h3>
            <div className="relative h-60 sm:h-64">
              <Bar data={chartData} options={CHART_OPTIONS} />
            </div>
          </div>
          <button
            onClick={() => openQuote()}
            className="btn-primary w-full rounded-2xl py-4"
          >
            Lock In Custom Rates
          </button>
        </div>
      </div>
    </section>
  );
}

function Slider({ id, label, display, min, max, value, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-black uppercase text-slate-700">
          {label}:
        </label>
        <output
          htmlFor={id}
          className="rounded-xl border bg-white px-3 py-1 text-xs font-black text-brand-900 shadow-sm"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="h-2.5 w-full cursor-pointer rounded-lg bg-slate-200 accent-brand-500"
      />
    </div>
  );
}
