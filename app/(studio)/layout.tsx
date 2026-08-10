import type { Metadata } from "next";
import { aspekta, nyght } from "@/app/fonts";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: `Content Studio | ${SITE_NAME}`,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${aspekta.variable} ${nyght.variable}`}>
      <body>{children}</body>
    </html>
  );
}
