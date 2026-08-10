import type { Metadata } from "next";
import PageBuilder from "@/components/PageBuilder";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getHomePage, getSiteShell } from "@/sanity/lib/queries";
import { locales, type Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = locales.includes(value as Locale) ? (value as Locale) : "es";
  const [page, shell] = await Promise.all([getHomePage(locale), getSiteShell(locale)]);
  return buildPageMetadata({ page, locale, settings: shell.settings, translationPages: shell.translationPages });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = (locales.includes(value as Locale) ? value : "es") as Locale;
  const [page, shell] = await Promise.all([getHomePage(locale), getSiteShell(locale)]);

  return (
    <>
      <LocalBusinessJsonLd locale={locale} settings={shell.settings} />
      <PageBuilder content={page.content} locale={locale} />
    </>
  );
}
