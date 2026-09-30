import type { ServiceSegment } from "@prisma/client";

export type ServiceData = {
  slug: string;
  segment: ServiceSegment;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  details?: string[];
};

export const services: ServiceData[] = [
  {
    slug: "apertura-puertas",
    segment: "RESIDENTIAL",
    title: "Apertura de puertas",
    description: "Apertura sin daños en puertas bloqueadas, urgencias 24 hs.",
    icon: "door-open",
    sortOrder: 1,
    details: [
      "Atención inmediata en Montevideo",
      "Técnicos con más de 15 años de experiencia",
      "Preservamos la integridad de la puerta cuando es posible",
    ],
  },
  {
    slug: "reparaciones",
    segment: "RESIDENTIAL",
    title: "Reparaciones",
    description: "Reparación de cerraduras, cerrojos y herrajes dañados.",
    icon: "wrench",
    sortOrder: 2,
  },
  {
    slug: "cambio-cerraduras",
    segment: "RESIDENTIAL",
    title: "Cambio de cerraduras",
    description: "Instalación de cerraduras Star y otros sistemas de seguridad.",
    icon: "key",
    sortOrder: 3,
  },
  {
    slug: "cajas-fuertes",
    segment: "RESIDENTIAL",
    title: "Apertura de cajas fuertes",
    description: "Apertura y cambio de combinación con total discreción.",
    icon: "vault",
    sortOrder: 4,
  },
  {
    slug: "puertas-blindex",
    segment: "COMMERCIAL",
    title: "Puertas Blindex",
    description: "Suministro de herrajes, frenos de piso, mantenimiento y nivelación.",
    icon: "building-2",
    sortOrder: 5,
    details: [
      "Mantenimiento preventivo y correctivo",
      "Nivelación de puertas",
      "Zócalos superior e inferior",
      "Registrados en RUPE",
    ],
  },
  {
    slug: "control-accesos",
    segment: "BUILDING",
    title: "Control de accesos",
    description: "Sistemas con huella, tarjeta, TAG, código y cerradura electrónica.",
    icon: "fingerprint",
    sortOrder: 6,
    details: [
      "Instalación en edificios, oficinas y comercios",
      "Fuente con batería ante cortes de energía",
      "Presupuestos sin cargo",
    ],
  },
  {
    slug: "apertura-vehiculos",
    segment: "VEHICLE",
    title: "Apertura de vehículos",
    description: "Apertura de autos bloqueados con herramientas profesionales.",
    icon: "car",
    sortOrder: 7,
  },
  {
    slug: "duplicado-llaves",
    segment: "RESIDENTIAL",
    title: "Duplicado de llaves",
    description: "Yale, multipunto, doble paleta, TAG y todo tipo de llaves.",
    icon: "copy",
    sortOrder: 8,
  },
];

export const serviceSegments = [
  {
    id: "RESIDENTIAL" as const,
    title: "Residencial",
    items: ["Apertura de puertas", "Reparaciones", "Cambio de cerraduras", "Cajas fuertes", "Duplicado de llaves"],
  },
  {
    id: "COMMERCIAL" as const,
    title: "Empresas",
    items: ["Puertas Blindex", "Herrajes y frenos de piso", "Mantenimiento", "Nivelación", "Zócalos"],
  },
  {
    id: "VEHICLE" as const,
    title: "Vehículos",
    items: ["Apertura de puertas"],
  },
  {
    id: "BUILDING" as const,
    title: "Edificios",
    items: ["Control de accesos", "Código", "Tarjeta NFC", "TAG", "Huella digital"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
