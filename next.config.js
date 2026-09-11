/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fully static build for Cloudflare Pages: `npm run build` emits ./out.
  // Every page here renders statically and talks to the Express API from the
  // browser, so nothing needs a Node server at runtime.
  output: 'export',

  // Cloudflare Pages serves /about as /about/index.html.
  trailingSlash: true,

  images: {
    // No Next.js image optimizer exists in a static export.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'i.ibb.co.com' },
    ],
  },
};

module.exports = nextConfig;
