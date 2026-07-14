# Las Palmas Business Center

A standalone Next.js and Sanity site extracted from the useful parts of the 1SP FLZR implementation.

The project deliberately keeps FLZR's editorial page-builder approach, expressive type, full-bleed media, motion rhythm and component boundaries. It deliberately does **not** contain the 1SP multichannel architecture.

## Current state

- Next.js 16 / React 19 frontend
- Embedded Sanity Studio at `/studio`
- One single-site `page.content[]` page builder
- Spanish and English content variants
- Nine matching Studio/runtime blocks
- Structured space/service and testimonial documents
- Site settings and navigation documents
- Published ES/EN starter content in the connected Sanity dataset
- Idempotent `pnpm sanity:seed` command for rebuilding the starter documents
- Legacy Las Palmas photography stored locally
- Static generation for the prepared site routes
- Revalidation endpoint ready for a Sanity webhook

## Run locally

```bash
pnpm install --store-dir .pnpm-store
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The site is connected to Sanity project `aezv4e8g`, dataset `production`, and renders the published CMS documents. `content/demo.ts` remains the source for the repeatable starter-content seed and the offline fallback.

## Validation

```bash
pnpm typecheck
pnpm build
```

## Sanity connection

The local environment is connected to:

```text
project: aezv4e8g
dataset: production
```

Run `pnpm sanity:check`, start the site, and open `/studio`. The starter settings, localized navigation, spaces, testimonial and pages are already published. Add the required deployment CORS origins and configure a webhook to `/api/revalidate` with `SANITY_REVALIDATE_SECRET` before production launch.

To recreate or update the deterministic starter documents from `content/demo.ts`:

```bash
pnpm sanity:seed
```

See [docs/SANITY_ACCOUNT_HANDOFF.md](docs/SANITY_ACCOUNT_HANDOFF.md) for the exact handoff checklist.

## Important content caveat

The demo uses information from the existing website as a working content baseline. Reception hours, access hours, current phone numbers, active coworking availability, prices, capacities and testimonial permissions must be confirmed before production publishing.
