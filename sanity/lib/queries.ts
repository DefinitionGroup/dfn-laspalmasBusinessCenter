import { cache } from "react";
import { getDemoHome, getDemoPage, getDemoPageRecords, getDemoPageSlugs, getDemoShell } from "@/content/demo";
import { locales, type Locale, type PageDocument, type PageTranslation, type SiteShellData } from "@/types/content";
import { getSanityClient } from "./client";

const pageProjection = `{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  language,
  translationKey,
  isHomepage,
  navbarVariant,
  metadata,
  content[]{
    ...,
    _type == "heroBlock" => {
      ...,
      video{
        ...,
        asset->{"_ref": _id, url, mimeType}
      }
    },
    _type == "spaceListBlock" => {
      ...,
      spaces[]->{
        _id,
        title,
        "slug": slug.current,
        kind,
        summary,
        image,
        imageAlt
      }
    },
    _type == "testimonialBlock" => {
      ...,
      testimonials[]->{_id, quote, name, role, company}
    }
  }
}`;

export const getHomePage = cache(async (locale: Locale): Promise<PageDocument> => {
  const client = getSanityClient();
  if (!client) return getDemoHome(locale);

  const page = await client.fetch<PageDocument | null>(
    `*[_type == "page" && language == $language && isHomepage == true][0]${pageProjection}`,
    { language: locale },
    { next: { revalidate: 60, tags: ["page", `page:${locale}:home`] } },
  );

  return page ?? getDemoHome(locale);
});

export const getPageBySlug = cache(
  async (slug: string, locale: Locale): Promise<PageDocument | null> => {
    const client = getSanityClient();
    if (!client) return getDemoPage(slug, locale);

    const page = await client.fetch<PageDocument | null>(
      `*[_type == "page" && language == $language && slug.current == $slug][0]${pageProjection}`,
      { slug, language: locale },
      { next: { revalidate: 60, tags: ["page", `page:${locale}:${slug}`] } },
    );

    return page ?? getDemoPage(slug, locale);
  },
);

export const getSiteShell = cache(async (locale: Locale): Promise<SiteShellData> => {
  const client = getSanityClient();
  if (!client) return getDemoShell(locale);

  const [shell, translationPages] = await Promise.all([
    client.fetch<Omit<SiteShellData, "translationPages"> | null>(
    `{
      "settings": *[_type == "siteSettings"][0]{
        _id,
        brandName,
        shortName,
        description,
        address,
        phone,
        email,
        receptionHours,
        accessHours,
        officeOpeningTime,
        officeClosingTime,
        defaultMetadata
      },
      "menu": *[_type == "menu" && language == $language][0]{
        _id,
        language,
        items,
        cta
      }
    }`,
    { language: locale },
    { next: { revalidate: 60, tags: ["site-shell", `menu:${locale}`] } },
    ),
    getAllPageRecords(),
  ]);

  if (!shell?.settings || !shell?.menu) return getDemoShell(locale);
  return { ...shell, translationPages };
});

export const getAllPageRecords = cache(async (): Promise<PageTranslation[]> => {
  const client = getSanityClient();
  if (!client) return getDemoPageRecords();

  const result = await client.fetch<PageTranslation[]>(
    `*[_type == "page" && language in $languages && defined(slug.current)] | order(language asc, slug.current asc){
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      language,
      translationKey,
      isHomepage
    }`,
    { languages: locales },
    { next: { revalidate: 60, tags: ["page", "sitemap"] } },
  );

  const merged = new Map<string, PageTranslation>(
    result.map((page) => [`${page.language}:${page.slug}`, page]),
  );

  for (const fallbackPage of getDemoPageRecords()) {
    const key = `${fallbackPage.language}:${fallbackPage.slug}`;
    if (!merged.has(key)) merged.set(key, fallbackPage);
  }

  return [...merged.values()];
});

export async function getAllPageSlugs(locale: Locale) {
  const pages = await getAllPageRecords();
  const slugs = pages
    .filter((page) => page.language === locale && !page.isHomepage)
    .map((page) => page.slug);

  return slugs.length > 0 ? slugs : getDemoPageSlugs(locale);
}
