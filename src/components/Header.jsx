'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQuoteModal } from './QuoteModalProvider';
import { NAV_LINKS } from '@/lib/data';
import { SITE } from '@/lib/seo';

export default function Header() {
  const pathname = usePathname();
  const { openQuote } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  // A route change should never leave the mobile sheet hanging open.
  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Teamliva home">
          <Image
            src={SITE.logo}
            alt="Teamliva logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-brand-900">
              TEAM<span className="text-brand-500">LIVA</span>
            </span>
            <span className="hidden text-[9px] font-extrabold uppercase tracking-widest text-slate-500 sm:block">
              Staffing, Web &amp; Design Solutions
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-bold text-slate-700 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`transition-colors ${
                isActive(link.href) ? 'font-black text-brand-500' : 'hover:text-brand-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => openQuote()} className="btn-primary px-4 sm:px-6">
            <span>Contact Ops</span>
            <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 text-slate-800 lg:hidden"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="space-y-1 border-b border-slate-200 bg-white px-6 py-4 shadow-xl lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-3 py-2.5 text-sm font-bold ${
                isActive(link.href) ? 'bg-brand-50 text-brand-600' : 'text-slate-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              openQuote();
            }}
            className="btn-primary mt-2 w-full"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
