"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import type { Chapter as ChapterT } from "@/data/profile";
import { fakeSha, formatMetric, pad } from "@/lib/utils";

type Props = {
  chapter: ChapterT;
  index: number;
  total: number;
  next?: ChapterT;
};

/**
 * Un capítulo = una escena a pantalla completa.
 * En escritorio la escena se queda fija (sticky) durante ~4 pantallas de scroll
 * y una línea de tiempo de GSAP (scrub) va construyendo el contenido.
 * En móvil cae a un flujo normal con revelados sencillos.
 */
export default function Chapter({ chapter: c, index, total, next }: Props) {
  const root = useRef<HTMLElement>(null);
  const dark = index % 2 === 0;
  const num = pad(index + 1);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".js-count");
      const setCounters = (p: number) =>
        counters.forEach((el) => {
          const target = Number(el.dataset.target);
          el.textContent = formatMetric(target * p, target);
        });

      const mm = gsap.matchMedia();

      // ── Escritorio: escena fija con línea de tiempo atada al scroll ──
      mm.add(MQ.desktop, () => {
        const title = SplitText.create(".js-title", { type: "lines", mask: "lines" });
        setCounters(0);
        const count = { p: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root.current,
            // Empieza a construirse mientras la escena aún está entrando.
            start: "top 60%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        tl
          // Entrada
          .from(".js-rule", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "power2.inOut" }, 0)
          .from(".js-meta", { autoAlpha: 0, y: -12, stagger: 0.1, duration: 0.6 }, 0.1)
          .from(".js-bignum", { yPercent: 35, autoAlpha: 0, duration: 1.4 }, 0)
          .from(".js-company", { autoAlpha: 0, x: -20, duration: 0.6 }, 0.3)
          .from(title.lines, { yPercent: 110, stagger: 0.15, duration: 1 }, 0.35)
          .from(".js-summary", { autoAlpha: 0, y: 24, duration: 0.8 }, 1.1)
          // Datos: las cajas se "abren" y luego entra su contenido
          .from(".js-box", { clipPath: "inset(0 100% 0 0)", stagger: 0.3, duration: 0.8, ease: "power3.inOut" }, 1.2)
          .from(".js-metric", { autoAlpha: 0, y: 40, stagger: 0.15, duration: 0.8 }, 1.5)
          .to(count, { p: 1, duration: 1.2, ease: "power2.out", onUpdate: () => setCounters(count.p) }, 1.6)
          .from(".js-tag", { autoAlpha: 0, y: -24, rotate: () => gsap.utils.random(-8, 8), stagger: 0.06, duration: 0.5 }, 2.2)
          // Log de commits, línea a línea
          .from(".js-logline", { autoAlpha: 0, x: -16, stagger: 0.28, duration: 0.4 }, 2.6)
          .from(".js-next", { autoAlpha: 0, duration: 0.5 }, 4)
          // Pausa para leer
          .to({}, { duration: 1.2 })
          // Salida: la escena se aleja antes de dar paso al siguiente capítulo
          .to(".js-content", { scale: 0.94, autoAlpha: 0.2, duration: 0.9, ease: "power2.in" });

        // Elementos continuos (de principio a fin)
        const len = tl.duration();
        tl.fromTo(".js-progress", { scaleX: 0 }, { scaleX: 1, duration: len, ease: "none" }, 0);
        tl.to(".js-bignum-inner", { xPercent: -12, duration: len, ease: "none" }, 0);

        return () => {
          title.revert();
          setCounters(1);
        };
      });

      // ── Móvil: revelados simples al entrar en pantalla ──
      mm.add(MQ.mobile, () => {
        setCounters(0);
        const count = { p: 0 };
        gsap.from(".js-company, .js-title, .js-summary", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".js-metric, .js-tag, .js-logline", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.04,
          duration: 0.5,
          scrollTrigger: { trigger: ".js-data", start: "top 85%" },
        });
        gsap.to(count, {
          p: 1,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => setCounters(count.p),
          scrollTrigger: { trigger: ".js-data", start: "top 85%" },
        });
        return () => setCounters(1);
      });
    },
    { scope: root },
  );

  const theme = dark ? "bg-ink text-paper" : "bg-paper text-ink";
  const subtle = dark ? "text-paper/60" : "text-mute";
  const line = dark ? "border-paper" : "border-ink";

  return (
    <section
      ref={root}
      id={`cap-${c.id}`}
      data-path={`~/experiencia/${num}-${c.id}`}
      aria-labelledby={`t-${c.id}`}
      className={`relative md:h-[360vh] ${theme}`}
    >
      <div className={`grid-bg relative overflow-hidden md:sticky md:top-0 md:h-svh ${theme}`}>
        {/* Número gigante de fondo */}
        <div
          aria-hidden
          className={`js-bignum pointer-events-none absolute -bottom-[0.12em] right-0 z-0 hidden select-none md:block ${
            dark ? "[--stroke:var(--color-paper)]" : ""
          }`}
        >
          <span className="js-bignum-inner display outline-text block text-[40vw] opacity-25">{num}</span>
        </div>

        <div className="js-content relative z-10 flex h-full flex-col px-5 pb-6 pt-20 md:px-10 md:pt-20">
          {/* Cabecera del capítulo */}
          <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pb-3 text-xs md:text-[13px]">
            <span className="js-meta tag font-bold">
              <span className="bg-accent px-1.5 py-0.5 text-ink">Cap. {num}</span> / {pad(total)}
            </span>
            <span className="js-meta tabular-nums">{c.period}</span>
            <span className={`js-meta hidden md:inline ${subtle}`}>{c.location}</span>
            <span aria-hidden className={`js-rule absolute inset-x-0 bottom-0 h-[2px] ${dark ? "bg-paper" : "bg-ink"}`} />
          </div>

          <div className="grid min-h-0 flex-1 gap-8 pt-8 md:grid-cols-12 md:content-center md:gap-10 md:pt-0">
            {/* Columna de relato */}
            <div className="flex flex-col md:col-span-7">
              <p className="js-company text-sm md:text-base">
                <span className="text-accent">@</span>
                <span className="font-bold">{c.company}</span>
                <span className={subtle}> — {c.role}</span>
              </p>
              <h2
                id={`t-${c.id}`}
                className="js-title display mt-4 text-[clamp(3.2rem,min(9.4vw,17svh),11rem)]"
                // Más interlineado para que la máscara de líneas no corte las tildes.
                style={{ lineHeight: 0.98 }}
              >
                {c.title}
              </h2>
              <p className={`js-summary mt-6 max-w-xl text-sm leading-relaxed md:text-[15px] ${dark ? "text-paper/85" : ""}`}>
                {c.summary}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack usado">
                {c.stack.map((s) => (
                  <li key={s} className={`js-tag tag border-2 px-2 py-1 ${line}`}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna de datos */}
            <div className="js-data flex flex-col gap-6 md:col-span-5 md:justify-center">
              {c.metrics.length > 0 && (
              <dl className={`js-box grid grid-cols-3 border-2 ${line} ${dark ? "bg-ink" : "bg-paper"}`}>
                {c.metrics.map((m) => (
                  <div key={m.label} className={`js-metric flex flex-col-reverse justify-end border-r-2 p-3 last:border-r-0 md:p-4 ${line}`}>
                    <dt className={`tag mt-2 text-[10px] leading-tight ${subtle}`}>{m.label}</dt>
                    <dd className="display text-[clamp(2rem,4vw,4.2rem)] tabular-nums">
                      {m.prefix}
                      <span className="js-count" data-target={m.value}>
                        {m.value}
                      </span>
                      {m.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
              )}

              {c.pillars && c.pillars.length > 0 && (
                <ul
                  className={`js-box grid border-2 ${line} ${dark ? "bg-ink" : "bg-paper"}`}
                  style={{ gridTemplateColumns: `repeat(${c.pillars.length}, minmax(0, 1fr))` }}
                  aria-label="En qué me centro"
                >
                  {c.pillars.map((p) => (
                    <li key={p.title} className={`js-metric border-r-2 p-3 last:border-r-0 md:p-4 ${line}`}>
                      <p className="display text-[clamp(1.4rem,2.3vw,2.4rem)]">{p.title}</p>
                      <p className={`mt-2 text-[11px] leading-snug md:text-xs ${subtle}`}>{p.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              <div
                className={`js-box border-2 p-4 text-[12px] leading-[1.9] md:text-[13px] ${line} ${
                  dark ? "bg-paper text-ink" : "bg-ink text-paper"
                }`}
              >
                <p className="mb-1 opacity-60">$ git log --oneline</p>
                <ol>
                  {c.log.map((entry) => (
                    <li key={entry} className="js-logline truncate">
                      <span className="text-accent">{fakeSha(c.id + entry)}</span> {entry}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Pie: progreso del capítulo */}
          <div className="mt-8 hidden items-center gap-4 text-xs md:flex">
            <span className="tag shrink-0">{num}</span>
            <div className={`relative h-[2px] flex-1 ${dark ? "bg-paper/20" : "bg-ink/15"}`}>
              <div className="js-progress absolute inset-0 origin-left bg-accent" />
            </div>
            <span className={`js-next tag shrink-0 ${subtle}`}>
              {next ? `Siguiente → ${next.title}` : "Siguiente → Proyectos"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
