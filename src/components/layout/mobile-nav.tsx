"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { NavLink } from "@/components/layout/nav-link";
import { navItems } from "@/lib/nav-config";
import { siteConfig, phoneUrl, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";
import type { SectionId } from "@/lib/sections";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  activeSection: SectionId;
};

export function MobileNav({ open, onClose, activeSection }: MobileNavProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Menú">
      <button
        type="button"
        aria-label="Cerrar menú"
        className={cn(
          "mobile-nav-backdrop absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "mobile-nav-panel absolute right-0 top-0 flex h-full w-[min(100vw-2.5rem,22rem)] flex-col border-l border-white/10 bg-gradient-to-b from-[#0f1628] via-[#0a0f1a] to-[#070b14] text-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400/80">
              Menú
            </p>
            <div className="mt-1">
              <Logo variant="light" />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = activeSection === item.section;
              const isQuote = item.key === "quote";

              return (
                <li
                  key={item.section}
                  className={cn("mobile-nav-item", visible && "mobile-nav-item-visible")}
                  style={{ transitionDelay: visible ? `${80 + index * 45}ms` : "0ms" }}
                >
                  <NavLink
                    section={item.section}
                    label={t(item.key)}
                    active={active}
                    onNavigate={onClose}
                    variant="mobile-drawer"
                    light
                    icon={<Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />}
                    highlight={isQuote}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={cn(
            "mobile-nav-footer space-y-3 border-t border-white/10 bg-black/20 px-5 py-5 transition-all duration-300",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{ transitionDelay: visible ? "320ms" : "0ms" }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex rounded-full bg-orange-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-300">
              24/7 Urgencias
            </span>
            <LocaleSwitcher current={locale as Locale} />
          </div>

          <a
            href={phoneUrl()}
            className="btn-pill btn-pill-block bg-orange-500 text-sm text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-block border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400 hover:bg-emerald-500/20"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}

function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex rounded-full bg-white/10 p-0.5 text-[10px] font-bold">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href="/"
          locale={locale}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-all",
            current === locale ? "bg-orange-500 text-white" : "text-white/50 hover:text-white"
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
