export const SITE_NAME = "Las Palmas Business Center";
export const SITE_ORIGIN = "https://www.laspalmasbusiness.center";
export const DEFAULT_LOCALE_PATH = "/es";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (process.env.NODE_ENV === "production" && configuredSiteUrl) {
  const configuredOrigin = new URL(configuredSiteUrl).origin;

  if (configuredOrigin !== SITE_ORIGIN) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be ${SITE_ORIGIN} in production; received ${configuredOrigin}.`,
    );
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).href.replace(/\/$/, path === "/" ? "/" : "");
}
