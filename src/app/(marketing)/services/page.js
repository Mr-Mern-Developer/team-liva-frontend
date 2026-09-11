import ServicesGrid from '@/components/ServicesGrid';
import Workflow from '@/components/Workflow';
import RoiCalculator from '@/components/RoiCalculator';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Solutions — Staffing, BPO, Web Development & Design',
  description:
    'Managed back-office BPO pods, HIPAA-aligned healthcare remote staffing, custom web applications, and graphic design systems — deployed in under 72 hours.',
  path: '/services',
  keywords: ['managed BPO pods', 'RCM outsourcing', 'enterprise web applications', 'UI UX design'],
});

export default function ServicesPage() {
  return (
    <>
      <header className="mx-auto max-w-3xl px-4 pb-4 pt-12 text-center sm:px-6 md:pt-16 lg:px-8">
        <p className="eyebrow">Core Capabilities</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Enterprise Solutions Matrix
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          Four delivery lines, one operating standard: vetted people, audited SLAs, and secure
          infrastructure from day one.
        </p>
      </header>

      <ServicesGrid heading={false} />
      <Workflow />
      <RoiCalculator />
    </>
  );
}
