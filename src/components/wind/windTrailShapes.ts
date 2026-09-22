/** Gera fitas de vento afiladas nas pontas + configs individuais */



export interface BezierCenter {

  x0: number;

  y0: number;

  x1: number;

  y1: number;

  x2: number;

  y2: number;

  x3: number;

  y3: number;

}



export interface WindTrailConfig {

  id: string;

  duration: number;

  delay: number;

  direction: 'ltr' | 'rtl';

  opacity: number;

  maxWidth: number;

  blur: number;

  morphDuration: number;

  variants: BezierCenter[];

}



function cubicPoint(t: number, b: BezierCenter): { x: number; y: number } {

  const mt = 1 - t;

  return {

    x:

      mt ** 3 * b.x0 +

      3 * mt ** 2 * t * b.x1 +

      3 * mt * t ** 2 * b.x2 +

      t ** 3 * b.x3,

    y:

      mt ** 3 * b.y0 +

      3 * mt ** 2 * t * b.y1 +

      3 * mt * t ** 2 * b.y2 +

      t ** 3 * b.y3,

  };

}



function cubicTangent(t: number, b: BezierCenter): { x: number; y: number } {

  const mt = 1 - t;

  return {

    x:

      3 * mt ** 2 * (b.x1 - b.x0) +

      6 * mt * t * (b.x2 - b.x1) +

      3 * t ** 2 * (b.x3 - b.x2),

    y:

      3 * mt ** 2 * (b.y1 - b.y0) +

      6 * mt * t * (b.y2 - b.y1) +

      3 * t ** 2 * (b.y3 - b.y2),

  };

}



/** Fita fechada com taper nas extremidades (sin²) */

export function buildTaperedRibbon(b: BezierCenter, maxWidth: number, segments = 36): string {

  const upper: Array<[number, number]> = [];

  const lower: Array<[number, number]> = [];



  for (let i = 0; i <= segments; i++) {

    const t = i / segments;

    const p = cubicPoint(t, b);

    const tan = cubicTangent(t, b);

    const len = Math.hypot(tan.x, tan.y) || 1;

    const nx = -tan.y / len;

    const ny = tan.x / len;

    const taper = Math.sin(t * Math.PI);

    const w = maxWidth * taper * taper;

    upper.push([p.x + nx * w, p.y + ny * w]);

    lower.push([p.x - nx * w, p.y - ny * w]);

  }



  const fmt = (n: number) => n.toFixed(1);

  let d = `M ${fmt(upper[0][0])} ${fmt(upper[0][1])}`;

  for (let i = 1; i < upper.length; i++) {

    d += ` L ${fmt(upper[i][0])} ${fmt(upper[i][1])}`;

  }

  for (let i = lower.length - 1; i >= 0; i--) {

    d += ` L ${fmt(lower[i][0])} ${fmt(lower[i][1])}`;

  }

  d += ' Z';

  return d;

}



function bezier(

  x0: number,

  y0: number,

  x1: number,

  y1: number,

  x2: number,

  y2: number,

  x3: number,

  y3: number,

): BezierCenter {

  return { x0, y0, x1, y1, x2, y2, x3, y3 };

}



function trio(

  y0: number,

  y1: number,

  y2: number,

  y3: number,

  spread: number,

): [BezierCenter, BezierCenter, BezierCenter] {

  const base = bezier(-80, y0, 380, y1, 920, y2, 1520, y3);

  return [

    base,

    bezier(-80, y0 + 4, 400, y1 + spread, 940, y2 - spread * 0.8, 1520, y3 + 3),

    bezier(-80, y0 - 3, 360, y1 - spread * 0.7, 900, y2 + spread, 1520, y3 - 4),

  ];

}



const DESKTOP: WindTrailConfig[] = [

  {

    id: 'w1',

    duration: 14,

    delay: 0,

    direction: 'ltr',

    opacity: 0.14,

    maxWidth: 14,

    blur: 1.2,

    morphDuration: 4.2,

    variants: trio(108, 88, 118, 102, 22),

  },

  {

    id: 'w2',

    duration: 18,

    delay: 5,

    direction: 'rtl',

    opacity: 0.11,

    maxWidth: 11,

    blur: 1,

    morphDuration: 5.5,

    variants: trio(348, 328, 362, 340, 18),

  },

  {

    id: 'w3',

    duration: 16,

    delay: 9,

    direction: 'ltr',

    opacity: 0.12,

    maxWidth: 10,

    blur: 0.9,

    morphDuration: 4.8,

    variants: trio(588, 568, 602, 578, 16),

  },

  {

    id: 'w4',

    duration: 20,

    delay: 3,

    direction: 'rtl',

    opacity: 0.1,

    maxWidth: 9,

    blur: 1.1,

    morphDuration: 6,

    variants: trio(228, 248, 218, 235, 20),

  },

];



export const WIND_TRAILS_DESKTOP = DESKTOP;



export const WIND_TRAILS_MOBILE: WindTrailConfig[] = [

  { ...DESKTOP[0], opacity: 0.12, maxWidth: 11 },

  { ...DESKTOP[2], delay: 6, opacity: 0.1, maxWidth: 9 },

  { ...DESKTOP[1], delay: 11, opacity: 0.09, maxWidth: 8, duration: 20 },

];



export const WIND_TRAILS_REDUCED: WindTrailConfig[] = [

  {

    ...DESKTOP[1],

    duration: 28,

    opacity: 0.08,

    maxWidth: 8,

    morphDuration: 10,

  },

];



export function pathsForTrail(
  trail: WindTrailConfig,
  segments = 28,
): [string, string, string] {
  return trail.variants.map((v) => buildTaperedRibbon(v, trail.maxWidth, segments)) as [
    string,
    string,
    string,
  ];
}

