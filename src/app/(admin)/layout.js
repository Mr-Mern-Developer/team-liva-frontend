import ToastProvider from '@/components/ToastProvider';

/** Admin console shell — deliberately free of the marketing header/footer. */
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
      <ToastProvider />
    </div>
  );
}
