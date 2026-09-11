import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';
import { SITE, SITE_URL, organizationJsonLd } from '@/lib/seo';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

/**
 * Document shell only. The marketing chrome (header/footer) lives in
 * (marketing)/layout.js so the admin dashboard can render without it.
 * Every page exports its own `metadata` — see src/lib/seo.js.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Connect companies with standout candidates, custom web applications, and graphic design through curated introductions — not messy job boards. 100% HIPAA & SOC2 compliant.',
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [{ url: SITE.logo, type: 'image/png', sizes: '96x96' }],
    shortcut: [SITE.logo],
    apple: [{ url: SITE.logo, sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fbf9f5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
