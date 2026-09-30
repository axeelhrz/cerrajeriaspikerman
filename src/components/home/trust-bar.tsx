import { Star, Shield, Clock, Calendar, BadgeCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export async function TrustBar() {
  const t = await getTranslations("trust");

  const items = [
    { icon: Star, value: siteConfig.stats.reviews, label: t("reviews"), color: "text-amber-500" },
    { icon: Shield, value: siteConfig.stats.years, label: t("experience"), color: "text-navy-700" },
    { icon: Clock, value: "24 hs", label: t("emergency"), color: "text-emerald-600" },
    { icon: Calendar, value: "365", label: t("days"), color: "text-navy-700" },
  ];

  return (
    <section className="relative z-10 -mt-8 mx-auto max-w-5xl px-4">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center px-4 py-5 text-center md:py-6">
              <item.icon className={cn("mb-2 h-5 w-5", item.color)} />
              <span className="text-2xl font-extrabold tracking-tight text-navy-900">{item.value}</span>
              <span className="mt-0.5 text-xs font-medium text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 border-t border-slate-100 py-3 text-xs font-semibold text-emerald-700">
          <BadgeCheck className="h-4 w-4" />
          {t("rupe")}
        </div>
      </div>
    </section>
  );
}
