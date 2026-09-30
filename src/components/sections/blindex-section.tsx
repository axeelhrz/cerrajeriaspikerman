import { getTranslations } from "next-intl/server";
import { Wrench, Settings, AlignCenter, Layers, BadgeCheck } from "lucide-react";
import { sections } from "@/lib/sections";

export async function BlindexSection() {
  const t = await getTranslations("blindex");

  const items = [
    { key: "hardware", icon: Wrench },
    { key: "maintenance", icon: Settings },
    { key: "leveling", icon: AlignCenter },
    { key: "sills", icon: Layers },
  ] as const;

  return (
    <section id={sections.blindex} className="section-dark scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="section-tag-light">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map(({ key, icon: Icon }) => (
            <div key={key} className="surface-card flex items-center gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-slate-200">{t(`items.${key}`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300">
          <BadgeCheck className="h-4 w-4 text-orange-400" />
          {t("rupe")}
        </div>
      </div>
    </section>
  );
}
