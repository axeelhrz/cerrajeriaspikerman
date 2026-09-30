"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/site-config";
import type { ProductData } from "@/lib/data/products";
import { ArrowUpRight, Check, KeyRound } from "lucide-react";

type ProductCardProps = {
  product: ProductData;
  categoryLabel: string;
};

export function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const t = useTranslations("catalog");

  const includesText = product.includes?.replace(/^Incluye\s*/i, "") ?? "";

  return (
    <article className="product-card group">
      <div className="product-card-image-wrap">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3 sm:p-5 sm:pt-4 md:p-6 md:pt-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-orange-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400">
            {categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <KeyRound className="h-3 w-3" aria-hidden />
            Star
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-orange-400 sm:text-lg">
          {product.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {product.description}
        </p>

        {includesText && (
          <div className="mt-4 flex gap-2.5 rounded-xl border border-white/8 bg-white/5 px-3.5 py-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={2.5} aria-hidden />
            <p className="text-xs leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-300">{t("includes")}: </span>
              {includesText}
            </p>
          </div>
        )}

        <a
          href={whatsappUrl(`Hola, consulto por ${product.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600"
        >
          {t("consult")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
