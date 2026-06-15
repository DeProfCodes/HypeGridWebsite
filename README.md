# HypeGrid Website

The public marketing website for **HypeGrid** — a creative marketing, influencer,
and digital promotion brand. Built with Vite + React, Tailwind, and shadcn/ui.

## What it does

- Public brand pages: home, services, campaigns, creators, packages, about,
  contact.
- Public content (services / packages / testimonials / case studies) loaded from
  the HypeGrid backend, with bundled **mock-data fallback** so the site never
  renders empty when the API is offline.
- Four conversion forms posted to the backend:
  - Contact → `POST /api/public/contact`
  - Start Campaign → `POST /api/public/campaign-requests`
  - Creator Application → `POST /api/public/creator-applications`
  - Newsletter → `POST /api/public/newsletter/subscribe`
- Forms never fake success: a failed submit shows an error and keeps the user's
  input.

## Architecture

```
src/api/       HTTP client + publicApi (content GETs, form POSTs)
src/data/mock/ public content fallback datasets
src/stores/    mock-backed content store + global mock/live config
src/app/config/ env-driven runtime config (API base URL, flags)

Pages/components → stores/hooks → publicApi / mock data
```

Pages don't call the API directly — they go through the stores/hooks.

## Local development

```bash
npm install
cp .env.example .env     # then edit VITE_HYPEGRID_API_BASE_URL
npm run dev
```

## Environment

The API base URL is **always** env-driven (`VITE_HYPEGRID_API_BASE_URL`) and never
hardcoded. See `.env.example` for all variables.

## Production build

```bash
npm run build     # outputs dist/
npm run preview   # preview dist/ locally
```

## Deployment

Deploys to Vercel as a static SPA. See [`DEPLOYMENT.md`](./DEPLOYMENT.md).
