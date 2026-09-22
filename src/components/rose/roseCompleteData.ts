/** Geometria da rosa — formas orgânicas com leve assimetria */

export interface PetalDef {
  id: string;
  d: string;
  angle: number;
  opacity: number;
  scaleY: number;
}

export interface LeafDef {
  id: string;
  d: string;
  x: number;
  y: number;
  angle: number;
  layer: 'back' | 'front';
}

export const STEM_PATH =
  'M 360 698 C 359 640 361 580 360 530 C 358 480 378 430 358 400 C 354 378 360 355 L 360 322';

/** Pétala com curvas mais suaves e assimétricas */
export function petalD(scale: number, wide = 1, seed = 0): string {
  const w = 36 * scale * wide;
  const h = 58 * scale;
  const s = seed * 0.035;
  const tip = (-h * (0.86 + s)).toFixed(1);
  const wobble = (n: number) => (n + s * 10).toFixed(1);

  return [
    `M 0 ${wobble(4)}`,
    `C ${wobble(-w * 0.14)} ${wobble(h * 0.08)} ${wobble(-w * 0.48)} ${wobble(-h * 0.12)} ${wobble(-w * 0.4)} ${wobble(-h * 0.34)}`,
    `C ${wobble(-w * 0.28)} ${wobble(-h * 0.58)} ${wobble(-w * 0.06)} ${wobble(-h * 0.8)} 0 ${tip}`,
    `C ${wobble(w * 0.1)} ${wobble(-h * 0.78)} ${wobble(w * 0.34)} ${wobble(-h * 0.56)} ${wobble(w * 0.42)} ${wobble(-h * 0.32)}`,
    `C ${wobble(w * 0.5)} ${wobble(-h * 0.1)} ${wobble(w * 0.16)} ${wobble(h * 0.1)} 0 ${wobble(4)}`,
    'Z',
  ].join(' ');
}

export function leafD(scale: number): string {
  const w = 28 * scale;
  const h = 52 * scale;
  return [
    `M 0 4`,
    `C ${(-w * 0.36).toFixed(1)} ${(-h * 0.06).toFixed(1)} ${(-w * 0.58).toFixed(1)} ${(-h * 0.36).toFixed(1)} ${(-w * 0.38).toFixed(1)} ${(-h * 0.66).toFixed(1)}`,
    `C ${(-w * 0.18).toFixed(1)} ${(-h * 0.86).toFixed(1)} 0 ${(-h).toFixed(1)} 0 ${(-h).toFixed(1)}`,
    `C 0 ${(-h).toFixed(1)} ${(w * 0.16).toFixed(1)} ${(-h * 0.84).toFixed(1)} ${(w * 0.34).toFixed(1)} ${(-h * 0.6).toFixed(1)}`,
    `C ${(w * 0.54).toFixed(1)} ${(-h * 0.32).toFixed(1)} ${(w * 0.38).toFixed(1)} ${(-h * 0.04).toFixed(1)} 0 4`,
    'Z',
  ].join(' ');
}

function mkPetal(
  id: string,
  angle: number,
  scale: number,
  wide: number,
  seed: number,
  angleJitter: number,
): PetalDef {
  return {
    id,
    d: petalD(scale, wide, seed),
    angle: angle + angleJitter,
    opacity: 0.88 + (seed % 5) * 0.025,
    scaleY: 0.96 + (seed % 4) * 0.02,
  };
}

const OUTER_SPECS = [
  { a: -108, s: 2.38, w: 1.14, j: -3, seed: 1 },
  { a: -78, s: 2.32, w: 1.12, j: 2, seed: 2 },
  { a: -48, s: 2.4, w: 1.16, j: -2, seed: 3 },
  { a: -18, s: 2.34, w: 1.1, j: 4, seed: 4 },
  { a: 12, s: 2.36, w: 1.13, j: -4, seed: 5 },
  { a: 42, s: 2.28, w: 1.08, j: 3, seed: 6 },
  { a: 72, s: 1.88, w: 1.0, j: -2, seed: 7 },
  { a: 102, s: 1.82, w: 0.98, j: 5, seed: 8 },
  { a: 132, s: 1.78, w: 0.96, j: -3, seed: 9 },
  { a: 162, s: 1.74, w: 0.94, j: 2, seed: 10 },
  { a: 192, s: 1.7, w: 0.92, j: -1, seed: 11 },
  { a: 222, s: 1.66, w: 0.9, j: 4, seed: 12 },
];

export const OUTER_PETALS_A = OUTER_SPECS.slice(0, 6).map((p, i) =>
  mkPetal(`out-a-${i}`, p.a, p.s, p.w, p.seed, p.j),
);

export const OUTER_PETALS_B = OUTER_SPECS.slice(6).map((p, i) =>
  mkPetal(`out-b-${i}`, p.a, p.s, p.w, p.seed, p.j),
);

const MID_SPECS = [
  { a: -112, s: 1.62, w: 1.02, j: -2, seed: 13 },
  { a: -82, s: 1.58, w: 1.0, j: 3, seed: 14 },
  { a: -52, s: 1.65, w: 1.04, j: -3, seed: 15 },
  { a: -22, s: 1.6, w: 1.01, j: 2, seed: 16 },
  { a: 8, s: 1.55, w: 0.98, j: -4, seed: 17 },
  { a: 38, s: 1.62, w: 1.03, j: 1, seed: 18 },
  { a: 68, s: 1.57, w: 0.99, j: -2, seed: 19 },
  { a: 98, s: 1.52, w: 0.97, j: 3, seed: 20 },
  { a: 128, s: 1.48, w: 0.95, j: -1, seed: 21 },
  { a: 158, s: 1.44, w: 0.93, j: 2, seed: 22 },
];

export const MID_PETALS = MID_SPECS.map((p, i) =>
  mkPetal(`mid-${i}`, p.a, p.s, p.w, p.seed, p.j),
);

const INNER_SPECS = [
  { a: -106, s: 1.08, w: 0.94, j: -2, seed: 23 },
  { a: -82, s: 1.04, w: 0.92, j: 2, seed: 24 },
  { a: -58, s: 1.1, w: 0.95, j: -1, seed: 25 },
  { a: -34, s: 1.06, w: 0.93, j: 3, seed: 26 },
  { a: -10, s: 1.02, w: 0.91, j: -3, seed: 27 },
  { a: 14, s: 1.08, w: 0.94, j: 1, seed: 28 },
  { a: 38, s: 1.04, w: 0.92, j: -2, seed: 29 },
  { a: 62, s: 1.0, w: 0.9, j: 2, seed: 30 },
  { a: 86, s: 0.96, w: 0.88, j: -1, seed: 31 },
  { a: 110, s: 0.92, w: 0.86, j: 3, seed: 32 },
  { a: 134, s: 0.88, w: 0.84, j: -2, seed: 33 },
  { a: 158, s: 0.84, w: 0.82, j: 1, seed: 34 },
];

export const INNER_PETALS = INNER_SPECS.map((p, i) =>
  mkPetal(`in-${i}`, p.a, p.s, p.w, p.seed, p.j),
);

const CENTER_SPECS = [
  { a: -96, s: 0.62, w: 0.86, j: -2, seed: 35 },
  { a: -66, s: 0.58, w: 0.84, j: 2, seed: 36 },
  { a: -36, s: 0.64, w: 0.87, j: -1, seed: 37 },
  { a: -6, s: 0.6, w: 0.85, j: 3, seed: 38 },
  { a: 24, s: 0.56, w: 0.83, j: -2, seed: 39 },
  { a: 54, s: 0.6, w: 0.85, j: 1, seed: 40 },
  { a: 84, s: 0.56, w: 0.83, j: -3, seed: 41 },
  { a: 114, s: 0.52, w: 0.81, j: 2, seed: 42 },
];

export const CENTER_PETALS = CENTER_SPECS.map((p, i) =>
  mkPetal(`cen-${i}`, p.a, p.s, p.w, p.seed, p.j),
);

export const LEAVES: LeafDef[] = [
  { id: 'lb1', d: leafD(0.88), x: 360, y: 398, angle: -58, layer: 'back' },
  { id: 'lb2', d: leafD(0.92), x: 360, y: 428, angle: 62, layer: 'back' },
  { id: 'lb3', d: leafD(0.8), x: 360, y: 458, angle: -54, layer: 'back' },
  { id: 'lb4', d: leafD(0.76), x: 360, y: 488, angle: 56, layer: 'back' },
];

export const DEW_DROPS = [
  { cx: -58, cy: -16, r: 2.2 },
  { cx: 48, cy: -4, r: 1.8 },
  { cx: -14, cy: 32, r: 1.5 },
];
