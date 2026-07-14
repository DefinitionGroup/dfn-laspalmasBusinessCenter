import type { Metadata } from "next";
import PageBuilder from "@/components/PageBuilder";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getHomePage } from "@/sanity/lib/queries";
import { locales, type Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = locales.includes(value as Locale) ? (value as Locale) : "es";
  const page = await getHomePage(locale);
  const image = resolveImageUrl(page.metadata?.image, { width: 1200, height: 630 });
  return {
    title: page.metadata?.title || page.title,
    description: page.metadata?.description,
    alternates: { canonical: `/${locale}` },
    openGraph: { title: page.metadata?.title || page.title, description: page.metadata?.description, images: image ? [image] : [] },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = (locales.includes(value as Locale) ? value : "es") as Locale;
  const page = await getHomePage(locale);
  return <PageBuilder content={page.content} locale={locale} />;
}
