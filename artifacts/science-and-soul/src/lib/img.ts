const base = `${import.meta.env.BASE_URL}img/`;

export function imgSrc(name: string, width: number): string {
  return `${base}${name}-${width}.webp`;
}

export function imgSrcSet(name: string, widths: number[]): string {
  return widths.map((w) => `${base}${name}-${w}.webp ${w}w`).join(", ");
}
