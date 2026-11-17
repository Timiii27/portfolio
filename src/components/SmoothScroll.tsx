"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll suave con Lenis sincronizado con GSAP ScrollTrigger. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Desplaza a un ancla respetando Lenis si está activo. */
export function scrollToTarget(target: string | number) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
}
