"use client";

import { useEffect, useState } from "react";

export default function NatureOrnaments() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slow = Math.min(scrollY * 0.05, 36);
  const medium = Math.min(scrollY * 0.08, 56);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="ornament-float absolute -left-24 top-8 h-[360px] w-[360px] opacity-30"
        viewBox="0 0 400 400"
        style={{ transform: `translateY(${slow}px)` }}
      >
        <path
          d="M120.8,-116.3C157.8,-83.9,189.5,-41.9,189.2,-0.3C188.8,41.4,156.4,82.7,119.4,116.7C82.4,150.7,40.9,177.3,-2.7,180.1C-46.3,182.8,-92.6,161.7,-131.9,127.7C-171.2,93.8,-203.6,46.9,-206.8,-3.2C-210,-53.3,-184.1,-106.5,-144.8,-138.9C-105.5,-171.2,-52.7,-182.5,-5.4,-177.1C41.9,-171.8,83.9,-149.8,120.8,-116.3Z"
          transform="translate(200 200)"
          fill="rgb(90 184 95 / 0.8)"
        />
      </svg>

      <svg
        className="ornament-drift absolute -right-24 top-[22%] h-[300px] w-[300px] opacity-20"
        viewBox="0 0 300 300"
        style={{ transform: `translateY(${medium}px)` }}
      >
        <path
          d="M72.8,-79.1C92.8,-52.8,106.2,-26.4,108.5,2.3C110.8,31,101.9,62.1,81.9,86.8C62,111.6,31,130,2.5,127.5C-26,125,-52,101.6,-76.3,76.9C-100.7,52.2,-123.4,26.1,-126.8,-3.4C-130.2,-33,-114.3,-66,-89.9,-92.2C-65.5,-118.3,-32.7,-137.5,-3.1,-134.4C26.4,-131.3,52.8,-105.8,72.8,-79.1Z"
          transform="translate(150 150)"
          fill="rgb(15 66 41 / 0.85)"
        />
      </svg>

      <svg
        className="ornament-pulse absolute bottom-6 left-1/2 h-[220px] w-[520px] -translate-x-1/2 opacity-20"
        viewBox="0 0 520 220"
      >
        <path
          d="M8,180 C80,120 120,210 190,160 C250,118 290,210 360,165 C420,127 470,190 512,150"
          stroke="rgb(90 184 95)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M8,120 C80,60 120,150 190,108 C250,66 290,160 360,112 C420,74 470,140 512,100"
          stroke="rgb(255 255 255)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
