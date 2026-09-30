import type { Category } from "@prisma/client";

export type ProductData = {
  slug: string;
  category: Category;
  name: string;
  description: string;
  includes?: string;
  imageUrl: string;
  sortOrder: number;
  translations?: {
    en?: { name: string; description: string; includes?: string };
    pt?: { name: string; description: string; includes?: string };
  };
};

export const products: ProductData[] = [
  {
    slug: "cerradura-star-810s-hz",
    category: "LOCK",
    name: "Cerradura Star 810s HZ",
    description: "Cerradura de seguridad para puerta principal.",
    includes: "Incluye 2 copias de llaves, embellecedor y recibidor.",
    imageUrl: "/images/products/cerradura-star-810s-hz.png",
    sortOrder: 1,
  },
  {
    slug: "cerradura-star-410s-hn",
    category: "LOCK",
    name: "Cerradura Star 410s HN",
    description: "Cerradura de seguridad Star.",
    includes: "Incluye 2 copias de llaves, embellecedor y recibidor.",
    imageUrl: "/images/products/cerradura-star-410s-hn.png",
    sortOrder: 2,
  },
  {
    slug: "cerradura-star-510s-hz",
    category: "LOCK",
    name: "Cerradura Star 510s HZ",
    description: "Cerradura de seguridad Star.",
    includes: "Incluye 2 copias de llaves, embellecedor y recibidor.",
    imageUrl: "/images/products/cerradura-star-510s-hz.png",
    sortOrder: 3,
  },
  {
    slug: "cerradura-star-101s-hz",
    category: "LOCK",
    name: "Cerradura Star 101s HZ",
    description: "Cerradura de seguridad Star.",
    includes: "Incluye 2 copias de llaves, embellecedor y recibidor.",
    imageUrl: "/images/products/cerradura-star-101s-hz.png",
    sortOrder: 4,
  },
  {
    slug: "cerradura-star-603r-hz",
    category: "LOCK",
    name: "Cerradura Star 603r HZ",
    description: "Cerradura de seguridad Star.",
    includes: "Incluye 2 copias de llaves, embellecedor y recibidor.",
    imageUrl: "/images/products/cerradura-star-603r-hz.png",
    sortOrder: 5,
  },
  {
    slug: "cerradura-star-interior-8x75",
    category: "LOCK",
    name: "Cerradura Star de interior 8 × 75",
    description: "Cerradura de interior Star.",
    includes: "Incluye 2 copias de llaves.",
    imageUrl: "/images/products/cerradura-interior-8x75.png",
    sortOrder: 6,
  },
  {
    slug: "cerradura-star-interior-8x65",
    category: "LOCK",
    name: "Cerradura Star de interior 8 × 65",
    description: "Cerradura de interior Star.",
    includes: "Incluye 2 copias de llaves.",
    imageUrl: "/images/products/cerradura-interior-8x65.png",
    sortOrder: 7,
  },
  {
    slug: "cerradura-star-interior-8x60",
    category: "LOCK",
    name: "Cerradura Star de interior 8 × 60",
    description: "Cerradura de interior Star.",
    includes: "Incluye 2 copias de llaves.",
    imageUrl: "/images/products/cerradura-interior-8x60.png",
    sortOrder: 8,
  },
  {
    slug: "cerradura-star-monoblock-2100-hn",
    category: "MONOBLOCK",
    name: "Cerradura Star Monoblock 2100 HN",
    description: "Cerradura monoblock Star.",
    includes: "Incluye embellecedores.",
    imageUrl: "/images/products/monoblock-2100-hn.png",
    sortOrder: 9,
  },
  {
    slug: "cerradura-star-monoblock-4000-hz",
    category: "MONOBLOCK",
    name: "Cerradura Star Monoblock 4000 HZ",
    description: "Cerradura monoblock Star.",
    includes: "Incluye embellecedores.",
    imageUrl: "/images/products/monoblock-4000-hz.png",
    sortOrder: 10,
  },
  {
    slug: "cerrojo-star-800s-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star 800s HZ",
    description: "Cerrojo de seguridad Star.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-800s-hz.png",
    sortOrder: 11,
  },
  {
    slug: "cerrojo-star-porton-525g-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star para portón o puerta corrediza 525g HZ",
    description: "Para portón o puerta corrediza.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-porton-525g-hz.png",
    sortOrder: 12,
  },
  {
    slug: "cerrojo-star-porton-225g-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star para portón o puerta corrediza 225g HZ",
    description: "Para portón o puerta corrediza.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-porton-225g-hz.png",
    sortOrder: 13,
  },
  {
    slug: "cerrojo-star-puerta-200r-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star para portón o puerta 200r HZ",
    description: "Cerrojo Star para puerta.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-puerta-200r-hz.png",
    sortOrder: 14,
  },
  {
    slug: "cerrojo-star-900-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star 900 HZ",
    description: "Cerrojo de seguridad Star.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-900-hz.png",
    sortOrder: 15,
  },
  {
    slug: "cerrojo-star-500-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star 500 HZ",
    description: "Cerrojo de seguridad Star.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-500-hz.png",
    sortOrder: 16,
  },
  {
    slug: "cerrojo-star-400s-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star 400s HZ",
    description: "Cerrojo de seguridad Star.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-400s-hz.png",
    sortOrder: 17,
  },
  {
    slug: "cerrojo-star-500r-hz",
    category: "DEADBOLT",
    name: "Cerrojo Star 500r HZ",
    description: "Cerrojo de seguridad Star.",
    includes: "Incluye 2 llaves y embellecedores.",
    imageUrl: "/images/products/cerrojo-500r-hz.png",
    sortOrder: 18,
  },
];

export const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  title: `Instalación control de accesos ${i + 1}`,
  imageUrl: `/images/gallery/control-de-accesos-${String(i + 1).padStart(2, "0")}.webp`,
  category: "access-control",
  sortOrder: i + 1,
}));

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: Category) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}
