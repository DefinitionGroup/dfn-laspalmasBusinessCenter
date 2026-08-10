import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { pagePath } from "@/lib/translations";
import { getAllPageRecords } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPageRecords();

  return pages.map((page) => ({
    url: absoluteUrl(pagePath(page)),
    lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
    changeFrequency: page.isHomepage ? "weekly" : "monthly",
    priority: page.isHomepage ? 1 : 0.7,
  }));
}
