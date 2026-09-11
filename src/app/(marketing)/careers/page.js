import ApplicationForm from '@/components/ApplicationForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Careers — Join the Teamliva Talent Pool',
  description:
    'Apply to join Teamliva as a clinical ops specialist, medical biller, support agent, developer, or designer. Remote-first roles with US and global enterprise clients.',
  path: '/careers',
  keywords: ['remote jobs bangladesh', 'medical billing jobs', 'remote developer jobs'],
});

const PERKS = [
  { icon: 'fa-globe', title: 'Global clients', desc: 'Work directly with US healthcare systems and enterprise brands.' },
  { icon: 'fa-laptop-house', title: 'Remote-first', desc: 'Secure managed workstations, shift structures that respect your time.' },
  { icon: 'fa-arrow-trend-up', title: 'Real progression', desc: 'Skill assessments feed a transparent rate and seniority ladder.' },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="eyebrow">Careers</p>
        <h1 className="text-3xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Join the Talent Pool
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          We place vetted professionals with companies that need them — no job-board noise. Submit
          your profile once and we match you as engagements open.
        </p>
      </header>

      <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        {PERKS.map((p) => (
          <li key={p.title} className="glass-card space-y-3 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-brand-50 text-brand-600">
              <i className={`fa-solid ${p.icon}`} aria-hidden="true" />
            </span>
            <h2 className="text-sm font-black text-brand-900">{p.title}</h2>
            <p className="text-xs leading-relaxed text-slate-600">{p.desc}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 max-w-3xl">
        <h2 className="mb-4 text-center text-lg font-black text-brand-900">Application</h2>
        <ApplicationForm />
      </div>
    </div>
  );
}
