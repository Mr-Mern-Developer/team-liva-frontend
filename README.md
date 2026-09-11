# Teamliva — Frontend

Next.js 15 (App Router) marketing site + operations dashboard for Teamliva.
Statically exported, so it deploys to Cloudflare Pages with no Node runtime.

## Stack

- **Next.js 15** App Router, `output: 'export'` (SSG)
- **Tailwind CSS 3.4** with a glassmorphism component layer (`.glass-card`)
- **Chart.js + react-chartjs-2** — talent radar, ROI bars, portal line chart
- **react-hot-toast** — every form submission reports through it

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

No setup step — `.env` is committed and already points at the deployed API, so a
fresh clone runs against production out of the box.

### Environment

| Variable               | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Base URL of the Express API, e.g. `https://teamliva-backend.vercel.app/api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — drives metadata, sitemap, OG tags |

Both are `NEXT_PUBLIC_*`, so Next.js inlines them into the browser bundle at
**build time** — they are public, never put a secret in `.env`. Change them and
rebuild; editing them on the server after a build has no effect.

To point at a backend running locally, copy `.env.local.example` to `.env.local`
and set the values there — `.env.local` is gitignored and overrides `.env`.

## Routes

| Route              | Notes                                              |
| ------------------ | -------------------------------------------------- |
| `/`                | Hero, solutions, roster, ROI calculator, pipeline, portal |
| `/services`        | Solutions matrix + workflow + calculator           |
| `/talent`          | Filterable roster with per-person skill radar      |
| `/about`           | Mission, pillars, leadership                       |
| `/careers`         | Application form → `POST /api/applications`        |
| `/contact`         | Contact form → `POST /api/contacts`                |
| `/terms`, `/privacy`, `/refund` | Policy pages                          |
| `/admin/login`     | Operations console sign-in                         |
| `/admin/dashboard` | Guarded — inquiries, messages, applications tables  |

Each page exports its own `metadata` built by `buildMetadata()` in
[`src/lib/seo.js`](src/lib/seo.js): title, description, canonical, OpenGraph and
Twitter tags. `/admin/*` is `noIndex` and disallowed in `robots.txt`.

## Layout structure

Route groups keep the two surfaces apart:

- `src/app/(marketing)/` — header, footer, quote modal
- `src/app/(admin)/` — bare console shell, no marketing chrome

## Admin access

`AdminGuard` verifies the stored JWT against `GET /api/auth/me` on mount and
redirects to `/admin/login?reason=…` when there's no valid `admin`/`ops`
session. This guards the **UI**; the actual protection is that every admin
endpoint requires a bearer token server-side — a static export cannot gate
routes at the edge.

## Build & deploy (Cloudflare Pages)

```bash
npm run build     # emits ./out
```

Cloudflare Pages settings:

| Setting             | Value       |
| ------------------- | ----------- |
| Build command       | `npm run build` |
| Build output directory | `out`    |
| Node version        | 20 or newer |

Set `NEXT_PUBLIC_API_URL` (your deployed API) and `NEXT_PUBLIC_SITE_URL` as
build-time environment variables in the Pages project, and add the Pages domain
to `CORS_ORIGIN` on the backend.
