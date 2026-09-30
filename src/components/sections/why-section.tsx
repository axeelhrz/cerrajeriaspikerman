import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Shield, Award, Clock, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { sections, sectionHref } from "@/lib/sections";

export async function WhySection() {
  const t = await getTranslations("home");

  const stats = [
    { value: siteConfig.stats.years, label: t("stats.years") },
    { value: siteConfig.stats.reviews, label: t("stats.clients") },
    { value: "24/7", label: t("stats.emergency") },
  ];

  const points = [
    { icon: Shield, key: "speed" },
    { icon: Award, key: "quality" },
    { icon: Users, key: "trust" },
    { icon: Clock, key: "coverage" },
  ] as const;

  return (
    <section className="section-dark relative overflow-hidden py-20 text-white md:py-28">
      <Image
        src="/images/brand/hero-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="section-tag-light">{t("whyEyebrow")}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t("whyDarkTitle")}
          </h2>
          <p className="mt-6 max-w-md text-neutral-400 leading-relaxed">
            {t("whyDarkSubtitle")}
          </p>
          <a href={sectionHref(sections.contacto)} className="btn-pill btn-pill-outline mt-8 inline-flex text-sm">
            {t("whyCta")} →
          </a>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          {points.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold">{t(`whyItems.${key}.title`)}</h3>
                <p className="mt-1 text-sm text-neutral-400">{t(`whyItems.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
