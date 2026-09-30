import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Home, Building2, Car, Building, KeyRound } from "lucide-react";
import { sections, sectionHref } from "@/lib/sections";

const keyTypes = [
  { key: "yale" as const, image: "/images/keys/yale.png" },
  { key: "multipunto" as const, image: "/images/keys/multipunto.png" },
  { key: "doblePaleta" as const, image: "/images/keys/doble-paleta.png" },
  { key: "tag" as const, image: "/images/keys/tag.png" },
];

const segments = [
  { key: "residential" as const, icon: Home },
  { key: "commercial" as const, icon: Building2 },
  { key: "vehicle" as const, icon: Car },
  { key: "building" as const, icon: Building },
];

export async function ServicesDetailSection() {
  const t = await getTranslations("serviceDetail");

  return (
    <section id={sections.serviciosCompletos} className="section-dark scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="section-tag-light">{t("eyebrow")}</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{t("subtitle")}</p>
        </div>

        {/* Tipos de llaves */}
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-orange-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              {t("keysTitle")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {keyTypes.map(({ key, image }) => (
              <div key={key} className="surface-card flex flex-col text-center">
                <div className="flex min-h-[148px] flex-1 items-center justify-center px-5 py-6">
                  <Image
                    src={image}
                    alt=""
                    width={120}
                    height={100}
                    unoptimized
                    className="h-auto max-h-[88px] w-auto max-w-full object-contain object-center drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                  />
                </div>
                <p className="border-t border-white/10 px-3 py-2.5 text-xs font-semibold text-slate-200">
                  {t(`keys.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Segmentos */}
        <div className="grid gap-4 md:grid-cols-2">
          {segments.map(({ key, icon: Icon }) => {
            const items = t.raw(`segments.${key}.items`) as string[];
            return (
              <div key={key} className="surface-card p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-white">{t(`segments.${key}.title`)}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a href={sectionHref(sections.cotizar)} className="btn-pill btn-pill-dark text-sm">
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
