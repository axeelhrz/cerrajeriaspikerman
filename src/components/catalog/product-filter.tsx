"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const filters = [
  { value: "all", key: "filterAll" },
  { value: "LOCK", key: "filterLock" },
  { value: "MONOBLOCK", key: "filterMonoblock" },
  { value: "DEADBOLT", key: "filterDeadbolt" },
] as const;

export function ProductFilter() {
  const t = useTranslations("catalog");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = searchParams.get("categoria") ?? "all";

  function setFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("categoria");
    } else {
      params.set("categoria", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => setFilter(filter.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            current === filter.value
              ? "bg-navy-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          )}
        >
          {t(filter.key)}
        </button>
      ))}
    </div>
  );
}
