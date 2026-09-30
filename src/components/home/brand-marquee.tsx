"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Star", highlight: true },
  { name: "Yale", highlight: false },
  { name: "Abus", highlight: false },
  { name: "Mul-T-Lock", highlight: false },
  { name: "Tesa", highlight: false },
  { name: "Cisa", highlight: false },
];

const PX_PER_SEC = 72;

const BrandSet = forwardRef<HTMLDivElement, { className?: string }>(
  function BrandSet({ className }, ref) {
    return (
      <div ref={ref} className={cn("flex shrink-0 items-center gap-10 md:gap-16", className)}>
        {brands.map((brand) => (
          <span
            key={brand.name}
            className={cn(
              "whitespace-nowrap text-sm font-semibold tracking-tight md:text-base",
              brand.highlight ? "text-orange-400" : "text-white/60"
            )}
          >
            {brand.name}
          </span>
        ))}
      </div>
    );
  }
);

export function BrandMarquee() {
  const setRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState(4);
  const [shiftPx, setShiftPx] = useState(0);
  const [duration, setDuration] = useState(30);
  const [staticMode, setStaticMode] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStaticMode(true);
      setReady(true);
      return;
    }

    function measure() {
      const setEl = setRef.current;
      if (!setEl) return;

      const setWidth = setEl.getBoundingClientRect().width;
      if (setWidth <= 0) return;

      const viewport = window.innerWidth;
      const copies = Math.max(4, Math.ceil(viewport / setWidth) + 2);

      setShiftPx(setWidth);
      setCopyCount(copies);
      setDuration(setWidth / PX_PER_SEC);
      setReady(true);

      trackRef.current?.style.setProperty("--marquee-shift", `${setWidth}px`);
      trackRef.current?.style.setProperty("--marquee-duration", `${setWidth / PX_PER_SEC}s`);
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (staticMode) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 md:gap-x-16">
        {brands.map((brand) => (
          <span
            key={brand.name}
            className={cn(
              "text-sm font-semibold tracking-tight md:text-base",
              brand.highlight ? "text-orange-400" : "text-white/60"
            )}
          >
            {brand.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={trackRef}
        className={cn("marquee-track flex w-max items-center", ready && "marquee-track-active")}
        style={
          ready
            ? ({
                "--marquee-shift": `${shiftPx}px`,
                "--marquee-duration": `${duration}s`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {Array.from({ length: copyCount }).map((_, index) => (
          <BrandSet key={index} ref={index === 0 ? setRef : undefined} />
        ))}
      </div>
    </div>
  );
}
