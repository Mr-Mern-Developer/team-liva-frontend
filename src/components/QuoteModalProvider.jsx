'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import QuoteModal from './QuoteModal';

const QuoteModalContext = createContext(null);

/**
 * Holds the quote-modal open state so any component (header button, service
 * card, roster card) can trigger it. Toasts come from react-hot-toast.
 */
export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({});

  const openQuote = useCallback((initial = {}) => {
    setPrefill(initial);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeQuote} prefill={prefill} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used inside QuoteModalProvider');
  return ctx;
}
