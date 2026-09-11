'use client';

import { Toaster } from 'react-hot-toast';

/** Shared react-hot-toast surface, styled to match the site. */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 4500,
        style: {
          background: '#0b1f3f',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 800,
          borderRadius: '16px',
          padding: '12px 16px',
          maxWidth: '360px',
          boxShadow: '0 20px 40px -15px rgba(11, 31, 63, 0.45)',
        },
        success: {
          iconTheme: { primary: '#00a896', secondary: '#ffffff' },
        },
        error: {
          duration: 6000,
          style: { background: '#e11d48', color: '#ffffff' },
          iconTheme: { primary: '#ffffff', secondary: '#e11d48' },
        },
      }}
    />
  );
}
