import ContactForm from '@/components/ContactForm';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Our Operations Desk',
  description:
    'Talk to Teamliva about staffing pods, RCM, web development or design. We reply to every inquiry within 2 business hours at ops@teamliva.com.',
  path: '/contact',
  keywords: ['contact teamliva', 'ops@teamliva.com', 'staffing quote'],
});

const CHANNELS = [
  { icon: 'fa-envelope', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'fa-location-dot', label: 'Head office', value: SITE.location },
  { icon: 'fa-clock', label: 'Response time', value: 'Within 2 business hours' },
  { icon: 'fa-shield-halved', label: 'Compliance', value: 'HIPAA & SOC2 Type II aligned' },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">Contact Ops</p>
        <h1 className="text-3xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Let&apos;s scope your squad
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Tell us what you need — staffing, back-office, a web build, or a brand system. An
          operations architect will come back to you the same day.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="space-y-4 lg:col-span-5">
          {CHANNELS.map((c) => (
            <div key={c.label} className="glass-card flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-brand-50 text-brand-600">
                <i className={`fa-solid ${c.icon}`} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-sm font-black text-brand-900 underline decoration-brand-500 underline-offset-2"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm font-black text-brand-900">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
