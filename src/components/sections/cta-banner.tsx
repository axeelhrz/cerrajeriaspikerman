import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { whatsappUrl } from "@/lib/site-config";

export async function CtaBanner() {
  const t = await getTranslations("home");

  return (
    <section className="section-dark py-4">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
          <div className="absolute inset-y-0 left-0 hidden w-1/3 md:block">
            <Image
              src="/images/products/cerraduras-star.jpg"
              alt=""
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900" />
          </div>

          <div className="relative flex flex-col items-start justify-between gap-6 px-8 py-10 md:flex-row md:items-center md:py-12 md:pl-[38%]">
            <div>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                {t("ctaBannerTitle")}
              </h2>
              <p className="mt-2 text-slate-400">{t("ctaBannerSubtitle")}</p>
            </div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-white shrink-0 whitespace-nowrap"
            >
              {t("ctaBannerButton")} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
