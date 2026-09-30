import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return routing.locales.map((locale) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return {
      url: `${base}${prefix}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    };
  });
}
