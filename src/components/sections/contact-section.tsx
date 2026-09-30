import { getTranslations } from "next-intl/server";
import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig, phoneUrl, whatsappUrl } from "@/lib/site-config";
import { sections } from "@/lib/sections";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Cerrajer%C3%ADa+Spikerman+Salto+1175+Montevideo";

export async function ContactSection() {
  const t = await getTranslations("contact");

  type InfoRow = {
    icon: typeof MapPin;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    accent?: boolean;
    sub?: string;
  };

  const infoRows: InfoRow[] = [
    {
      icon: MapPin,
      label: t("address"),
      value: siteConfig.address,
      href: mapsUrl,
      external: true,
    },
    {
      icon: Phone,
      label: t("phone"),
      value: siteConfig.phoneDisplay,
      href: phoneUrl(),
    },
    {
      icon: MessageCircle,
      label: t("whatsapp"),
      value: siteConfig.whatsappDisplay,
      href: whatsappUrl(),
      external: true,
      accent: true,
    },
    {
      icon: Clock,
      label: t("hours"),
      value: siteConfig.hours.local,
      sub: siteConfig.hours.emergency,
    },
  ];

  return (
    <section id={sections.contacto} className="section-dark scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 max-w-lg md:mb-10">
          <p className="section-tag-light">{t("eyebrow")}</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Info + mapa */}
          <div className="flex flex-col gap-4">
            <div className="surface-card divide-y divide-white/10 overflow-hidden">
              {infoRows.map((row) => (
                <div key={row.label} className="flex gap-4 px-5 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400">
                    <row.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external ? "_blank" : undefined}
                        rel={row.external ? "noopener noreferrer" : undefined}
                        className={`mt-0.5 block break-words text-sm font-semibold transition-colors hover:text-orange-400 ${
                          row.accent ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-slate-200">{row.value}</p>
                    )}
                    {row.sub && (
                      <p className="mt-1 text-xs text-orange-400/90">{row.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
              <a href={phoneUrl()} className="btn-pill btn-pill-white btn-pill-block justify-center py-2.5 text-xs min-[420px]:w-auto">
                <Phone className="h-3.5 w-3.5" />
                {t("callNow")}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-block justify-center border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs text-emerald-400 hover:bg-emerald-500/20 min-[420px]:w-auto"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>

            <div className="surface-card overflow-hidden">
              <div className="relative h-44 w-full sm:h-48">
                <iframe
                  title="Mapa"
                  src="https://maps.google.com/maps?q=Salto+1175+Montevideo&output=embed"
                  className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {t("openMaps")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
