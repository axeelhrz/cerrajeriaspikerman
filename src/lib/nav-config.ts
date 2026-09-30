import type { LucideIcon } from "lucide-react";
import {
  Home,
  Wrench,
  Key,
  Fingerprint,
  DoorOpen,
  FileText,
  Phone,
} from "lucide-react";
import { sections, type SectionId } from "@/lib/sections";

export type NavItemKey =
  | "home"
  | "services"
  | "locks"
  | "accessControl"
  | "blindex"
  | "quote"
  | "contact";

export type NavItem = {
  section: SectionId;
  key: NavItemKey;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { section: sections.inicio, key: "home", icon: Home },
  { section: sections.servicios, key: "services", icon: Wrench },
  { section: sections.cerraduras, key: "locks", icon: Key },
  { section: sections.controlDeAccesos, key: "accessControl", icon: Fingerprint },
  { section: sections.blindex, key: "blindex", icon: DoorOpen },
  { section: sections.cotizar, key: "quote", icon: FileText },
  { section: sections.contacto, key: "contact", icon: Phone },
];
