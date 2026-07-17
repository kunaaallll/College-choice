"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Rotating hero background. Swaps the campus image every 5s with a soft cross-fade.
// Overlay keeps the white headline + search readable while the photo stays visible.
export function HeroCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setActive((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Light bottom-only scrim — keeps the photo raw/clearly visible; hero text
          carries its own drop-shadow for legibility instead of a full wash. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}
