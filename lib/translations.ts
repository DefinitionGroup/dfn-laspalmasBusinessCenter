import type { Locale, PageDocument, PageTranslation } from "@/types/content";

export const localizedRoutePairs = [
  { key: "home", es: "/es", en: "/en" },
  { key: "private-offices", es: "/es/despachos", en: "/en/private-offices" },
  { key: "meeting-rooms", es: "/es/salas-de-reuniones", en: "/en/meeting-rooms" },
  { key: "coworking", es: "/es/coworking", en: "/en/coworking" },
  { key: "virtual-office", es: "/es/oficina-virtual", en: "/en/virtual-office" },
  { key: "center", es: "/es/el-centro", en: "/en/the-center" },
  { key: "contact", es: "/es/contacto", en: "/en/contact" },
  { key: "legal", es: "/es/aviso-legal", en: "/en/aviso-legal" },
  { key: "privacy", es: "/es/privacidad", en: "/en/privacidad" },
  { key: "cookies", es: "/es/cookies", en: "/en/cookies" },
] as const;

export function pagePath(page: Pick<PageDocument, "language" | "slug" | "isHomepage">) {
  return page.isHomepage ? `/${page.language}` : `/${page.language}/${page.slug}`;
}

export function staticTranslationKey(path: string) {
  return localizedRoutePairs.find((pair) => pair.es === path || pair.en === path)?.key;
}

export function translationKeyForPage(
  page: Pick<PageDocument, "translationKey" | "language" | "slug" | "isHomepage">,
) {
  return page.translationKey?.trim() || staticTranslationKey(pagePath(page)) || `${page.language}:${page.slug}`;
}

export function localizedPathsForPage(
  page: Pick<PageDocument, "translationKey" | "language" | "slug" | "isHomepage">,
  pages: PageTranslation[],
) {
  const key = translationKeyForPage(page);
  const paths: Partial<Record<Locale, string>> = {};

  for (const candidate of pages) {
    if (translationKeyForPage(candidate) === key) {
      paths[candidate.language] = pagePath(candidate);
    }
  }

  paths[page.language] = pagePath(page);
  return paths;
}

export function alternatePath(
  pathname: string,
  targetLocale: Locale,
  pages: PageTranslation[],
) {
  const current = pages.find((page) => pagePath(page) === pathname);
  const currentKey = current
    ? translationKeyForPage(current)
    : staticTranslationKey(pathname);

  if (!currentKey) return null;

  const target = pages.find(
    (page) => page.language === targetLocale && translationKeyForPage(page) === currentKey,
  );

  if (target) return pagePath(target);

  const staticPair = localizedRoutePairs.find((pair) => pair.key === currentKey);
  return staticPair?.[targetLocale] ?? null;
}
