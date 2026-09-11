import Image from 'next/image';

import { LEADERSHIP } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Us — Your Team, Without Borders',
  description:
    'Teamliva connects growing enterprises, healthcare systems, and tech brands with elite remote professionals in staffing, web development, and graphic design through curated introductions.',
  path: '/about',
  keywords: ['about teamliva', 'leadership team', 'HIPAA compliant staffing partner'],
});

const PILLARS = [
  {
    icon: 'fa-bullseye',
    title: 'Curated Quality First',
    desc: 'We reject automated resume scrapers. Every developer, designer, and operations expert undergoes rigorous skill assessments and live reviews.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Security & Compliance',
    desc: 'For healthcare systems and enterprise clients, we guarantee HIPAA and SOC2 Type II infrastructure compliance with secure virtual workstations.',
  },
  {
    icon: 'fa-bolt',
    title: '72-Hour Speed',
    desc: 'Operational delays hurt growth. Our rapid deployment pipeline matches, verifies, and launches fully managed squads in under 72 hours.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 md:space-y-20 md:py-16 lg:px-8">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">About Teamliva</p>
        <h1 className="text-3xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Your Team, Without Borders
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-lg">
          Teamliva connects growing enterprises, healthcare systems, and tech brands with elite
          remote professionals in staffing, web development, and graphic design through curated
          introductions.
        </p>
      </header>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
          alt="Teamliva leadership and global delivery teams in a planning session"
          width={1200}
          height={600}
          className="h-72 w-full object-cover sm:h-96"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {PILLARS.map((p) => (
          <section key={p.title} className="glass-card glass-card-hover space-y-4 p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-brand-50 text-xl text-brand-600">
              <i className={`fa-solid ${p.icon}`} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-black text-brand-900">{p.title}</h2>
            <p className="text-xs leading-relaxed text-slate-600">{p.desc}</p>
          </section>
        ))}
      </div>

      <section className="space-y-12 pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Executive Leadership</p>
          <h2 className="section-title">Meet the Minds Behind Teamliva</h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((exec) => (
            <li key={exec.name} className="glass-card glass-card-hover flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="h-52 w-full overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={exec.avatar}
                    alt={exec.name}
                    width={400}
                    height={520}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-900">{exec.name}</h3>
                  <p className="text-xs font-extrabold text-brand-600">{exec.role}</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{exec.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
