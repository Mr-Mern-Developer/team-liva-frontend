'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useQuoteModal } from './QuoteModalProvider';
import { fetchServices } from '@/lib/api';
import { FALLBACK_SERVICES } from '@/lib/data';

// Maps a service card onto the matching option in the inquiry modal.
const SERVICE_TO_OPTION = {
  bpo: 'Back-Office Pods',
  staffing: 'Healthcare Staffing',
  web: 'Web Development',
  design: 'Graphic Design',
};

export default function ServicesGrid({ heading = true }) {
  const { openQuote } = useQuoteModal();
  const [services, setServices] = useState(FALLBACK_SERVICES);

  // Seeded data wins when the API is up; the static list keeps the page
  // renderable when it isn't.
  useEffect(() => {
    const controller = new AbortController();

    fetchServices({ signal: controller.signal })
      .then((res) => {
        if (res?.data?.items?.length) setServices(res.data.items);
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      {heading && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow">Core Capabilities</p>
          <h2 className="section-title">Enterprise Solutions Matrix</h2>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((srv) => (
          <article
            key={srv._id || srv.slug}
            id={srv.slug}
            className="glass-card glass-card-hover flex scroll-mt-24 flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="relative h-40 w-full overflow-hidden">
                {srv.banner && (
                  <Image
                    src={srv.banner}
                    alt=""
                    width={800}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-lg font-black text-brand-900 shadow-md">
                    <i className={`fa-solid ${srv.icon}`} aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-base font-black text-brand-900">{srv.title}</h3>
                <p className="mb-6 text-xs leading-relaxed text-slate-600">{srv.desc}</p>
                <dl className="mb-2 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-2 text-center text-[10px] font-bold">
                  <div>
                    <dt className="inline">SLA: </dt>
                    <dd className="inline text-brand-600">{srv.sla}</dd>
                  </div>
                  <div>
                    <dt className="inline">Speed: </dt>
                    <dd className="inline text-indigo-600">{srv.speed}</dd>
                  </div>
                  <div>
                    <dt className="inline">Save: </dt>
                    <dd className="inline text-emerald-600">{srv.savings}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() =>
                  openQuote({ service: SERVICE_TO_OPTION[srv.slug] || 'Healthcare Staffing' })
                }
                className="w-full rounded-xl bg-brand-900 py-3 text-xs font-black text-white transition-colors hover:bg-brand-600"
              >
                Configure Pod
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
