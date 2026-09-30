export const siteConfig = {
  name: "Cerrajería Spikerman",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cerrajeriaspikerman.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "24102153",
  phoneDisplay: "2410 2153",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "59899803111",
  whatsappDisplay: "099 803 111",
  address: "Salto 1175, Montevideo, Uruguay",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cerrajer%C3%ADa+Spikerman+Salto+1175+Montevideo",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-2MGSTSY3N8",
  hours: {
    local: "Lunes a viernes 9–19 hs · Sábados 10–15 hs",
    emergency: "Urgencias a domicilio 24 hs, 365 días",
  },
  stats: {
    reviews: "800+",
    years: "15+",
  },
};

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function phoneUrl() {
  return `tel:+598${siteConfig.phone.replace(/\s/g, "")}`;
}
