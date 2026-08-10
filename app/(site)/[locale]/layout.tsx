import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import { aspekta, nyght } from "@/app/fonts";
import { baseMetadata } from "@/lib/page-metadata";
import { getSiteShell } from "@/sanity/lib/queries";
import { locales, type Locale } from "@/types/content";
import "../../globals.css";

export const metadata = baseMetadata;

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
    <html lang={locale} className={`${aspekta.variable} ${nyght.variable}`}>
      <body>
        <SiteShell locale={locale} data={shell}>{children}</SiteShell>
      </body>
    </html>
  );
}
