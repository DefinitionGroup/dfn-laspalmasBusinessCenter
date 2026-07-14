# Sanity account handoff

The application is connected locally to the dedicated Sanity project. The initial page-builder content was published on 2026-07-14 and the frontend now renders the Sanity documents.

## Current connection

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=aezv4e8g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-14
```

The project and dataset values live in the gitignored `.env.local`. No API tokens or secrets have been added. The initial import contains 26 content documents and three image assets.

## 1. Confirm account access

Sign in at `/studio` with a Sanity account that has access to project `aezv4e8g`. The local Sanity CLI is authenticated with the project-owning Google account.

## 2. Verify local environment

```bash
pnpm sanity:check
pnpm dev
```

The embedded Studio is mounted at `/studio`.

The deterministic starter content can be updated safely with:

```bash
pnpm sanity:seed
```

The command uploads the local media and uses fixed document IDs with `createOrReplace`, so it does not create duplicate pages when rerun.

## 3. Configure allowed origins

Add the actual development, preview and production origins to the new Sanity project. Include credentials where visual editing or authenticated Studio access requires them.

Expected origins will eventually include:

- `http://localhost:3000`
- the chosen Vercel preview domain
- the final production domain

## 4. Review the initial documents

The initial documents already exist. Review and approve them in this order:

1. Site settings singleton
2. Spanish navigation
3. English navigation
4. Spaces and services
5. Approved testimonials
6. Spanish homepage
7. English homepage
8. Service pages
9. Center and contact pages

The local fallback in `content/demo.ts` is also the deterministic seed source, not a second permanent editorial source.

## 5. Upload and verify media

The repository currently contains three legacy photographs copied from the existing public website. Before production:

- confirm usage rights;
- replace weak or outdated photos;
- add meaningful alt text;
- upload the approved originals to Sanity;
- verify focal points on desktop and mobile.

## 6. Configure revalidation

Set a strong server-only value for:

```text
SANITY_REVALIDATE_SECRET
```

Create a Sanity webhook that sends a POST request to:

```text
https://<site-domain>/api/revalidate
```

with the header:

```text
x-revalidate-secret: <same secret>
```

## 7. Production content checks

Confirm these facts before publishing:

- C/ Agustín Millares 18 spelling and postal address
- primary and secondary phone numbers
- public email addresses
- staffed reception hours versus 365-day access
- whether coworking is currently active
- office and room capacities
- prices and minimum terms
- parking and accessibility details
- sustainability certificate and its publishable wording
- testimonial permission and current job titles

## Ready condition

The account connection is complete when the Studio loads, the singleton/settings and localized menus exist, a Sanity-authored homepage renders instead of fallback data, and publishing triggers successful frontend revalidation.
