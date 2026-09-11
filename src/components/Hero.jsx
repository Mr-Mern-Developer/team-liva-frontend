'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useQuoteModal } from './QuoteModalProvider';
import { SITE, SITE as site } from '@/lib/seo';
import { TRUSTED_BY } from '@/lib/data';

export default function Hero() {
  const { openQuote } = useQuoteModal();

  return (
    <>
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-extrabold text-brand-900 shadow-sm sm:text-xs lg:mx-0">
              <span className="h-2 w-2 animate-ping rounded-full bg-brand-500" aria-hidden="true" />
              STAFFING, WEB DEVELOPMENT &amp; GRAPHIC DESIGN SOLUTIONS
            </p>

            <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
              Fastest way to match people with purpose
            </h1>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0 lg:text-lg">
              Connect companies with standout candidates, custom web applications, and stunning
              graphic design through curated introductions. Reach us at{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-bold text-brand-900 underline decoration-brand-500 underline-offset-2"
              >
                {site.email}
              </a>
              .
            </p>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <button
                onClick={() => openQuote()}
                className="btn-primary w-full px-8 py-4 text-sm shadow-xl sm:w-auto"
              >
                <span>Hire Talent or Solutions</span>
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </button>
              <Link href="/about" className="btn-ghost w-full px-8 py-4 text-sm sm:w-auto">
                About Our Mission
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl">
              <Image
                src={SITE.ogImage}
                alt="Teamliva global workforce collaborating"
                width={800}
                height={600}
                className="h-72 w-full object-cover sm:h-80"
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-950/80 via-transparent to-transparent p-6 text-white">
                <p className="text-xs font-extrabold uppercase tracking-widest text-teal-300">
                  Global Workforce &amp; Studio
                </p>
                <p className="text-lg font-black">&lt; 72 Hours Onboarded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Companies that trust Teamliva"
        className="border-y border-slate-200/80 bg-white py-8"
      >
        <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Trusted by 15+ Enterprise Companies
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 text-base font-black text-slate-700 opacity-75 sm:text-lg md:gap-16">
            {TRUSTED_BY.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
