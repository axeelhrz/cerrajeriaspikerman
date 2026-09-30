"use client";

import { useEffect } from "react";

function revealIfVisible(el: Element) {
  const rect = el.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < viewport * 0.92 && rect.bottom > 0) {
    el.classList.add("is-revealed");
    return true;
  }
  return false;
}

export function ScrollRevealInit() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 2% 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach((el) => {
        if (!revealIfVisible(el)) {
          observer.observe(el);
        }
      });
    };

    observe();

    const onScroll = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach((el) => {
        if (revealIfVisible(el)) {
          observer.unobserve(el);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
