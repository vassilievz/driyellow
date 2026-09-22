import { memo, useId } from 'react';

import {

  COLORS,

  FLOWER_ORIGIN,

  FLOWER_TILT,

  VIEW_BOX,

} from './roseConfig';

import {

  CENTER_PETALS,

  DEW_DROPS,

  INNER_PETALS,

  LEAVES,

  MID_PETALS,

  OUTER_PETALS_A,

  OUTER_PETALS_B,

  STEM_PATH,

  type PetalDef,

  type LeafDef,

} from './roseCompleteData';



const flowerTransform = `translate(${FLOWER_ORIGIN.x}, ${FLOWER_ORIGIN.y}) rotate(${FLOWER_TILT})`;



export const YellowRoseComplete = memo(function YellowRoseComplete() {

  const gradId = useId().replace(/:/g, '');



  return (

    <svg

      viewBox={`0 0 ${VIEW_BOX.w} ${VIEW_BOX.h}`}

      className="rose-render block h-full w-full"

      aria-hidden="true"

      preserveAspectRatio="xMidYMid slice"

    >

      <defs>

        <linearGradient id={`${gradId}-pn`} x1="18%" y1="2%" x2="82%" y2="98%">

          <stop offset="0%" stopColor="#FFF4C8" />

          <stop offset="35%" stopColor={COLORS.light} />

          <stop offset="68%" stopColor={COLORS.main} />

          <stop offset="100%" stopColor={COLORS.shadow} />

        </linearGradient>

        <linearGradient id={`${gradId}-pf`} x1="70%" y1="0%" x2="30%" y2="100%">

          <stop offset="0%" stopColor={COLORS.light} />

          <stop offset="55%" stopColor={COLORS.main} />

          <stop offset="100%" stopColor={COLORS.deep} />

        </linearGradient>

        <linearGradient id={`${gradId}-pi`} x1="35%" y1="0%" x2="65%" y2="100%">

          <stop offset="0%" stopColor="#FFF8E8" />

          <stop offset="45%" stopColor={COLORS.light} />

          <stop offset="100%" stopColor={COLORS.shadow} />

        </linearGradient>

        <radialGradient id={`${gradId}-center`} cx="45%" cy="40%" r="55%">

          <stop offset="0%" stopColor="#FFF0C0" />

          <stop offset="45%" stopColor={COLORS.main} />

          <stop offset="100%" stopColor={COLORS.centerDark} />

        </radialGradient>

        <linearGradient id={`${gradId}-stem`} x1="0%" y1="0%" x2="100%" y2="0%">

          <stop offset="0%" stopColor={COLORS.stemDark} />

          <stop offset="38%" stopColor={COLORS.stemLight} />

          <stop offset="100%" stopColor={COLORS.stemDark} />

        </linearGradient>

        <linearGradient id={`${gradId}-leaf`} x1="18%" y1="0%" x2="82%" y2="100%">

          <stop offset="0%" stopColor={COLORS.leafLight} />

          <stop offset="100%" stopColor={COLORS.leafDark} />

        </linearGradient>

        <filter id={`${gradId}-soft`} x="-25%" y="-25%" width="150%" height="150%">

          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />

          <feOffset dx="0.5" dy="2" result="offset" />

          <feFlood floodColor="#3A2806" floodOpacity="0.12" result="color" />

          <feComposite in="color" in2="offset" operator="in" result="shadow" />

          <feMerge>

            <feMergeNode in="shadow" />

            <feMergeNode in="SourceGraphic" />

          </feMerge>

        </filter>

      </defs>



      <g id="stem">

        <path

          d={STEM_PATH}

          fill="none"

          stroke={`url(#${gradId}-stem)`}

          strokeWidth={16}

          strokeLinecap="round"

          strokeLinejoin="round"

          opacity={0.95}

        />

        <path

          d={STEM_PATH}

          fill="none"

          stroke={COLORS.stemLight}

          strokeWidth={3.5}

          strokeLinecap="round"

          opacity={0.18}

          transform="translate(-3, 0)"

        />

      </g>



      <g id="leaves">

        {LEAVES.map((lf) => (

          <LeafNode key={lf.id} leaf={lf} gradId={gradId} />

        ))}

      </g>



      <g id="budBase" transform={flowerTransform} opacity={0.88}>

        <path d="M -14 8 C -9 -5 -2 -10 0 -7 C 2 -10 9 -5 14 8 Z" fill={COLORS.leafDark} />

        <path d="M 0 8 C 4 -3 10 -7 16 5 L 0 8 Z" fill={COLORS.leafMid} opacity={0.7} />

        <path d="M 0 8 C -4 -3 -10 -7 -16 5 L 0 8 Z" fill={COLORS.leafMid} opacity={0.7} />

      </g>



      <g id="flowerPetals" filter={`url(#${gradId}-soft)`}>
        <g id="outerPetalsA" transform={flowerTransform}>
          {OUTER_PETALS_A.map((p) => (
            <PetalNode key={p.id} petal={p} fill={`url(#${gradId}-pn)`} />
          ))}
        </g>

        <g id="outerPetalsB" transform={flowerTransform}>
          {OUTER_PETALS_B.map((p) => (
            <PetalNode key={p.id} petal={p} fill={`url(#${gradId}-pn)`} />
          ))}
        </g>

        <g id="midPetals" transform={flowerTransform}>
          {MID_PETALS.map((p) => (
            <PetalNode key={p.id} petal={p} fill={`url(#${gradId}-pf)`} />
          ))}
        </g>

        <g id="innerPetals" transform={flowerTransform}>
          {INNER_PETALS.map((p) => (
            <PetalNode key={p.id} petal={p} fill={`url(#${gradId}-pi)`} />
          ))}
        </g>

        <g id="centerPetals" transform={flowerTransform}>
          {CENTER_PETALS.map((p) => (
            <PetalNode key={p.id} petal={p} fill={`url(#${gradId}-pi)`} />
          ))}
          <ellipse cx={1} cy={-1} rx={16} ry={14} fill={`url(#${gradId}-center)`} opacity={0.92} />
          <ellipse cx={-2} cy={-3} rx={9} ry={8} fill={COLORS.shadow} opacity={0.75} />
          <ellipse cx={3} cy={-4} rx={4} ry={3.5} fill="#FFF6D8" opacity={0.65} />
        </g>

        <g id="highlights" transform={flowerTransform}>
          {DEW_DROPS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="rgba(255,252,235,0.4)" />
          ))}
        </g>
      </g>

    </svg>

  );

});



function PetalNode({ petal, fill }: { petal: PetalDef; fill: string }) {

  return (

    <g transform={`rotate(${petal.angle}) scale(1 ${petal.scaleY})`}>

      <path

        d={petal.d}

        fill={fill}

        stroke={COLORS.deep}

        strokeWidth={0.2}

        strokeOpacity={0.35}

        opacity={petal.opacity}
      />

    </g>

  );

}



function LeafNode({ leaf, gradId }: { leaf: LeafDef; gradId: string }) {

  return (

    <g transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle})`}>

      <path d={leaf.d} fill={`url(#${gradId}-leaf)`} stroke={COLORS.leafDark} strokeWidth={0.5} opacity={0.92} />

      <path d="M 0 4 L -1 -38" stroke={COLORS.leafMid} strokeWidth={0.7} fill="none" opacity={0.3} />

    </g>

  );

}

