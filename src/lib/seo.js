export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const SITE = {
  name: 'Teamliva',
  tagline: 'Enterprise Staffing, Recruitment, Web & Design Solutions',
  email: 'ops@teamliva.com',
  location: 'Dhaka, Bangladesh',
  logo: 'https://i.ibb.co.com/xPSJxXr/Airbrush-IMAGE-ENHANCER-1788786962619-1788786962619-removebg-preview.png',
  ogImage:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
};

/**
 * Builds a per-page Metadata object with title, description, canonical,
 * OpenGraph and Twitter tags derived from one place.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = SITE.ogImage,
  keywords = [],
  noIndex = false,
}) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'remote staffing',
      'healthcare staffing',
      'BPO',
      'medical billing',
      'web development',
      'graphic design',
      'HIPAA compliant outsourcing',
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** JSON-LD organisation block injected once in the root layout. */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE_URL,
  logo: SITE.logo,
  description:
    'Teamliva connects companies with pre-vetted remote professionals, custom web applications and graphic design through curated introductions.',
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  sameAs: [],
};
