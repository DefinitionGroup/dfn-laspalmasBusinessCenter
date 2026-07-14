export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-14";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export const isSanityConfigured = Boolean(projectId && dataset);

// Sanity validates config during bundling. This valid-looking fallback is only
// used to compile the disconnected Studio shell; the route never mounts the
// Studio until real environment values exist.
export const studioProjectId = projectId || "abcdefgh";
