import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { BrandStrip } from "@/components/home/brand-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { AccessControlSection } from "@/components/sections/access-control-section";
import { BlindexSection } from "@/components/sections/blindex-section";
import { ServicesDetailSection } from "@/components/sections/services-detail-section";
import { WhySection } from "@/components/sections/why-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { ContactSection } from "@/components/sections/contact-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesSection />
      <BrandStrip />
      <CatalogSection />
      <AccessControlSection />
      <BlindexSection />
      <ServicesDetailSection />
      <WhySection />
      <TestimonialsSection />
      <QuoteSection />
      <ContactSection />
    </>
  );
}
