/**
 * ───────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DE LA WEB VIVE AQUÍ.
 *  Cambia estos datos y la web se reconstruye sola.
 * ───────────────────────────────────────────────────────────────
 */

export type Metric = {
  /** Número que se anima al hacer scroll */
  value: number;
  /** Texto antes/después del número, p. ej. "-" o "%" */
  prefix?: string;
  suffix?: string;
  label: string;
};

/** Bloque de texto corto para destacar en qué te centras en una experiencia */
export type Pillar = { title: string; text: string };

export type Chapter = {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  /** Titular grande del capítulo (2-6 palabras funciona mejor) */
  title: string;
  summary: string;
  stack: string[];
  /** Opcional: cifras animadas. Déjalo vacío si no hay cifras que aporten. */
  metrics: Metric[];
  /** Opcional: 2-3 pilares de texto en lugar de cifras */
  pillars?: Pillar[];
  /** Se muestran como un `git log --oneline` que va apareciendo con el scroll */
  log: string[];
};

export type Project = {
  name: string;
  /** Etiqueta corta en la esquina de la tarjeta */
  year: string;
  kind: string;
  description: string;
  stack: string[];
  /** Si hay algo público que enseñar, pon el enlace; si no, déjalo vacío */
  href?: string;
  /** Fragmento ilustrativo que se ve en la tarjeta (máx. ~7 líneas) */
  snippet: string;
};

export const profile = {
  name: { first: "Tihomir", last: "Nikolov" },
  handle: "tihomir",
  role: "Full Stack Developer",
  location: "Madrid, ES",
  timezone: "Europe/Madrid",
  available: true, // pon false si no buscas proyectos
  tagline:
    "Desarrollo plataformas web de principio a fin: arquitectura, datos, interlocución directa con el cliente e inteligencia artificial aplicada con criterio.",
  stats: [
    { value: "4+", label: "años de experiencia" },
    { value: "2", label: "proyectos a mi cargo" },
    { value: "4", label: "empresas" },
    { value: "3", label: "idiomas" },
  ],
  links: {
    email: "tihomir27402@gmail.com",
    github: "https://github.com/Timiii27",
    linkedin: "https://www.linkedin.com/in/tihomirnikolaev-nikolov-a34696207",
    cv: "/cv.pdf",
  },
};

/** Cada objeto es un "capítulo": una escena a pantalla completa que se recorre con scroll. */
export const chapters: Chapter[] = [
  {
    id: "binpar",
    period: "Ene 2025 — Hoy",
    company: "BinPar",
    role: "Full Stack Developer",
    location: "Madrid · Cliente: Edelvives",
    title: "Del cliente a producción",
    summary:
      "Llevo de extremo a extremo dos proyectos del área digital de Edelvives: uno lo diseñé y construí desde su origen; del otro impulso su evolución continua. Defino la arquitectura y el modelo de datos, soy el interlocutor directo del cliente e integro la IA en el producto con criterio técnico y de negocio.",
    stack: ["Arquitectura", "Gestión de cliente", "IA multi-modelo", "TypeScript"],
    metrics: [],
    pillars: [
      { title: "Arquitectura", text: "Sistemas y modelos de datos diseñados desde su origen." },
      { title: "Cliente", text: "Interlocución directa: requisitos, prioridades y entregas." },
      { title: "IA", text: "El modelo adecuado para cada caso, con costes bajo control." },
    ],
    log: [
      "arch: decisiones técnicas, estructura y modelo de datos",
      "cliente: requisitos, estimación, prioridades y releases",
      "ia: varios modelos según la tarea, prompts y costes",
      "ia: revisión humana antes de aplicar lo que propone la IA",
      "integraciones: SSO, ERP corporativo y plataformas externas",
      "dev: funcionalidades completas con agentes de código",
    ],
  },
  {
    id: "yotramito",
    period: "Dic 2023 — Dic 2024",
    company: "YoTramito",
    role: "Full Stack Developer",
    location: "Startup · Ayudas y fondos europeos",
    title: "Ayudas públicas, sin papeleo",
    summary:
      "Plataforma para que empresas y autónomos encuentren y tramiten ayudas, subvenciones y fondos europeos de forma 100% online. Me encargué de varias funcionalidades de la parte pública y del ERP privado, y participé en las decisiones técnicas en un equipo grande.",
    stack: ["Producto", "Decisiones técnicas", "React", "Node.js"],
    metrics: [],
    pillars: [
      { title: "Web", text: "Funcionalidades de la parte pública." },
      { title: "ERP", text: "Gestión interna de expedientes." },
      { title: "Equipo", text: "Arquitectura y tecnologías, en equipo." },
    ],
    log: [
      "feat(web): funcionalidades de la parte pública",
      "feat(erp): gestión interna de expedientes",
      "arch: elección de tecnologías y estructura",
      "perf: carga de grandes volúmenes de datos",
      "process: Git, code review y Scrum",
    ],
  },
  {
    id: "logixs",
    period: "Jun — Oct 2023",
    company: "Logixs",
    role: "Full Stack Developer",
    location: "Madrid",
    title: "Backend serverless en AWS",
    summary:
      "Funcionalidades de backend serverless con AWS Lambda y API Gateway, interfaces en React y procesos en Node.js, con buenas prácticas de Git y code review.",
    stack: ["AWS Lambda", "API Gateway", "React", "Node.js"],
    metrics: [],
    log: [
      "feat(api): funciones Lambda tras API Gateway",
      "feat(ui): interfaces en React y Material UI",
      "refactor(node): procesos de backend más rápidos",
      "process: ramas, historial limpio y code review",
    ],
  },
  {
    id: "tks",
    period: "Jun 2022 — Jun 2023",
    company: "TKS Group",
    role: "Full Stack Developer",
    location: "Sector automoción",
    title: "Mis primeras líneas en producción",
    summary:
      "Aplicación web de uso extendido en el sector de la automoción. Aquí aprendí a manejar grandes volúmenes de datos sin que la interfaz se resienta y a cuidar el código limpio.",
    stack: ["React", "Tailwind", "REST APIs"],
    metrics: [],
    log: [
      "feat: aplicación web para el sector de automoción",
      "perf: carga eficiente de grandes volúmenes de datos",
      "style: código limpio y buenas prácticas",
      "init: primer commit en producción",
    ],
  },
];

/**
 * Sección «Cómo trabajo»: tarjetas sobre tu forma de trabajar.
 * Los fragmentos son ilustrativos, no código real.
 */
export const projects: Project[] = [
  {
    name: "Arquitectura y datos",
    year: "decisiones",
    kind: "Estructura antes que código",
    description:
      "Diseño el sistema y la base de datos pensando en lo que vendrá: permisos, integraciones y cómo va a crecer. Prefiero una buena estructura a muchas líneas.",
    stack: ["Modelado de datos", "Integraciones", "SSO"],
    snippet: `# decisiones.md
- Un único origen de verdad para usuarios y permisos
- Integraciones con contratos claros
- Escala por diseño, no por parches`,
  },
  {
    name: "Cliente y gestión",
    year: "cliente",
    kind: "Sin intermediarios",
    description:
      "Hablo directamente con el cliente: entiendo el problema, propongo la solución, estimo, priorizo y explico qué sale en cada versión.",
    stack: ["Requisitos", "Estimación", "Releases"],
    snippet: `reunión → requisitos
requisitos → propuesta + estimación
propuesta → prioridad acordada
desarrollo → release notes al cliente`,
  },
  {
    name: "IA en el producto",
    year: "multi-modelo",
    kind: "El modelo adecuado para cada tarea",
    description:
      "Elijo el modelo según la tarea, mantengo los prompts fuera del código, controlo el coste y dejo la última palabra a una persona.",
    stack: ["Varios modelos", "Prompts", "Costes"],
    snippet: `ia:
  modelo: por tarea
  prompts: fuera del código
  coste: medido por uso y rol
  decisión final: humana`,
  },
  {
    name: "Desarrollo con IA",
    year: "agentes",
    kind: "Desarrollo de punta a punta",
    description:
      "Me apoyo en agentes de código y herramientas conectadas a nuestros sistemas para entregar funcionalidades completas en menos tiempo, sin renunciar a la revisión ni a la calidad.",
    stack: ["Agentes de código", "MCP", "Revisión"],
    snippet: `$ plan  → tareas pequeñas
$ agente → implementa y prueba
$ yo     → reviso y decido
$ deploy`,
  },
];

/** Se muestra como un JSON gigante. Sin niveles: si aparece aquí, es que lo tienes. */
export const stack: Record<string, string[]> = {
  gestion: ["Trato directo con cliente", "Requisitos y estimación", "Priorización y releases"],
  arquitectura: ["Diseño de sistemas", "Modelado de bases de datos", "Integraciones y SSO"],
  ia: ["Varios modelos según la tarea", "Prompts y control de costes", "Desarrollo con agentes"],
  tecnologia: ["TypeScript", "React · Next.js", "Node.js · Directus", "SQL · AWS"],
};
