"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Algunos capítulos no tienen cifras: no avisar por selectores vacíos.
  gsap.config({ nullTargetWarn: false });
}

/** Consultas de media reutilizables para gsap.matchMedia() */
export const MQ = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
