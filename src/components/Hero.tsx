"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { scrollToTarget } from "./SmoothScroll";

const TERMINAL: { cmd: string; out: string }[] = [
  { cmd: "whoami", out: `${profile.name.first.toLowerCase()} — ${profile.role.toLowerCase()}` },
  {
    cmd: "cat ./estado",
    out: `${profile.location} · ${profile.available ? "disponible para proyectos" : "no disponible ahora mismo"}`,
  },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) Arranque: la terminal "teclea" y el nombre sube.
        const typed = SplitText.create(".js-type", { type: "chars" });
        const intro = gsap.timeline({ delay: 0.2 });
        intro
          .from(".js-term", { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut" })
          .from(typed.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.022 }, "-=0.1")
          .from(
            ".js-name-line",
            { yPercent: 105, duration: 1.1, stagger: 0.12, ease: "power4.out" },
            0.35,
          )
          .from(".js-hero-foot > *", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.9);

        return () => typed.revert();
      });

      // 2) Al hacer scroll, el nombre se abre hacia los lados y la terminal se va.
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        tl.to(".js-name-a", { xPercent: -18, ease: "none" }, 0)
          .to(".js-name-b", { xPercent: 14, ease: "none" }, 0)
          .to(".js-term", { yPercent: -60, autoAlpha: 0, ease: "none" }, 0)
          .to(".js-hero-foot", { yPercent: 40, autoAlpha: 0, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-path="~"
      className="grid-bg relative flex min-h-svh flex-col overflow-hidden px-5 pb-6 pt-20 md:px-10 md:pt-24"
    >
      {/* Terminal */}
      <div className="js-term brutal-box w-full max-w-xl bg-ink p-4 text-[13px] leading-relaxed text-paper md:p-5 md:text-sm">
        <div className="mb-3 flex items-center gap-2 border-b border-paper/20 pb-3 text-[11px] text-paper/60">
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="size-2.5 rounded-full bg-paper/30" />
          <span className="size-2.5 rounded-full bg-paper/30" />
          <span className="ml-2">zsh — 80×24</span>
        </div>
        {TERMINAL.map((line) => (
          <div key={line.cmd} className="js-type">
            <p>
              <span className="text-accent">$</span> {line.cmd}
            </p>
            <p className="text-paper/70">{line.out}</p>
          </div>
        ))}
        <p className="caret">
          <span className="text-accent">$</span> ./empezar-viaje --scroll
        </p>
      </div>

      {/* Nombre gigante */}
      <h1 className="display my-auto py-10 text-[clamp(4.5rem,19vw,22rem)]" aria-label={`${profile.name.first} ${profile.name.last}`}>
        <span className="line-mask block">
          <span className="js-name-line js-name-a block">{profile.name.first}</span>
        </span>
        <span className="line-mask block">
          <span className="js-name-line js-name-b block text-right md:pr-[4vw]">
            <span className="outline-text">{profile.name.last}</span>
          </span>
        </span>
      </h1>

      {/* Pie del hero */}
      <div className="js-hero-foot grid gap-6 border-t-2 border-ink pt-5 md:grid-cols-12 md:gap-10">
        <p className="text-sm leading-relaxed md:col-span-5 md:text-[15px]">
          <span className="tag mb-2 block bg-ink px-2 py-1 text-paper w-max">{profile.role}</span>
          {profile.tagline}
        </p>

        <dl className="grid grid-cols-4 border-2 border-ink md:col-span-5">
          {profile.stats.map((s) => (
            <div key={s.label} className="border-r-2 border-ink p-3 last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-3xl md:text-5xl">{s.value}</dd>
              <dd className="tag mt-1 text-[10px] leading-tight text-mute">{s.label}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => scrollToTarget("#experiencia")}
          className="tag flex items-end justify-between gap-3 border-2 border-ink bg-accent px-4 py-3 font-bold transition-transform hover:-translate-y-1 md:col-span-2 md:flex-col md:items-start"
        >
          <span>Scroll para entrar</span>
          <span aria-hidden className="text-2xl leading-none">↓</span>
        </button>
      </div>
    </section>
  );
}
