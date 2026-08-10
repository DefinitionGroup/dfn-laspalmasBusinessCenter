"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { alternatePath } from "@/lib/translations";
import type { Locale, MenuDocument, PageTranslation, SiteSettings } from "@/types/content";

export default function SiteHeader({
  locale,
  menu,
  settings,
  translationPages,
}: {
  locale: Locale;
  menu: MenuDocument;
  settings: SiteSettings;
  translationPages: PageTranslation[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeMobileMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const otherLocale = locale === "es" ? "en" : "es";
  const otherLocalePath = alternatePath(pathname, otherLocale, translationPages) || `/${otherLocale}`;

  return (
    <header className={`site-header ${open ? "site-header--open" : ""} ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__bar page-gutter">
        <Link href={`/${locale}`} className="site-header__brand" aria-label={settings.brandName} onClick={() => setOpen(false)}>
          <Image
            className="site-header__brand-logo"
            src="/brand/las-palmas-business-center-logo.png"
            alt=""
            width={200}
            height={89}
            sizes="(max-width: 640px) 136px, 180px"
            priority
            unoptimized
          />
        </Link>
        <nav className="site-header__desktop" aria-label="Primary navigation">
          {menu.items.map((item) => <Link key={item._key} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="site-header__tools">
          <Link className="site-header__locale" href={otherLocalePath} hrefLang={otherLocale} onClick={() => setOpen(false)}>{otherLocale.toUpperCase()}</Link>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className="site-header__overlay" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {menu.items.map((item, index) => (
            <Link key={item._key} href={item.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
            </Link>
          ))}
          {menu.cta ? <Link className="site-header__mobile-cta" href={menu.cta.href} onClick={() => setOpen(false)}>{menu.cta.label} ↗</Link> : null}
        </nav>
      </div>
    </header>
  );
}
