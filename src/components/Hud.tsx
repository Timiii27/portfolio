"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { scrollToTarget } from "./SmoothScroll";

const NAV = [
  { label: "experiencia", href: "#experiencia" },
  { label: "enfoque", href: "#proyectos" },
  { label: "skills", href: "#stack" },
  { label: "contacto", href: "#contacto" },
];

/** Barra fija tipo prompt de terminal: ruta actual, navegación, % de scroll y hora local. */
export default function Hud() {
  const pathRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const p = self.progress;
        if (pctRef.current) pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      },
    });

    document.querySelectorAll<HTMLElement>("[data-path]").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive && pathRef.current) pathRef.current.textContent = el.dataset.path ?? "~";
        },
      });
    });

    // Recalcula posiciones una vez cargadas las fuentes (cambian alturas).
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return (
    <>
      {/* Barra sólida: nunca se mezcla con el contenido que pasa por debajo */}
      <header className="fixed inset-x-0 top-0 z-50 h-12 bg-ink text-paper">
        <div className="flex h-full items-center justify-between gap-4 px-5 text-xs md:px-10 md:text-[13px]">
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="min-w-0 truncate text-left hover:text-accent"
            aria-label="Volver al inicio"
          >
            <span className="font-bold">
              {profile.handle}@dev
            </span>
            :<span ref={pathRef}>~</span>$
          </button>

          <nav aria-label="Principal" className="hidden gap-6 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(item.href);
                }}
                className="transition-colors hover:text-accent"
              >
                ./{item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4 tabular-nums">
            <span ref={pctRef} aria-hidden>
              000%
            </span>
            <span className="hidden sm:inline" aria-label="Hora local">
              {time}
            </span>
          </div>
        </div>
        {/* Progreso de scroll en el borde inferior de la barra */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-paper/10" aria-hidden>
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </header>
    </>
  );
}
