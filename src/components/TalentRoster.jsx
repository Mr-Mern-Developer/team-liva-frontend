'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { useQuoteModal } from './QuoteModalProvider';
import { fetchTalents } from '@/lib/api';
import { FALLBACK_TALENTS, TALENT_TYPES } from '@/lib/data';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RADAR_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 100,
      grid: { color: 'rgba(0,0,0,0.08)' },
      angleLines: { color: 'rgba(0,0,0,0.08)' },
      pointLabels: {
        color: '#0b1f3f',
        font: { family: 'Plus Jakarta Sans', size: 10, weight: 700 },
      },
      ticks: { display: false, stepSize: 25 },
    },
  },
  plugins: { legend: { display: false } },
};

export default function TalentRoster() {
  const { openQuote } = useQuoteModal();
  const [talents, setTalents] = useState(FALLBACK_TALENTS);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(FALLBACK_TALENTS[0]._id);

  useEffect(() => {
    const controller = new AbortController();

    fetchTalents(undefined, { signal: controller.signal })
      .then((res) => {
        const items = res?.data?.items;
        if (items?.length) {
          setTalents(items);
          setSelectedId(items[0]._id);
        }
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => controller.abort();
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? talents : talents.filter((t) => t.type === filter)),
    [talents, filter]
  );

  // Keep the detail panel in sync when the active filter hides the selection.
  const selected = visible.find((t) => t._id === selectedId) || visible[0] || null;

  const chartData = useMemo(() => {
    if (!selected?.skills) return null;
    const skills = selected.skills;
    const labels = ['ClinicalOps', 'HIPAA', 'EHR', 'Coordination', 'SLA'];

    return {
      labels,
      datasets: [
        {
          label: selected.name,
          data: labels.map((k) => skills[k] ?? 0),
          backgroundColor: 'rgba(0, 168, 150, 0.15)',
          borderColor: '#00a896',
          borderWidth: 2,
          pointBackgroundColor: '#00a896',
          pointRadius: 3,
        },
      ],
    };
  }, [selected]);

  return (
    <section
      id="talent"
      className="w-full border-y border-slate-200 bg-white/50 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Talent Roster</p>
          <h2 className="section-title">Pre-Vetted Professional Roster</h2>
        </div>

        <div
          role="group"
          aria-label="Filter roster by specialty"
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {TALENT_TYPES.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              aria-pressed={filter === tab}
              className={`rounded-xl px-4 py-2 text-xs font-black transition-colors ${
                filter === tab
                  ? 'bg-brand-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm font-bold text-slate-500">
            No professionals listed under this specialty yet.
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {visible.map((person) => (
                <article
                  key={person._id}
                  onClick={() => setSelectedId(person._id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(person._id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected?._id === person._id}
                  className={`glass-card glass-card-hover flex cursor-pointer flex-col justify-between p-5 ${
                    selected?._id === person._id ? 'ring-2 ring-brand-500' : ''
                  }`}
                >
                  <div>
                    <div className="mb-3 flex items-start gap-3">
                      {person.avatar && (
                        <Image
                          src={person.avatar}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-2xl border object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-black text-brand-900">{person.name}</h3>
                        <p className="text-xs font-extrabold text-brand-600">{person.role}</p>
                        <p className="mt-0.5 text-[10px] font-extrabold text-slate-500">
                          {person.exp} experience &middot; {person.status}
                        </p>
                      </div>
                    </div>
                    <ul className="mb-4 flex flex-wrap gap-1">
                      {(person.certs || []).map((c) => (
                        <li
                          key={c}
                          className="rounded-lg border bg-white px-2 py-0.5 text-[10px] font-extrabold text-slate-600"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="text-xs font-black text-brand-900">${person.rate}/hr</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuote({ interestedTalent: person._id });
                      }}
                      className="rounded-xl bg-brand-900 px-3.5 py-1.5 text-xs font-black text-white hover:bg-brand-600"
                    >
                      Hire
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {selected && (
              <aside className="glass-card flex flex-col justify-between p-6 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                    {selected.avatar && (
                      <Image
                        src={selected.avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-xl object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-black text-brand-900">{selected.name}</h3>
                      <p className="text-xs font-extrabold text-brand-600">{selected.role}</p>
                    </div>
                  </div>
                  <div className="relative my-3 h-56 sm:h-64">
                    {chartData && <Radar data={chartData} options={RADAR_OPTIONS} />}
                  </div>
                  <p className="text-center text-[11px] font-bold text-slate-500">
                    {selected.location} &middot; {selected.rating} rating
                  </p>
                </div>
                <button
                  onClick={() => openQuote({ interestedTalent: selected._id })}
                  className="btn-primary mt-4 w-full py-3"
                >
                  Request Candidate Introduction
                </button>
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
