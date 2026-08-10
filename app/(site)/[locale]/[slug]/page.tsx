import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBuilder from "@/components/PageBuilder";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getAllPageSlugs, getPageBySlug, getSiteShell } from "@/sanity/lib/queries";
import { locales, type Locale } from "@/types/content";

export const dynamicParams = true;

export async function generateStaticParams() {
  const results = await Promise.all(
    locales.map(async (locale) => (await getAllPageSlugs(locale)).map((slug) => ({ locale, slug }))),
  );
  return results.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: value, slug } = await params;
  if (!locales.includes(value as Locale)) return {};
  const locale = value as Locale;
  const [page, shell] = await Promise.all([getPageBySlug(slug, locale), getSiteShell(locale)]);
  if (!page) return {};
  return buildPageMetadata({ page, locale, settings: shell.settings, translationPages: shell.translationPages });
}

export default async function DynamicPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: value, slug } = await params;
  if (!locales.includes(value as Locale)) notFound();
  const locale = value as Locale;
  const page = await getPageBySlug(slug, locale);
  if (!page) notFound();
  return <PageBuilder content={page.content} locale={locale} />;
}
