import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-4 text-center">
      <p className="text-6xl font-black text-brand-500">404</p>
      <h1 className="text-2xl font-black text-brand-900">This page doesn&apos;t exist</h1>
      <p className="max-w-md text-sm text-slate-600">
        The link may be outdated. Head back to the homepage, or tell our ops desk what you were
        looking for.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact ops
        </Link>
      </div>
    </div>
  );
}
