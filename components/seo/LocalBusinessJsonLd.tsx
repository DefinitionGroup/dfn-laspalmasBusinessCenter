import { resolveImageUrl } from "@/sanity/lib/image";
import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import type { Locale, SiteSettings } from "@/types/content";

export default function LocalBusinessJsonLd({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const image = resolveImageUrl(settings.defaultMetadata?.image, { width: 1200, height: 630 });
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_ORIGIN}/#business`,
    name: settings.brandName || SITE_NAME,
    description: settings.description,
    url: absoluteUrl(`/${locale}`),
    logo: absoluteUrl("/brand/las-palmas-business-center-logo.png"),
    image: image || absoluteUrl("/images/hero-building.jpg"),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Agustín Millares 18",
      postalCode: "35001",
      addressLocality: "Las Palmas de Gran Canaria",
      addressRegion: "Las Palmas",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.1008446,
      longitude: -15.413202,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: settings.officeOpeningTime || "09:00",
      closes: settings.officeClosingTime || "18:00",
    },
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
