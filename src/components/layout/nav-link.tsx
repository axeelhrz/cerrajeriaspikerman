"use client";

import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/sections";
import { sectionHref } from "@/lib/sections";
import { forwardRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type NavLinkProps = {
  section: SectionId;
  label: string;
  active?: boolean;
  onNavigate?: () => void;
  className?: string;
  variant?: "desktop" | "mobile" | "mobile-dark" | "mobile-drawer";
  light?: boolean;
  icon?: ReactNode;
  highlight?: boolean;
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
      icon,
      highlight = false,
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
          "relative font-medium transition-all duration-200",
          variant === "desktop" && "whitespace-nowrap px-2 py-2 text-xs tracking-wide xl:px-3 xl:text-[13px]",
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
          variant === "mobile-drawer" &&
            cn(
              "group flex items-center gap-3 rounded-xl px-3 py-3.5 text-[15px]",
              highlight &&
                "border border-orange-500/30 bg-orange-500/10 text-orange-200 hover:bg-orange-500/15",
              !highlight &&
                active &&
                "border border-orange-500/25 bg-orange-500/10 text-white shadow-sm shadow-orange-500/10",
              !highlight &&
                !active &&
                "border border-transparent text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white"
            ),
          className
        )}
      >
        {variant === "mobile-drawer" && (
          <>
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                active || highlight
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
              )}
            >
              {icon}
            </span>
            <span className="min-w-0 flex-1 font-semibold leading-tight">{label}</span>
            {active && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden />
            )}
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-white/40",
                (active || highlight) && "text-orange-400/60"
              )}
              aria-hidden
            />
          </>
        )}
        {variant !== "mobile-drawer" && label}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";
