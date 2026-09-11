import Hero from '@/components/Hero';
import LivePortal from '@/components/LivePortal';
import RoiCalculator from '@/components/RoiCalculator';
import ServicesGrid from '@/components/ServicesGrid';
import TalentRoster from '@/components/TalentRoster';
import Workflow from '@/components/Workflow';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Teamliva | Enterprise Staffing, Recruitment, Web & Design Solutions',
  description:
    'Connect companies with standout candidates, custom web applications, and graphic design through curated introductions — not messy job boards. 100% HIPAA & SOC2 compliant.',
  path: '/',
  keywords: ['curated introductions', 'remote teams', 'offshore staffing', '72 hour onboarding'],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <TalentRoster />
      <RoiCalculator />
      <Workflow />
      <LivePortal />
    </>
  );
}
