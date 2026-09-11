import { WORKFLOW_STEPS } from '@/lib/data';

export default function Workflow() {
  return (
    <section className="border-y border-slate-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="eyebrow">Rapid Onboarding</p>
          <h2 className="section-title">72-Hour Deployment Pipeline</h2>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((w) => (
            <li
              key={w.step}
              className="space-y-3 rounded-3xl border border-slate-200 bg-cream p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-sm font-black text-teal-300">
                {w.step}
              </span>
              <h3 className="text-base font-black text-brand-900">{w.title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{w.desc}</p>
              <p className="pt-2 text-[10px] font-black uppercase text-brand-600">{w.time}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
