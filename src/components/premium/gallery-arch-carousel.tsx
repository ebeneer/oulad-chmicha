"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/cn";

export type GalleryImageItem = { src: string; alt: string };

type GalleryArchCarouselProps = {
  images: GalleryImageItem[];
  className?: string;
};

const OFFSETS = [-2, -1, 0, 1, 2] as const;

function wrapIndex(i: number, n: number) {
  return ((i % n) + n) % n;
}

/**
 * Cinq arches en bande (desktop) : la carte centrale est la plus grande.
 * Mobile : seule l’image centrale (pleine largeur) avec la même forme d’arche.
 * La pagination place l’image choisie au centre.
 */
export function GalleryArchCarousel({ images, className }: GalleryArchCarouselProps) {
  const n = images.length;
  const baseId = useId();
  const [center, setCenter] = useState(0);

  const imageAt = useCallback((offset: number) => images[wrapIndex(center + offset, n)]!, [center, images, n]);

  if (n === 0) return null;

  return (
    <div className={cn("space-y-8", className)}>
      <div
        className="gallery-rail hidden gap-[1.1rem] md:grid"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Galerie photos"
      >
        {OFFSETS.map((offset) => {
          const item = imageAt(offset);
          const isCenter = offset === 0;
          const targetIndex = wrapIndex(center + offset, n);
          return (
            <button
              key={`${offset}-${center}`}
              type="button"
              onClick={() => setCenter(targetIndex)}
              className={cn(
                "gallery-slide group w-full cursor-pointer border-0 p-0 text-left text-inherit",
                isCenter && "gallery-slide-featured",
                "touch-manipulation",
                "transition-[transform,box-shadow] duration-200",
                "hover:ring-2 hover:ring-[#0f4229]/20 hover:ring-offset-0",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f4229]/45",
                "active:scale-[0.992]",
              )}
              aria-label={
                isCenter
                  ? `Photo au centre : ${item.alt} (déjà sélectionnée)`
                  : `Placer « ${item.alt} » au centre de la galerie`
              }
              aria-current={isCenter ? "true" : undefined}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 768px) 0, 20vw"
                className="pointer-events-none object-cover transition duration-500 group-hover:scale-105"
                priority={isCenter}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="md:hidden">
        <div className="gallery-slide gallery-slide-featured group relative mx-auto aspect-[4/5.15] w-full min-h-[min(28rem,78vh)] max-w-md">
          <Image
            key={images[center]!.src}
            src={images[center]!.src}
            alt={images[center]!.alt}
            fill
            sizes="90vw"
            className="object-cover transition duration-500"
            priority
          />
        </div>
      </div>

      <nav
        className="flex flex-wrap items-center justify-center gap-2.5"
        aria-label="Pagination galerie"
      >
        {images.map((item, i) => {
          const isActive = i === center;
          return (
            <button
              key={item.src}
              id={`${baseId}-dot-${i}`}
              type="button"
              onClick={() => setCenter(i)}
              className={cn(
                "h-2.5 min-w-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f4229]/40",
                isActive
                  ? "w-9 bg-[#0f4229] shadow-sm"
                  : "w-2.5 bg-[#0f4229]/22 hover:bg-[#0f4229]/40",
              )}
              aria-label={`Afficher la photo ${i + 1} sur ${n}`}
              aria-current={isActive ? "true" : undefined}
            />
          );
        })}
      </nav>
    </div>
  );
}
