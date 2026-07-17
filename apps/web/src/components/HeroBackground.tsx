"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

// Rotating college-photo background for the detail-page hero. Cycles the uploaded
// gallery images every 3 seconds with a cross-fade. Only a light bottom-anchored
// scrim is used (not a full wash) so the photo itself stays clearly visible; the
// text above it carries its own drop-shadow for legibility.
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
      {/* Light bottom-only scrim — keeps the photo visible, just anchors the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
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
