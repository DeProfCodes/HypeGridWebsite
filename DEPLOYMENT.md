# HypeGrid Website — Deployment (Vercel)

The public marketing site. A Vite + React SPA that reads public content from the
HypeGrid backend and posts the four conversion forms (contact, start campaign,
creator application, newsletter) to it. Public content gracefully falls back to
bundled mock data when the API is unreachable; **forms never fake success.**

## Vercel project settings

| Setting           | Value           |
| ----------------- | --------------- |
| Framework Preset  | Vite            |
| Build Command     | `npm run build` |
| Output Directory  | `dist`          |
| Install Command   | `npm install`   |
| Node.js Version   | 20.x (or 18.x)  |

`vercel.json` already configures SPA routing (all paths rewrite to
`/index.html`) so client-side routes work on hard refresh / deep links.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production,
Preview, and Development as needed). See `.env.example`.

| Variable                       | Example                        | Notes                                                        |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| `VITE_HYPEGRID_API_BASE_URL`   | `https://api.hypegrid.co.za`   | Backend base URL. **Required.** Never hardcoded in code.     |
| `VITE_HYPEGRID_USE_MOCKS`      | `false`                        | `true` forces mock display content. Forms always hit the API. |
| `VITE_ENABLE_API_LOGGING`      | `false`                        | Verbose API logging in the console. Keep `false` in prod.    |

> All build-time env vars must be prefixed `VITE_` to be exposed to the client.

## API base URL

The base URL is **always** env-driven via `VITE_HYPEGRID_API_BASE_URL`
(`src/app/config/env.js`). It is never hardcoded in components. For local dev
without the env set, it falls back to `http://localhost:5249` only on
`localhost`.

## Backend CORS reminder

After deploying, the backend must allow the site's origin(s) in CORS. See
[`HypeGrid/docs/CORS_AND_DEPLOYMENT.md`](../HypeGrid/docs/CORS_AND_DEPLOYMENT.md).
Expected production origins:

```
https://hypegrid.co.za
https://www.hypegrid.co.za
```

Vercel preview deployments use generated `*.vercel.app` URLs — allow those too
if you need forms to work from previews.

## Test the production build locally

```bash
npm install
npm run build
npm run preview   # serves dist/ at http://localhost:4173
```

Verify: home loads, services/packages render, and the contact / start-campaign /
creator-application forms submit (point `VITE_HYPEGRID_API_BASE_URL` at a running
backend). With the API offline, public content still renders from mock data and
forms surface a clear error instead of a false success.
