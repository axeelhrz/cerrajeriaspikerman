import { getTranslations } from "next-intl/server";
import { QuoteWizard } from "@/components/cotizador/quote-wizard";
import { sections } from "@/lib/sections";

export async function QuoteSection() {
  const t = await getTranslations("quote");

  return (
    <section id={sections.cotizar} className="section-dark scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <p className="section-tag-light">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-400">{t("subtitle")}</p>
        </div>
        <QuoteWizard />
      </div>
    </section>
  );
}
