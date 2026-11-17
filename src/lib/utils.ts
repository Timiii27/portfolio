/** "1" → "01" */
export const pad = (n: number, size = 2) => String(n).padStart(size, "0");

/** Hash corto y determinista para simular commits de git. */
export function fakeSha(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** Formatea un número respetando los decimales del valor final. */
export function formatMetric(value: number, target: number) {
  const decimals = Number.isInteger(target) ? 0 : (String(target).split(".")[1]?.length ?? 1);
  return value.toFixed(decimals);
}
