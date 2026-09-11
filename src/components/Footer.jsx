import Link from 'next/link';

import NewsletterForm from './NewsletterForm';
import { SITE } from '@/lib/seo';

const SOLUTION_LINKS = [
  { href: '/services#staffing', label: 'Healthcare Staffing' },
  { href: '/services#web', label: 'Web Development' },
  { href: '/services#design', label: 'Graphic Design' },
  { href: '/services#bpo', label: 'Managed BPO Pods' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refund', label: 'Refund & Cancellation' },
  { href: '/about', label: 'About Our Mission' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] py-12 text-sm text-slate-400 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-xs font-black text-brand-950">
              TL
            </span>
            <span className="text-lg font-black text-white">Teamliva</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-slate-400">
            Teamliva provides enterprise staffing, web development, graphic design, and offshore BPO
            solutions. Your team, without borders.
          </p>
          <NewsletterForm />
          <p className="text-xs font-extrabold text-slate-500">
            &copy; {new Date().getFullYear()} Teamliva Inc. All rights reserved.
          </p>
        </div>

        <nav aria-label="Solutions">
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-white">Solutions</h2>
          <ul className="space-y-2 text-xs font-extrabold">
            {SOLUTION_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal and policy">
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-white">
            Legal &amp; Policy
          </h2>
          <ul className="space-y-2 text-xs font-extrabold">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-white">Contact Ops</h2>
          <ul className="space-y-2 text-xs font-extrabold">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-teal-400" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-teal-400" aria-hidden="true" />
              <span>Coming soon</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-teal-400" aria-hidden="true" />
              <span>{SITE.location}</span>
            </li>
            <li className="flex items-center gap-2 pt-2">
              <Link href="/careers" className="hover:text-white">
                Join the Talent Pool
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
