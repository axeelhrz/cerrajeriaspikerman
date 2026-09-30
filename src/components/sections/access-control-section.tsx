import { getTranslations } from "next-intl/server";
import { Fingerprint, CreditCard, Tag, Hash, Lock, Battery, Clock, ShieldCheck } from "lucide-react";
import { LightboxGallery } from "@/components/gallery/lightbox-gallery";
import { galleryItems } from "@/lib/data/products";
import { sections, sectionHref } from "@/lib/sections";

export async function AccessControlSection() {
  const t = await getTranslations("accessControl");

  const features = [
    { key: "fingerprint", icon: Fingerprint },
    { key: "card", icon: CreditCard },
    { key: "tag", icon: Tag },
    { key: "code", icon: Hash },
    { key: "electronic", icon: Lock },
    { key: "battery", icon: Battery },
  ] as const;

  const perks = [
    { icon: ShieldCheck, key: "perkIntegral" as const },
    { icon: Clock, key: "perkEmergency" as const },
    { icon: Tag, key: "perkQuote" as const },
  ];

  return (
    <section id={sections.controlDeAccesos} className="section-dark scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="reveal-on-scroll mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="section-tag-light">{t("eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-1 text-sm font-medium text-orange-400">{t("subtitle")}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{t("intro")}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{t("introExtended")}</p>
          </div>
          <div className="grid gap-2">
            {perks.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="surface-card flex items-center gap-3 px-4 py-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-400" strokeWidth={1.75} />
                <span className="text-sm font-medium text-slate-200">{t(key)}</span>
              </div>
            ))}
            <a href={sectionHref(sections.cotizar)} className="btn-pill btn-pill-dark mt-1 text-sm">
              {t("cta")}
            </a>
          </div>
        </div>

        <div className="reveal-on-scroll reveal-stagger mb-10 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {features.map(({ key, icon: Icon }) => (
            <div key={key} className="surface-card flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <span className="text-sm font-semibold text-slate-200">{t(`features.${key}`)}</span>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
          {t("galleryTitle")}
        </h3>
        <p className="mb-6 max-w-2xl text-sm text-slate-500">{t("gallerySubtitle")}</p>
        <LightboxGallery images={galleryItems} />
      </div>
    </section>
  );
}
