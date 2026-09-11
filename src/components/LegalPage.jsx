/** Shared shell for the Terms / Privacy / Refund policy pages. */
export default function LegalPage({ title, updated, sections }) {
  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <header>
        <h1 className="text-2xl font-black text-brand-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: {updated}</p>
      </header>

      <div className="space-y-6">
        {sections.map((s, i) => (
          <section key={s.heading} className="space-y-2">
            <h2 className="text-sm font-black text-brand-900">
              {i + 1}. {s.heading}
            </h2>
            {s.body.map((p, j) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={j} className="text-xs leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
