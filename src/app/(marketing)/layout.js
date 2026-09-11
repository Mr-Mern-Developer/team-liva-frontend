import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteModalProvider } from '@/components/QuoteModalProvider';
import ToastProvider from '@/components/ToastProvider';

/** Public site chrome: sticky header, footer, and the shared quote modal. */
export default function MarketingLayout({ children }) {
  return (
    <QuoteModalProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <ToastProvider />
    </QuoteModalProvider>
  );
}
