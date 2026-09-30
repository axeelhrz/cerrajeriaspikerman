"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/catalog/product-card-client";
import { products } from "@/lib/data/products";
import { sections, sectionHref } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Package, ShieldCheck, Wrench } from "lucide-react";

const filters = [
  { value: "all", key: "filterAll" },
  { value: "LOCK", key: "filterLock" },
  { value: "MONOBLOCK", key: "filterMonoblock" },
  { value: "DEADBOLT", key: "filterDeadbolt" },
] as const;

const INITIAL_COUNT = 18;

const categoryLabelKeys: Record<string, "filterLock" | "filterMonoblock" | "filterDeadbolt"> = {
  LOCK: "filterLock",
  MONOBLOCK: "filterMonoblock",
  DEADBOLT: "filterDeadbolt",
};

const perks = [
  { icon: Wrench, key: "perkInstall" as const },
  { icon: ShieldCheck, key: "perkWarranty" as const },
  { icon: Package, key: "perkStock" as const },
];

export function CatalogSection() {
  const t = useTranslations("catalog");
  const [category, setCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  return (
    <section id={sections.cerraduras} className="section-dark scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="relative grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:pb-12">
          <div>
            <p className="section-tag-light">{t("eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {perks.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-slate-300">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="sticky top-[4.5rem] z-30 mt-8 md:top-20">
          <div className="catalog-filter-bar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => {
                    setCategory(filter.value);
                    setExpanded(false);
                  }}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                    category === filter.value
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {t(filter.key)}
                </button>
              ))}
            </div>
            <p className="px-2 text-sm text-slate-500">
              <span className="font-bold text-white">{filtered.length}</span> {t("productCount")}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              categoryLabel={t(categoryLabelKeys[product.category])}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate-500">{t("emptyFilter")}</p>
        )}

        {hasMore && !expanded && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="btn-pill bg-orange-500 px-8 text-white shadow-md shadow-orange-500/25 hover:bg-orange-600"
            >
              {t("showAll")} ({filtered.length})
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {expanded && hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-sm font-semibold text-slate-500 transition-colors hover:text-white"
            >
              {t("showLess")}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-8 backdrop-blur-sm md:flex md:items-center md:justify-between md:px-10 md:py-10">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="relative text-center md:text-left">
            <p className="text-lg font-bold text-white">{t("ctaTitle")}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{t("ctaSubtitle")}</p>
          </div>
          <a
            href={sectionHref(sections.cotizar)}
            className="btn-pill btn-pill-white relative mt-6 shrink-0 md:mt-0"
          >
            {t("ctaButton")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
