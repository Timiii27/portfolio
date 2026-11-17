"use client";

import { useRef, useState } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { scrollToTarget } from "./SmoothScroll";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const split = SplitText.create(".js-cta", { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 110,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "top 15%", scrub: 0.5 },
        });
        return () => split.revert();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".js-link", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".js-links", start: "top 90%" },
        });
      });
    },
    { scope: root },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.links.email}`;
    }
  };

  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "CV (PDF)", href: profile.links.cv },
  ];

  return (
    <section
      ref={root}
      id="contacto"
      data-path="~/contacto"
      className="grid-bg relative flex min-h-svh flex-col bg-ink px-5 pb-6 pt-24 text-paper md:px-10 md:pt-32"
    >
      <p className="mb-6 text-sm">
        <span className="text-accent">$</span> git commit -m &quot;empezar algo juntos&quot;
      </p>

      <h2 className="js-cta display text-[clamp(4.5rem,17vw,19rem)] leading-none">¿Hablamos?</h2>

      <div className="mt-10 flex flex-col gap-4 md:mt-14 md:flex-row md:items-center">
        <a
          href={`mailto:${profile.links.email}`}
          className="display break-all text-[clamp(1.8rem,5vw,5rem)] underline decoration-2 underline-offset-[0.15em] transition-colors hover:text-accent"
        >
          {profile.links.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="tag w-max border-2 border-paper px-3 py-2 transition-colors hover:bg-paper hover:text-ink"
          aria-live="polite"
        >
          {copied ? "Copiado ✓" : "Copiar"}
        </button>
      </div>

      {profile.available && (
        <p className="tag mt-6 flex items-center gap-2">
          <span className="size-2.5 animate-pulse bg-accent motion-reduce:animate-none" />
          Disponible para nuevos proyectos
        </p>
      )}

      <ul className="js-links mt-14 grid gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <li key={l.label} className="js-link">
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-2 border-paper px-5 py-5 transition-colors hover:bg-accent hover:text-ink"
            >
              <span className="display text-3xl md:text-4xl">{l.label}</span>
              <span aria-hidden className="text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t-2 border-paper pt-5 text-xs text-paper/70">
        <span>
          © {new Date().getFullYear()} {profile.name.first} {profile.name.last}
        </span>
        <span>Next.js · GSAP · Lenis · Tailwind</span>
        <button type="button" onClick={() => scrollToTarget(0)} className="hover:text-accent">
          cd ~ ↑
        </button>
      </footer>
    </section>
  );
}
