import { aspekta, nyght } from "@/app/fonts";
import { baseMetadata } from "@/lib/page-metadata";
import "../globals.css";

export const metadata = baseMetadata;

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${aspekta.variable} ${nyght.variable}`}>
      <body>{children}</body>
    </html>
  );
}
