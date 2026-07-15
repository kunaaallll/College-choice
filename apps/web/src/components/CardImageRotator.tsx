"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

// Cross-fades through a college's photos every 3s — used on grid/listing cards.
export function CardImageRotator({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <>
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={idx === 0}
          className={clsx(
            "object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105",
            idx === i ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={clsx("h-1 rounded-full transition-all", idx === i ? "w-3.5 bg-white" : "w-1 bg-white/60")}
            />
          ))}
        </div>
      )}
    </>
  );
}
