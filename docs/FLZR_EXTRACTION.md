# FLZR extraction boundary

## What was retained

- The `page.content[]` registry pattern: every Studio block has one corresponding runtime renderer.
- FLZR's editorial composition: large typography, full-bleed media, strong section rhythm and restrained supporting copy.
- Expressive Aspekta and Nyght Serif typography from the source project.
- Motion as hierarchy: hero entrance, viewport reveals, media movement and navigation transitions.
- The distinction between global shell content and page-builder content.
- Static generation, metadata, responsive imagery and tag-based revalidation.
- An embedded `/studio` route inside the web application.

## What was intentionally removed

- `channel` fields and `NEXT_PUBLIC_CHANNEL`.
- Host-to-channel mapping and per-deployment channel resolution.
- 1SP, MSM, FLZR and Studio CO2 content branches.
- `oneSpComponentGroup` imports and cross-site rendering.
- Channel-filtered services, cases, people, units and menus.
- The shared monorepo package boundary (`@1sp/*`).
- Agency-specific case-study, Personio and business-unit systems.
- The original FLZR branding and client content.

## Single-site contract

```text
page
├── language: es | en
├── slug
├── isHomepage
├── metadata
└── content[]
    ├── heroBlock
    ├── introBlock
    ├── spaceListBlock
    ├── featureListBlock
    ├── splitContentBlock
    ├── galleryBlock
    ├── testimonialBlock
    ├── locationBlock
    └── ctaBlock
```

Language is localization within one website, not a channel. Slugs are unique per language, and there is one homepage per language.

## Content documents

- `siteSettings`: one singleton for identity, contact data and default metadata.
- `menu`: one document per language.
- `page`: localized, modular website pages.
- `space`: private office, meeting room, coworking or virtual-office records.
- `testimonial`: reusable, approval-aware client quotes.
- `contactSubmission`: prepared destination type for a later form workflow.

## Design status

The current styling is a first extraction proof, not the final design. It uses the FLZR interaction and typography logic with a provisional Las Palmas palette. The next collaborative design step should focus on the homepage hero and the Private Offices page before refining the remaining templates.
