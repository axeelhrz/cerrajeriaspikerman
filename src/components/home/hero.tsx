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

      <div className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pb-12 md:pt-32 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-tag-light animate-fade-up opacity-0">{t("badge")}</p>
            <h1 className="animate-fade-up delay-100 mt-3 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight opacity-0 sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {t("title")}
            </h1>
            <p className="animate-fade-up delay-200 mt-4 max-w-lg text-sm leading-relaxed text-neutral-300 opacity-0 sm:mt-6 sm:text-base md:text-lg">
              {t("subtitle")}
            </p>

            <div className="animate-fade-up delay-300 mt-8 flex flex-col gap-2.5 opacity-0 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-10 sm:gap-3">
              <a href={sectionHref(sections.cotizar)} className="btn-pill btn-pill-white btn-pill-block sm:w-auto">
                {t("ctaPrimary")} →
              </a>
              <a href={sectionHref(sections.servicios)} className="btn-pill btn-pill-outline btn-pill-block sm:w-auto">
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 opacity-0 sm:mt-14 sm:pt-8 md:flex-row md:items-center md:justify-between">
            <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex min-w-0 items-center gap-2.5 text-xs text-neutral-300 sm:gap-3 sm:text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-white/70" strokeWidth={1.5} />
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <a
                href={phoneUrl()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="text-base font-bold sm:text-lg">24/7</span>
                <span className="text-neutral-400">|</span>
                Urgencias
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-outline btn-pill-block text-xs sm:w-auto"
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
