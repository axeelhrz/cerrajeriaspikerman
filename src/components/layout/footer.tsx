import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { sections, sectionHref } from "@/lib/sections";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const links = [
    { section: sections.inicio, label: nav("home") },
    { section: sections.servicios, label: nav("services") },
    { section: sections.cerraduras, label: nav("locks") },
    { section: sections.controlDeAccesos, label: nav("accessControl") },
    { section: sections.contacto, label: nav("contact") },
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-10 text-center sm:py-12 md:flex-row md:items-start md:justify-between md:px-8 md:text-left">
        <Logo variant="light" />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.section}
              href={sectionHref(link.section)}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          Montevideo, Uruguay
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs leading-relaxed text-slate-500">
        <p className="break-words">
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
        </p>
        <a href={whatsappUrl()} className="mt-1 inline-block hover:text-orange-400">
          WhatsApp {siteConfig.whatsappDisplay}
        </a>
      </div>
    </footer>
  );
}
