"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

// Rotating college-photo background for the detail-page hero. Cycles the uploaded
// gallery images every 3 seconds with a cross-fade; a dark scrim keeps the hero
// text legible. Falls back to a single image (or nothing) gracefully.
export function HeroBackground({ images }: { images: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={idx === 0}
          className={clsx("object-cover transition-opacity duration-1000 ease-in-out", idx === i ? "opacity-100" : "opacity-0")}
        />
      ))}
      {/* Dark scrim for legible hero text over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/45" />
      {/* Slide dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, idx) => (
            <span key={idx} className={clsx("h-1.5 rounded-full transition-all", idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50")} />
          ))}
        </div>
      )}
    </div>
  );
}
