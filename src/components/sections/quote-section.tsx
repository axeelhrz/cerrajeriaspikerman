import { getTranslations } from "next-intl/server";
import { QuoteWizard } from "@/components/cotizador/quote-wizard";
import { sections } from "@/lib/sections";

export async function QuoteSection() {
  const t = await getTranslations("quote");

  return (
    <section id={sections.cotizar} className="section-dark scroll-mt-24 py-14 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 text-center md:mb-10">
          <p className="section-tag-light">{t("eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-400">{t("subtitle")}</p>
        </div>
        <QuoteWizard />
      </div>
    </section>
  );
}
