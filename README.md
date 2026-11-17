# Portfolio — scroll por capítulos

Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP (ScrollTrigger + SplitText) · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # producción
```

Despliegue: sube el repo a GitHub e impórtalo en Vercel (sin configuración extra).

## Dónde cambiar cosas

| Quiero cambiar…                         | Archivo                              |
| --------------------------------------- | ------------------------------------ |
| Nombre, textos, experiencias, proyectos, stack, enlaces | `src/data/profile.ts` (todo lo marcado `// TODO`) |
| Colores y tipografías                   | `src/app/globals.css` → bloque `@theme` |
| Animación de cada capítulo              | `src/components/Chapter.tsx` (línea de tiempo `tl`) |
| Duración del scroll de cada capítulo    | `Chapter.tsx` → clase `md:h-[360vh]` (más vh = más lento) |
| Orden de las secciones                  | `src/app/page.tsx`                   |

Añadir o quitar un capítulo es solo añadir/quitar un objeto en `chapters` dentro de `profile.ts`.
Los capítulos alternan fondo negro/claro automáticamente.

## Estructura

```
src/
  app/            layout, página y estilos globales
  components/
    Hero          terminal que "teclea" + nombre gigante
    ChapterIndex  índice tipo `ls -la` que salta a cada capítulo
    Chapter       escena fija (sticky) que se construye con el scroll
    Projects      pista horizontal fijada (pin) con tarjetas de proyecto
    Stack         package.json gigante + cinta de tecnologías
    Contact       CTA, copiar email y enlaces
    Hud           barra fija: ruta actual, navegación, % de scroll y hora
    SmoothScroll  Lenis sincronizado con ScrollTrigger
  data/profile.ts TODO el contenido
  lib/            registro de GSAP y utilidades
```

## Accesibilidad y móvil

- Con `prefers-reduced-motion` no hay scroll suave ni animaciones: todo se ve estático.
- En móvil (<768px) los capítulos no se fijan: se leen en flujo normal con revelados sencillos.
