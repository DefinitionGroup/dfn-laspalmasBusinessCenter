import { cache } from "react";
import { getDemoHome, getDemoPage, getDemoPageSlugs, getDemoShell } from "@/content/demo";
import type { Locale, PageDocument, SiteShellData } from "@/types/content";
import { getSanityClient } from "./client";

const pageProjection = `{
  _id,
  title,
  "slug": slug.current,
  language,
  isHomepage,
  navbarVariant,
  metadata,
  content[]{
    ...,
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

  const shell = await client.fetch<SiteShellData | null>(
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
  );

  if (!shell?.settings || !shell?.menu) return getDemoShell(locale);
  return shell;
});

export async function getAllPageSlugs(locale: Locale) {
  const client = getSanityClient();
  if (!client) return getDemoPageSlugs(locale);

  const result = await client.fetch<Array<{ slug: string }>>(
    `*[_type == "page" && language == $language && isHomepage != true && defined(slug.current)][]{"slug": slug.current}`,
    { language: locale },
  );

  const slugs = result.map((item) => item.slug);
  return slugs.length > 0 ? slugs : getDemoPageSlugs(locale);
}
