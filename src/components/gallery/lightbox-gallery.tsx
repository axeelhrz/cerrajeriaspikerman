"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = {
  title: string;
  imageUrl: string;
};

export function LightboxGallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setSelected((current) =>
      current === null ? null : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setSelected((current) =>
      current === null ? null : (current + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (selected === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, goPrev, goNext]);

  const hasMultiple = images.length > 1;

  return (
    <>
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.imageUrl}
            type="button"
            onClick={() => setSelected(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950/0 transition-all group-hover:bg-navy-950/40">
              <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={images[selected].title}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
              </button>
            </>
          )}

          <div
            className="relative h-[70vh] w-full max-w-5xl px-2 sm:h-[80vh] sm:px-8 md:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={images[selected].imageUrl}
              src={images[selected].imageUrl}
              alt={images[selected].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-6 flex flex-col items-center gap-3">
            {hasMultiple && (
              <p className="text-xs font-medium text-white/70">
                {selected + 1} / {images.length}
              </p>
            )}
            {hasMultiple && (
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(index);
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === selected ? "w-6 bg-orange-400" : "w-2 bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`Imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
