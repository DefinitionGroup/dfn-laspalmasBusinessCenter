import Image from "next/image";
import Link from "next/link";
import type { Locale, MenuDocument, SiteSettings } from "@/types/content";

export default function SiteFooter({
  locale,
  menu,
  settings,
}: {
  locale: Locale;
  menu: MenuDocument;
  settings: SiteSettings;
}) {
  const year = new Date().getFullYear();
  const accessCopy = locale === "es"
    ? {
        label: "Acceso",
        access: "Acceso 365 días al año",
        officeHours: "Horario de oficina",
        weekdays: "Lunes a viernes",
        opens: "Apertura",
        closes: "Cierre",
      }
    : {
        label: "Access",
        access: "Access 365 days a year",
        officeHours: "Office hours",
        weekdays: "Monday to Friday",
        opens: "Opens",
        closes: "Closes",
      };
  const openingTime = settings.officeOpeningTime ?? "09:00";
  const closingTime = settings.officeClosingTime ?? "18:00";
  const fundingCopy = locale === "es"
    ? "Esta web ha sido financiada por el Programa Kit Digital, en el marco del Plan de Recuperación, Transformación y Resiliencia, financiado por la Unión Europea – NextGenerationEU."
    : "This website has been funded by the Kit Digital Programme within the framework of Spain’s Recovery, Transformation and Resilience Plan, funded by the European Union – NextGenerationEU.";
  const fundingGraphicAlt = locale === "es"
    ? "Logotipos del Programa Kit Digital y NextGenerationEU"
    : "Kit Digital Programme and NextGenerationEU logos";

  return (
    <footer className="site-footer page-gutter">
      <div className="site-footer__brand">
        <p>Las Palmas</p>
        <strong>Business Center</strong>
        <span>{settings.description}</span>
      </div>
      <div className="site-footer__columns">
        <div>
          <p className="footer-label">Navigation</p>
          {menu.items.map((item) => <Link key={item._key} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <p className="footer-label">Contact</p>
          {settings.email.map((email) => <a key={email} href={`mailto:${email}`}>{email}</a>)}
          {settings.phone.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}
        </div>
        <div>
          <p className="footer-label">{accessCopy.label}</p>
          <p>{settings.address}</p>
          <div className="site-footer__access">
            <p>{accessCopy.access}</p>
            <div className="site-footer__hours">
              <span>{accessCopy.officeHours}</span>
              <strong>{accessCopy.weekdays}</strong>
              <dl>
                <div>
                  <dt>{accessCopy.opens}</dt>
                  <dd>{openingTime}</dd>
                </div>
                <div>
                  <dt>{accessCopy.closes}</dt>
                  <dd>{closingTime}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {year} Las Palmas Business Center</span>
        <div><Link href={`/${locale}/aviso-legal`}>Legal</Link><Link href={`/${locale}/privacidad`}>Privacy</Link><Link href={`/${locale}/cookies`}>Cookies</Link></div>
      </div>
      <div className="site-footer__funding">
        <Image
          src="/brand/kit-digital.svg"
          alt={fundingGraphicAlt}
          width={1595}
          height={151}
          className="site-footer__funding-graphic"
        />
        <p>{fundingCopy}</p>
      </div>
    </footer>
  );
}
