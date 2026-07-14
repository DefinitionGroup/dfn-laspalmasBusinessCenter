import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import DocumentLanguage from "@/components/layout/DocumentLanguage";
import { getSiteShell } from "@/sanity/lib/queries";
import { locales, type Locale } from "@/types/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  if (!locales.includes(requestedLocale as Locale)) notFound();
  const locale = requestedLocale as Locale;
  const shell = await getSiteShell(locale);

  return (
    <>
      <DocumentLanguage locale={locale} />
      <SiteShell locale={locale} data={shell}>{children}</SiteShell>
    </>
  );
}
