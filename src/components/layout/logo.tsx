import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "color";
  className?: string;
};

/** Llave al estilo del logo oficial Spikerman (horizontal, dientes arriba). */
function SpikermanKey({ holeFill }: { holeFill: string }) {
  return (
    <svg
      viewBox="0 0 58 30"
      className="h-7 w-[2.9rem] shrink-0 sm:h-8 sm:w-[3.35rem] md:h-9 md:w-[3.75rem]"
      aria-hidden
    >
      <g fill="#f97316" stroke="#111827" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round">
        {/* Cabeza circular */}
        <circle cx="12.5" cy="15" r="10.2" />
        {/* Asta horizontal: 5 dientes arriba, base recta, punta afilada */}
        <path d="M 21.2 19.4 H 44.6 L 55.2 15 L 44.6 10.6 H 42.3 V 12.1 H 39.4 V 13.7 H 36.5 V 11.2 H 33.6 V 13.7 H 30.2 V 9.5 H 27.3 V 13.7 H 24 V 10.3 H 21.2 V 19.4 Z" />
      </g>
      {/* Brillo superior de la cabeza */}
      <path
        d="M 7.2 11.2 A 6.2 6.2 0 0 1 11.8 6.6"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Ojo de la llave */}
      <circle cx="12.5" cy="15" r="3.6" fill={holeFill} stroke="none" />
      <circle cx="12.5" cy="15" r="3.6" fill="none" stroke="#111827" strokeWidth="0.9" opacity="0.35" />
    </svg>
  );
}

export function Logo({ variant = "light", className }: LogoProps) {
  const isLight = variant === "light";
  const holeFill = isLight ? "#0a0f1a" : "#ffffff";

  return (
    <div className={cn("flex min-w-0 items-center gap-2 sm:gap-2.5", className)}>
      <SpikermanKey holeFill={holeFill} />

      <div className="min-w-0 leading-none">
        <span
          className={cn(
            "block text-[8px] font-bold uppercase tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em] md:text-[10px]",
            isLight ? "text-white/75" : "text-slate-600"
          )}
        >
          Cerrajería
        </span>
        <span
          className={cn(
            "mt-0.5 block truncate text-sm font-extrabold uppercase tracking-[0.04em] sm:text-base md:text-lg",
            isLight ? "text-white" : "text-slate-900"
          )}
        >
          Spikerman
        </span>
      </div>
    </div>
  );
}
