"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/profile";
import { pad } from "@/lib/utils";

/**
 * Proyectos: en escritorio la sección se fija y el scroll vertical
 * desplaza una pista horizontal de tarjetas.
 */
export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const n = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
              const counter = root.current?.querySelector(".js-counter");
              if (counter) counter.textContent = pad(n);
            },
          },
        });

        // Cada tarjeta se "endereza" al entrar en pantalla.
        gsap.utils.toArray<HTMLElement>(".js-card").forEach((card, i) => {
          gsap.from(card, {
            rotate: i % 2 ? 3 : -3,
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 100%",
              end: "left 55%",
              scrub: true,
            },
          });
        });
      });

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>(".js-card").forEach((card) => {
          gsap.from(card, {
            y: 50,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="proyectos"
      data-path="~/enfoque"
      className="relative overflow-hidden bg-accent text-ink md:h-svh"
    >
      <div className="flex h-full flex-col pt-20 md:pt-20">
        <div className="flex items-end justify-between gap-6 px-5 pb-8 md:px-10">
          <div>
            <p className="mb-3 text-sm">$ cat ~/como-trabajo.md</p>
            <h2 className="display text-[clamp(3.5rem,11vw,11rem)]">Cómo trabajo</h2>
          </div>
          <p className="display hidden text-[clamp(2rem,5vw,5rem)] tabular-nums md:block">
            <span className="js-counter">01</span>
            <span className="outline-text">/{pad(projects.length)}</span>
          </p>
        </div>

        <div
          ref={track}
          className="flex min-h-0 flex-1 flex-col gap-6 px-5 pb-10 md:w-max md:flex-row md:items-stretch md:gap-8 md:px-10 md:pb-[6svh]"
        >
          {/* Tarjeta de introducción */}
          <div className="flex shrink-0 flex-col justify-between border-2 border-ink p-6 md:w-[min(380px,32vw)]">
            <p className="display text-[clamp(2rem,3.4vw,3.4rem)]">Lo que hago más allá de escribir código.</p>
            <p className="mt-6 text-sm leading-relaxed">
              Mi trabajo es casi todo privado, así que aquí cuento cómo lo hago. Los fragmentos de cada tarjeta son ilustrativos.
              <span className="mt-4 hidden md:block">Sigue bajando → la pista avanza sola.</span>
            </p>
          </div>

          {projects.map((p, i) => (
            <article
              key={p.name}
              className="js-card brutal-box flex shrink-0 flex-col bg-paper text-ink md:w-[min(600px,44vw)]"
            >
              {/* Cromo de ventana */}
              <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2 text-xs">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 border-2 border-ink bg-accent" />
                  <span className="size-2.5 border-2 border-ink" />
                  <span className="size-2.5 border-2 border-ink" />
                </span>
                <span className="text-mute">{p.name.toLowerCase().replace(/\s+/g, "-")}</span>
                <span className="tabular-nums">{p.year}</span>
              </div>

              {/* Editor: crece para llenar la tarjeta */}
              <pre className="flex min-h-40 flex-1 overflow-hidden bg-ink py-4 pr-4 text-[12px] leading-[1.75] text-paper/90 md:text-sm">
                <span aria-hidden className="select-none border-r border-paper/15 px-3 text-right text-paper/30">
                  {p.snippet.split("\n").map((_, n) => (
                    <span key={n} className="block">
                      {n + 1}
                    </span>
                  ))}
                </span>
                <code className="pl-4">{p.snippet}</code>
              </pre>

              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-[clamp(2.2rem,3.6vw,3.6rem)]">{p.name}</h3>
                  <span className="display outline-text text-4xl">{pad(i + 1)}</span>
                </div>
                <p className="tag text-mute">{p.kind}</p>
                <p className="text-sm leading-relaxed">{p.description}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                    {p.stack.map((s) => (
                      <li key={s} className="tag border-2 border-ink px-1.5 py-0.5">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="tag border-2 border-ink bg-ink px-3 py-1.5 font-bold text-paper transition-colors hover:bg-accent hover:text-ink"
                    >
                      Ver ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
