"use client";

import { useEffect } from "react";

const legacyHashMap: Record<string, string> = {
  controldeaccesos: "control-de-accesos",
  puertasblindex: "puertas-blindex",
};

export function HashScroll() {
  useEffect(() => {
    let hash = window.location.hash.replace("#", "");
    if (!hash) return;

    hash = legacyHashMap[hash] ?? hash;

    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${hash}`);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
