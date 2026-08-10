import type { Metadata } from "next";
import { resolveImageUrl } from "@/sanity/lib/image";
import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { localizedPathsForPage, pagePath } from "@/lib/translations";
import type { Locale, PageDocument, PageTranslation, SiteSettings } from "@/types/content";

const openGraphLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
};

export function buildPageMetadata({
  page,
  locale,
  settings,
  translationPages,
}: {
  page: PageDocument;
  locale: Locale;
  settings: SiteSettings;
  translationPages: PageTranslation[];
}): Metadata {
  const title = page.metadata?.title || page.title || settings.defaultMetadata?.title || SITE_NAME;
  const description = page.metadata?.description || settings.defaultMetadata?.description;
  const sourceImage = page.metadata?.image || settings.defaultMetadata?.image;
  const image = resolveImageUrl(sourceImage, { width: 1200, height: 630 });
  const path = pagePath(page);
  const canonical = absoluteUrl(path);
  const localizedPaths = localizedPathsForPage(page, translationPages);
  const languageEntries = Object.entries(localizedPaths).filter(
    (entry): entry is [Locale, string] => Boolean(entry[1]),
  );
  const languages = Object.fromEntries(
    languageEntries.map(([language, localizedPath]) => [language, absoluteUrl(localizedPath)]),
  );

  if (localizedPaths.es && localizedPaths.en) {
    languages["x-default"] = absoluteUrl(localizedPaths.es);
  }

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: Object.keys(languages).length > 1 ? languages : undefined,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: openGraphLocales[locale],
      alternateLocale: languageEntries
        .filter(([language]) => language !== locale)
        .map(([language]) => openGraphLocales[language]),
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    other: {
      "content-language": locale,
    },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Espacios profesionales y servicios empresariales en Vegueta.",
  applicationName: SITE_NAME,
};
