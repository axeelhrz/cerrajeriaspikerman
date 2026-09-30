import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { SectionId } from "@/lib/sections";
import { sectionHref } from "@/lib/sections";

export function redirectToSection(locale: string, section: SectionId) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  redirect(`${prefix}${sectionHref(section)}`);
}
