import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import type { Locale, SiteShellData } from "@/types/content";

export default function SiteShell({
  children,
  locale,
  data,
}: {
  children: React.ReactNode;
  locale: Locale;
  data: SiteShellData;
}) {
  return (
    <>
      <SiteHeader locale={locale} menu={data.menu} settings={data.settings} translationPages={data.translationPages} />
      <main>{children}</main>
      <SiteFooter locale={locale} menu={data.menu} settings={data.settings} />
    </>
  );
}
