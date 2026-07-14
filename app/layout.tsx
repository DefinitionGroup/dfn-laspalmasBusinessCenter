import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aspekta = localFont({
  src: "../public/fonts/AspektaVF.woff2",
  variable: "--font-aspekta",
  display: "swap",
  weight: "50 1000",
});

const nyght = localFont({
  src: "../public/fonts/NyghtSerif-Regular.woff2",
  variable: "--font-nyght",
  display: "swap",
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Las Palmas Business Center", template: "%s" },
  description: "Espacios profesionales y servicios empresariales en Vegueta.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${aspekta.variable} ${nyght.variable}`}>
      <body>{children}</body>
    </html>
  );
}
