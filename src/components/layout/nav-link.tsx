"use client";

import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/sections";
import { sectionHref } from "@/lib/sections";
import { forwardRef } from "react";

type NavLinkProps = {
  section: SectionId;
  label: string;
  active?: boolean;
  onNavigate?: () => void;
  className?: string;
  variant?: "desktop" | "mobile" | "mobile-dark";
  light?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink(
    {
      section,
      label,
      active,
      onNavigate,
      className,
      variant = "desktop",
      light = false,
    },
    ref
  ) {
    const href = sectionHref(section);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
      e.preventDefault();
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      onNavigate?.();
    }

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "relative whitespace-nowrap font-medium transition-colors duration-200",
          variant === "desktop" && "px-3 py-2 text-[13px] tracking-wide",
          variant === "desktop" &&
            light &&
            (active
              ? "rounded-full bg-white/15 text-white"
              : "text-white/60 hover:bg-white/10 hover:text-white"),
          variant === "desktop" &&
            !light &&
            (active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"),
          variant === "mobile" &&
            cn(
              "block rounded-xl px-4 py-3.5 text-base",
              active ? "bg-neutral-900 text-white" : "text-neutral-800 hover:bg-neutral-50"
            ),
          variant === "mobile-dark" &&
            cn(
              "block rounded-xl px-4 py-3.5 text-base",
              active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            ),
          className
        )}
      >
        {label}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";
