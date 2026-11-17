"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { chapters } from "@/data/profile";
import { pad } from "@/lib/utils";
import { scrollToTarget } from "./SmoothScroll";

/** Índice tipo `ls -la`: cada fila salta a su capítulo. */
export default function ChapterIndex() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".js-row", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".js-rows", start: "top 80%" },
        });
        gsap.from(".js-index-title", {
          yPercent: 105,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experiencia"
      data-path="~/experiencia"
      className="relative border-t-2 border-ink px-5 py-24 md:px-10 md:py-36"
    >
      <p className="mb-4 text-sm">
        <span className="text-mute">$</span> ls -la ~/experiencia
      </p>

      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <h2 className="display line-mask text-[clamp(3.5rem,13vw,13rem)]">
          <span className="js-index-title block">Experiencia</span>
        </h2>
        <p className="tag max-w-xs pb-3 leading-relaxed">
          total {pad(chapters.length)} capítulos — cada uno se recorre con scroll. Pulsa una fila para saltar.
        </p>
      </div>

      <ol className="js-rows border-t-2 border-ink">
        {chapters.map((c, i) => (
          <li key={c.id} className="js-row border-b-2 border-ink">
            <button
              type="button"
              onClick={() => scrollToTarget(`#cap-${c.id}`)}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-2 py-5 text-left transition-colors hover:bg-ink hover:text-paper md:grid-cols-[7rem_10rem_1fr_1fr_auto] md:gap-6 md:py-6"
            >
              <span className="hidden text-xs text-mute group-hover:text-paper/60 md:block">drwxr-xr-x</span>
              <span className="display text-4xl md:hidden">{pad(i + 1)}</span>
              <span className="hidden text-sm tabular-nums md:block">{c.period}</span>
              <span className="display text-3xl md:text-5xl">
                <span className="mr-4 hidden md:inline">{pad(i + 1)}</span>
                {c.company}
                <span className="block font-mono text-xs font-normal normal-case tracking-normal text-mute group-hover:text-paper/60 md:hidden">
                  {c.period} · {c.role}
                </span>
              </span>
              <span className="hidden text-sm md:block">{c.role}</span>
              <span
                aria-hidden
                className="text-2xl transition-transform group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
