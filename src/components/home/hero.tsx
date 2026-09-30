import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Shield, Zap, Heart } from "lucide-react";
import { siteConfig, whatsappUrl, phoneUrl } from "@/lib/site-config";
import { sections, sectionHref } from "@/lib/sections";

export async function Hero() {
  const t = await getTranslations("hero");

  const features = [
    { icon: Shield, label: t("features.professional") },
    { icon: Zap, label: t("features.fast") },
    { icon: Heart, label: t("features.quote") },
  ];

  return (
    <section
      id={sections.inicio}
      className="relative min-h-[100svh] scroll-mt-0 overflow-hidden bg-neutral-950 text-white"
    >
      <Image
        src="/images/brand/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-8 pt-32 md:px-8 md:pb-12 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-tag-light animate-fade-up opacity-0">{t("badge")}</p>
            <h1 className="animate-fade-up delay-100 mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight opacity-0 md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-lg text-base leading-relaxed text-neutral-300 opacity-0 md:text-lg">
              {t("subtitle")}
            </p>

            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap gap-3 opacity-0">
              <a href={sectionHref(sections.cotizar)} className="btn-pill btn-pill-white">
                {t("ctaPrimary")} →
              </a>
              <a href={sectionHref(sections.servicios)} className="btn-pill btn-pill-outline">
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="animate-fade-up delay-300 mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 opacity-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-neutral-300">
                  <Icon className="h-4 w-4 text-white/70" strokeWidth={1.5} />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a
                href={phoneUrl()}
                className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:flex"
              >
                <span className="text-lg font-bold">24/7</span>
                <span className="text-neutral-400">|</span>
                Urgencias
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-outline hidden text-xs sm:inline-flex"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
