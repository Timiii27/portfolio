"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, stack } from "@/data/profile";

/** Skills presentadas como un JSON gigante + cinta de habilidades. Sin niveles: si está, es que lo tengo. */
export default function Stack() {
  const root = useRef<HTMLElement>(null);
  const allSkills = Object.values(stack).flat();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".js-group").forEach((group) => {
          gsap.from(group.querySelectorAll(".js-dep"), {
            autoAlpha: 0,
            x: -20,
            stagger: 0.06,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 80%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stack" data-path="~/skills" className="grid-bg relative bg-paper text-ink">
      <div className="grid gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <p className="mb-3 text-sm">$ cat skills.json</p>
            <h2 className="display text-[clamp(4rem,10vw,10rem)]">Skills</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Más que una lista de tecnologías: lo que aporto a un equipo.
            </p>
          </div>
        </div>

        <div className="brutal-box bg-paper p-5 text-[13px] leading-[2] md:col-span-8 md:p-8 md:text-[15px]">
          <p>{"{"}</p>
          <p className="pl-5">
            <span className="text-mute">&quot;name&quot;</span>: &quot;{profile.handle}&quot;,
          </p>
          <p className="pl-5">
            <span className="text-mute">&quot;role&quot;</span>: &quot;{profile.role.toLowerCase()}&quot;,
          </p>

          {Object.entries(stack).map(([group, items], gi, arr) => (
            <div key={group} className="js-group pl-5">
              <p className="mt-3 font-bold">
                &quot;{group}&quot;: [
              </p>
              <ul className="pl-5">
                {items.map((skill, i) => (
                  <li
                    key={skill}
                    className="js-dep flex items-center gap-3 border-b border-dashed border-ink/20 px-1 transition-colors hover:bg-ink hover:text-paper"
                  >
                    <span aria-hidden className="inline-block size-2 shrink-0 bg-accent" />
                    <span>
                      &quot;{skill}&quot;
                      {i < items.length - 1 ? "," : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                ]{gi < arr.length - 1 ? "," : ""}
              </p>
            </div>
          ))}

          <p>{"}"}</p>
        </div>
      </div>

      {/* Cinta infinita */}
      <div className="overflow-hidden border-y-2 border-ink bg-ink py-4 text-paper" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...allSkills, ...allSkills].map((t, i) => (
            <span key={i} className="display flex items-center gap-10 text-5xl md:text-7xl">
              {t}
              <span className="text-accent">✱</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
