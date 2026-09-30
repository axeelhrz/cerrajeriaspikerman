"use client";

import { useTranslations, useLocale } from "next-intl";
import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/layout/logo";
import { phoneUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { sections, sectionHref, type SectionId } from "@/lib/sections";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(sections.inicio);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const ids = Object.values(sections);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.2, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", sectionHref(sections.inicio));
    setOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-[top,padding] duration-300 ease-out",
          scrolled ? "top-3 px-3 md:top-4 md:px-6" : "top-0 px-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl min-w-0 items-center gap-2 sm:gap-4",
            "transition-[background-color,box-shadow,border-radius,padding,backdrop-filter] duration-300 ease-out",
            scrolled
              ? "rounded-2xl bg-neutral-950/90 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl md:rounded-full md:px-6 md:py-3"
              : "rounded-none bg-gradient-to-b from-black/40 to-black/0 px-4 py-4 shadow-none backdrop-blur-none md:px-8"
          )}
        >
          <a
            href={sectionHref(sections.inicio)}
            onClick={scrollToTop}
            className="flex shrink-0 items-center"
          >
            <Logo variant="light" />
          </a>

          <div className="hidden min-w-0 flex-1 justify-center xl:flex">
            <DesktopNav activeSection={activeSection} light showIndicator={scrolled} />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <LocaleSwitcher current={locale as Locale} className="hidden sm:flex" />

            <a
              href={phoneUrl()}
              className="btn-pill hidden bg-orange-500 text-white shadow-md shadow-orange-500/25 hover:bg-orange-600 sm:inline-flex"
              aria-label={t("callNow")}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden md:inline">{t("callNow")}</span>
            </a>

            <button
              type="button"
              className={cn(
                "inline-flex rounded-full p-2.5 text-white transition-all xl:hidden",
                open ? "bg-white/15" : "hover:bg-white/10"
              )}
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} activeSection={activeSection} />
    </>
  );
}

function LocaleSwitcher({ current, className }: { current: Locale; className?: string }) {
  return (
    <div className={cn("rounded-full bg-white/10 p-0.5 text-[10px] font-bold", className)}>
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href="/"
          locale={locale}
          className={cn(
            "rounded-full px-2 py-1 uppercase transition-all",
            current === locale ? "bg-orange-500 text-white" : "text-white/50 hover:text-white"
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
