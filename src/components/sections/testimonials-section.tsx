import { getTranslations } from "next-intl/server";
import { MessageCircle, Phone, Quote, Star } from "lucide-react";
import { siteConfig, phoneUrl, whatsappUrl } from "@/lib/site-config";

const testimonials = [
  { name: "Martín G.", text: "testimonials.1" as const },
  { name: "Lucía R.", text: "testimonials.2" as const },
  { name: "Diego S.", text: "testimonials.3" as const },
];

export async function TestimonialsSection() {
  const t = await getTranslations("home");

  return (
    <section className="section-dark py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Header + rating */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-10">
          <div className="max-w-md">
            <p className="section-tag-light">{t("testimonialsEyebrow")}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {t("testimonialsTitle")}
            </h2>
          </div>
          <div className="surface-card flex items-center gap-4 px-5 py-3.5">
            <p className="text-3xl font-extrabold leading-none text-white">5.0</p>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {siteConfig.stats.reviews} {t("stats.clients").toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-3 md:grid-cols-3">
          {testimonials.map(({ name, text }) => (
            <figure
              key={name}
              className="surface-card flex flex-col border-l-2 border-l-orange-500/60 p-5 md:p-6"
            >
              <Quote className="mb-3 h-5 w-5 text-orange-500/50" aria-hidden />
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
                {t(text)}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5 border-t border-white/10 pt-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-400">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{name}</p>
                  <p className="text-[10px] text-slate-500">Google Reviews</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center">
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 transition-colors hover:text-orange-400"
          >
            {t("testimonialsLink")} ({siteConfig.stats.reviews}) →
          </a>
        </p>

        {/* CTA urgencias integrado */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 via-slate-900/80 to-slate-900/80 p-6 md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <span className="inline-flex rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                24/7
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-white md:text-2xl">
                {t("ctaBannerTitle")}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{t("ctaBannerSubtitle")}</p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                {siteConfig.phoneDisplay}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
              <a
                href={phoneUrl()}
                className="btn-pill btn-pill-white justify-center text-sm"
              >
                <Phone className="h-4 w-4" />
                {t("ctaCall")}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill justify-center border border-white/20 bg-white/10 text-sm text-white hover:bg-white/15"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
