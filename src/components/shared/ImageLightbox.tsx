"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: ImageLightboxProps) {
  const current = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onIndexChange(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[100dvh] max-w-[min(96vw,1200px)]" aria-describedby="lightbox-description">
        <DialogTitle className="sr-only">
          {current.alt}
        </DialogTitle>
        <DialogDescription id="lightbox-description" className="sr-only">
          Full size gallery image. Use arrow keys to browse. Press Escape to close.
        </DialogDescription>
        <div className="relative flex min-h-[50dvh] flex-col items-center justify-center">
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-accent-orange"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-12 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-accent-orange"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative flex max-h-[85dvh] w-full items-center justify-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={1200}
              height={1600}
              className="max-h-[85dvh] w-auto max-w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <p className="mt-4 max-w-2xl text-center text-sm text-white/80">{current.alt}</p>
          {hasMultiple && (
            <p className="mt-2 text-xs text-white/40">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface GalleryThumbProps {
  src: string;
  alt: string;
  objectPosition?: string;
  aspectClass?: string;
  onClick: () => void;
}

export function GalleryThumb({
  src,
  alt,
  objectPosition = "center",
  aspectClass = "aspect-[4/3]",
  onClick,
}: GalleryThumbProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-white/10 text-left",
        "cursor-zoom-in transition-all hover:border-accent-orange/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange",
        aspectClass
      )}
      aria-label={`View full size: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-court-dark/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="absolute bottom-3 left-3 right-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        Click to enlarge
      </p>
    </button>
  );
}
