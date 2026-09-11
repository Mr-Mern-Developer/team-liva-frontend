import TalentRoster from '@/components/TalentRoster';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Talent Roster — Pre-Vetted Remote Professionals',
  description:
    'Browse pre-vetted clinical operations leads, medical billing specialists, full-stack developers, and senior designers. Skill-assessed, compliance-ready, available now.',
  path: '/talent',
  keywords: ['hire remote developers', 'clinical operations staffing', 'vetted talent roster'],
});

export default function TalentPage() {
  return (
    <>
      <header className="mx-auto max-w-3xl px-4 pb-2 pt-12 text-center sm:px-6 md:pt-16 lg:px-8">
        <p className="eyebrow">Talent Roster</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Pre-Vetted Professional Roster
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          Every profile below has cleared skill assessments, a live technical review, and
          compliance screening. Select a card to see the full capability breakdown.
        </p>
      </header>

      <TalentRoster />
    </>
  );
}
