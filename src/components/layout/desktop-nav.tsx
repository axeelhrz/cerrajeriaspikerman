"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { NavLink } from "@/components/layout/nav-link";
import { navItems } from "@/lib/nav-config";
import type { SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

export function DesktopNav({
  activeSection,
  light = true,
  showIndicator = true,
}: {
  activeSection: SectionId;
  light?: boolean;
  showIndicator?: boolean;
}) {
  const t = useTranslations("nav");
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<SectionId, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    function update() {
      const el = linkRefs.current.get(activeSection);
      const nav = navRef.current;
      if (!el || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeSection]);

  return (
    <nav ref={navRef} className="relative flex items-center gap-0.5">
      {navItems
        .filter((item) => item.key !== "quote")
        .map((item) => (
          <NavLink
            key={item.section}
            ref={(node) => {
              if (node) linkRefs.current.set(item.section, node);
              else linkRefs.current.delete(item.section);
            }}
            section={item.section}
            label={t(item.key)}
            active={activeSection === item.section}
            variant="desktop"
            light={light}
          />
        ))}
      {showIndicator && (
        <span
          className={cn(
            "pointer-events-none absolute -bottom-1 h-0.5 rounded-full transition-all duration-300 ease-out",
            light ? "bg-orange-500" : "bg-neutral-900",
            indicator.width === 0 && "opacity-0"
          )}
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
    </nav>
  );
}

export { navItems };
