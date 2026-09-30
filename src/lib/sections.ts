export const sections = {
  inicio: "inicio",
  servicios: "servicios",
  serviciosCompletos: "servicios-completos",
  cerraduras: "cerraduras",
  controlDeAccesos: "control-de-accesos",
  blindex: "puertas-blindex",
  cotizar: "cotizar",
  contacto: "contacto",
} as const;

export type SectionId = (typeof sections)[keyof typeof sections];

export function sectionHref(id: SectionId) {
  return `#${id}`;
}
