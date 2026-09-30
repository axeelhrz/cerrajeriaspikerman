import { getTranslations } from "next-intl/server";
import { BrandMarquee } from "@/components/home/brand-marquee";

export async function BrandStrip() {
  const t = await getTranslations("services");

  return (
    <div className="border-y border-white/10 bg-slate-950/50 py-8 md:py-10">
      <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {t("brands")}
      </p>
      <BrandMarquee />
    </div>
  );
}
