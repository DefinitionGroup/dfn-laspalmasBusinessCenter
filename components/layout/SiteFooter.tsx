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
          <p className="footer-label">Vegueta</p>
          <p>{settings.address}</p>
          {settings.accessHours ? <p>{settings.accessHours}</p> : null}
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {year} Las Palmas Business Center</span>
        <div><Link href={`/${locale}/aviso-legal`}>Legal</Link><Link href={`/${locale}/privacidad`}>Privacy</Link><Link href={`/${locale}/cookies`}>Cookies</Link></div>
      </div>
    </footer>
  );
}
