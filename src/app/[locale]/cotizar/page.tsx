import { redirectToSection } from "@/lib/redirect-to-section";
import { sections } from "@/lib/sections";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirectToSection(locale, sections.cotizar);
}
