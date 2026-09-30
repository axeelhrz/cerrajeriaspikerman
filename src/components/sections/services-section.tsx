import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Key, Fingerprint, Building2, DoorOpen, ArrowUpRight } from "lucide-react";
import { sections, sectionHref } from "@/lib/sections";

const featuredServices = [
  {
    slug: "cerraduras",
    icon: Key,
    titleKey: "cards.locks.title",
    descKey: "cards.locks.desc",
    image: "/images/products/cerradura-star-810s-hz.png",
    section: sections.cerraduras,
  },
  {
    slug: "accesos",
    icon: Fingerprint,
    titleKey: "cards.access.title",
    descKey: "cards.access.desc",
    image: "/images/gallery/control-de-accesos-01.webp",
    section: sections.controlDeAccesos,
  },
  {
    slug: "blindex",
    icon: Building2,
    titleKey: "cards.blindex.title",
    descKey: "cards.blindex.desc",
    image: "/images/services/svc-blindex.jpg",
    section: sections.blindex,
  },
  {
    slug: "apertura",
    icon: DoorOpen,
    titleKey: "cards.emergency.title",
    descKey: "cards.emergency.desc",
    image: "/images/brand/hero-bg.jpg",
    section: sections.contacto,
  },
] as const;

export async function ServicesSection() {
  const t = await getTranslations("services");

  return (
    <section id={sections.servicios} className="section-dark scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
          <div className="max-w-lg">
            <p className="section-tag-light">{t("eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {t("subtitle")}
            </p>
          </div>
          <a
            href={sectionHref(sections.controlDeAccesos)}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-400 transition-colors hover:text-orange-400"
          >
            {t("viewAll")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {featuredServices.map(({ icon: Icon, titleKey, descKey, image, section }, index) => (
            <a
              key={titleKey}
              href={sectionHref(section)}
              className="service-card-compact group flex overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 transition-all hover:border-white/20 hover:bg-slate-900/70"
            >
              <div className="relative w-20 shrink-0 self-stretch sm:w-24 md:w-[100px]">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100px"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tabular-nums text-orange-500/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white sm:text-[15px]">
                  {t(titleKey)}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {t(descKey)}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-orange-400">
                  {t("viewMore")}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
