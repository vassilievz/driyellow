export interface TuftBladeDef {
  rotate: number;
  height: number;
  width: number;
  opacity: number;
  delay: number;
  offset: number;
}

export interface GrassTuftDef {
  id: string;
  left: string;
  bottom: string;
  scale: number;
  zIndex: number;
  blur?: number;
  blades: TuftBladeDef[];
}

export interface ThinBladeDef {
  left: string;
  bottom: string;
  height: number;
  width: number;
  rotate: number;
  opacity: number;
  delay: number;
  zIndex: number;
  variant: 'fine' | 'normal' | 'tall';
}

function hash2(a: number, b: number): [number, number] {
  const h = (Math.imul(a, 2654435761) ^ Math.imul(b, 1013904223)) >>> 0;
  return [h / 4294967296, ((h >>> 16) * 2654435761 >>> 0) / 4294967296];
}

function tuftBlades(count: number, seed: number, baseH: number): TuftBladeDef[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const centerLift = Math.sin(t * Math.PI) * 3.2;
    const spread = (t - 0.5) * 62;
    return {
      rotate: spread + (((seed + i * 17) % 11) - 5) * 0.85,
      height: baseH + centerLift + ((seed + i * 13) % 7) * 0.6,
      width: 0.3 + ((seed + i * 7) % 5) * 0.09 + (1 - Math.abs(t - 0.5) * 2) * 0.1,
      opacity: 0.48 + ((seed + i * 11) % 8) * 0.06,
      delay: ((seed + i * 5) % 14) * 0.2,
      offset: (t - 0.5) * 3.4 + (((seed + i * 23) % 100) / 100 - 0.5) * 1.2,
    };
  });
}

/** Distribuicao uniforme — preenche buracos */
function generateDenseBlades(
  count: number,
  minPct: number,
  maxPct: number,
  baseBottom: number,
  seed: number,
): ThinBladeDef[] {
  return Array.from({ length: count }, (_, i) => {
    const [u, v] = hash2(i + seed * 997, seed);
    const wobble = (hash2(i, seed + 1)[0] - 0.5) * 1.8;
    const left = minPct + u * (maxPct - minPct) + wobble;
    const height =
      6.8 +
      v * 5.5 +
      Math.sin(u * Math.PI) * 2.2 +
      ((i * 13 + seed) % 9) * 0.55;
    const variant: ThinBladeDef['variant'] =
      height > 12 ? 'tall' : height < 8.5 ? 'fine' : 'normal';

    return {
      left: `${Math.max(minPct, Math.min(maxPct, left))}%`,
      bottom: `${baseBottom + v * 0.65}vmin`,
      height,
      width: 0.11 + ((i * 11 + seed) % 7) * 0.032,
      rotate: -32 + ((i * 23 + seed * 5) % 64),
      opacity: 0.52 + ((i * 13 + seed) % 8) * 0.055,
      delay: ((i * 7 + seed) % 20) * 0.14,
      zIndex: 10 + (i % 9),
      variant,
    };
  });
}

function generateTuftGrid(count: number, seed: number): GrassTuftDef[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const left = 2 + t * 96;
    const row = i % 2;
    return {
      id: `tuft-${seed}-${i}`,
      left: `${left}%`,
      bottom: `${5.5 + row * 0.35 + (i % 4) * 0.08}vmin`,
      scale: 0.82 + (i % 5) * 0.07 + row * 0.06,
      zIndex: 8 + row * 3 + (i % 3),
      blur: i % 9 === 0 ? 0.45 : undefined,
      blades: tuftBlades(10 + (i % 5), i + seed, 5.2 + row * 0.6 + (i % 3) * 0.35),
    };
  });
}

export const GRASS_TUFTS: GrassTuftDef[] = [
  ...generateTuftGrid(16, 1),
  ...generateTuftGrid(14, 2).map((t, i) => ({
    ...t,
    id: `tuft-front-${i}`,
    bottom: `${6.2 + (i % 3) * 0.15}vmin`,
    scale: t.scale * 0.88,
    zIndex: t.zIndex + 6,
    blades: tuftBlades(9 + (i % 4), i + 50, 4.2 + (i % 2) * 0.5),
  })),
];

export const GRASS_TUFTS_MOBILE = [
  ...generateTuftGrid(10, 3),
  ...generateTuftGrid(8, 4).map((t, i) => ({
    ...t,
    id: `tuft-m-front-${i}`,
    bottom: `${6.1 + (i % 2) * 0.2}vmin`,
    scale: t.scale * 0.85,
    zIndex: t.zIndex + 5,
    blades: tuftBlades(8, i + 60, 4),
  })),
];

function buildThinLayers(density: number) {
  const m = density;
  return {
    carpetA: generateDenseBlades(Math.round(130 * m), 0, 100, 5.2, 11),
    carpetB: generateDenseBlades(Math.round(110 * m), 0, 100, 5.55, 22),
    carpetC: generateDenseBlades(Math.round(85 * m), 0, 100, 5.85, 33),
    midLift: generateDenseBlades(Math.round(55 * m), 8, 92, 6.05, 44),
    center: generateDenseBlades(Math.round(48 * m), 28, 72, 6.25, 55),
    roseBase: generateDenseBlades(Math.round(42 * m), 36, 64, 6.45, 66),
    front: generateDenseBlades(Math.round(36 * m), 32, 68, 6.55, 77),
  };
}

const DESKTOP_LAYERS = buildThinLayers(1);
const LITE_LAYERS = buildThinLayers(0.82);
const MOBILE_LAYERS = buildThinLayers(0.58);

export const GRASS_TUFTS_LITE = [
  ...generateTuftGrid(12, 1),
  ...generateTuftGrid(10, 2).map((t, i) => ({
    ...t,
    id: `tuft-lite-front-${i}`,
    bottom: `${6.2 + (i % 3) * 0.15}vmin`,
    scale: t.scale * 0.88,
    zIndex: t.zIndex + 6,
    blades: tuftBlades(9 + (i % 3), i + 80, 4.2 + (i % 2) * 0.5),
  })),
];

export const THIN_GRASS_CARPET_A = DESKTOP_LAYERS.carpetA;
export const THIN_GRASS_CARPET_B = DESKTOP_LAYERS.carpetB;
export const THIN_GRASS_CARPET_C = DESKTOP_LAYERS.carpetC;
export const THIN_GRASS_MID = DESKTOP_LAYERS.midLift;
export const THIN_GRASS_CENTER = DESKTOP_LAYERS.center;
export const THIN_GRASS_ROSE_BASE = DESKTOP_LAYERS.roseBase;
export const THIN_GRASS_FRONT = DESKTOP_LAYERS.front;

export const THIN_GRASS_CARPET_A_MOBILE = MOBILE_LAYERS.carpetA;
export const THIN_GRASS_CARPET_B_MOBILE = MOBILE_LAYERS.carpetB;
export const THIN_GRASS_CARPET_C_MOBILE = MOBILE_LAYERS.carpetC;
export const THIN_GRASS_MID_MOBILE = MOBILE_LAYERS.midLift;
export const THIN_GRASS_CENTER_MOBILE = MOBILE_LAYERS.center;
export const THIN_GRASS_ROSE_BASE_MOBILE = MOBILE_LAYERS.roseBase;
export const THIN_GRASS_FRONT_MOBILE = MOBILE_LAYERS.front;

export const THIN_GRASS_CARPET_A_LITE = LITE_LAYERS.carpetA;
export const THIN_GRASS_CARPET_B_LITE = LITE_LAYERS.carpetB;
export const THIN_GRASS_CARPET_C_LITE = LITE_LAYERS.carpetC;
export const THIN_GRASS_MID_LITE = LITE_LAYERS.midLift;
export const THIN_GRASS_CENTER_LITE = LITE_LAYERS.center;
export const THIN_GRASS_ROSE_BASE_LITE = LITE_LAYERS.roseBase;
export const THIN_GRASS_FRONT_LITE = LITE_LAYERS.front;
