import { memo, useId, type CSSProperties } from 'react';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { useViewport } from '../../hooks/useViewport';
import {
  GRASS_TUFTS,
  GRASS_TUFTS_LITE,
  GRASS_TUFTS_MOBILE,
  THIN_GRASS_CARPET_A,
  THIN_GRASS_CARPET_A_MOBILE,
  THIN_GRASS_CARPET_B,
  THIN_GRASS_CARPET_B_MOBILE,
  THIN_GRASS_CARPET_C,
  THIN_GRASS_CARPET_C_MOBILE,
  THIN_GRASS_CENTER,
  THIN_GRASS_CENTER_MOBILE,
  THIN_GRASS_FRONT,
  THIN_GRASS_FRONT_LITE,
  THIN_GRASS_FRONT_MOBILE,
  THIN_GRASS_CARPET_A_LITE,
  THIN_GRASS_CARPET_B_LITE,
  THIN_GRASS_CARPET_C_LITE,
  THIN_GRASS_CENTER_LITE,
  THIN_GRASS_MID_LITE,
  THIN_GRASS_ROSE_BASE_LITE,
  THIN_GRASS_MID,
  THIN_GRASS_MID_MOBILE,
  THIN_GRASS_ROSE_BASE,
  THIN_GRASS_ROSE_BASE_MOBILE,
  type GrassTuftDef,
  type ThinBladeDef,
  type TuftBladeDef,
} from './grassData';

const GrassTuft = memo(function GrassTuft({
  tuft,
  skipBlur,
}: {
  tuft: GrassTuftDef;
  skipBlur: boolean;
}) {
  return (
    <div
      className="gr-tuft"
      style={{
        left: tuft.left,
        bottom: tuft.bottom,
        zIndex: tuft.zIndex,
        transform: `translateX(-50%) scale(${tuft.scale})`,
        filter: tuft.blur && !skipBlur ? `blur(${tuft.blur}px)` : undefined,
      }}
    >
      {tuft.blades.map((blade, i) => (
        <TuftBlade key={i} blade={blade} index={i} />
      ))}
    </div>
  );
});

const TuftBlade = memo(function TuftBlade({
  blade,
  index,
}: {
  blade: TuftBladeDef;
  index: number;
}) {
  const tier = index % 3 === 1 ? 'gr-tuft__blade--mid' : index % 3 === 2 ? 'gr-tuft__blade--outer' : '';
  return (
    <div
      className={`gr-tuft__blade ${tier}`.trim()}
      style={
        {
          height: `${blade.height}vmin`,
          width: `${blade.width}vmin`,
          opacity: blade.opacity,
          left: `calc(50% + ${blade.offset}vmin)`,
          '--rot': `${blade.rotate}deg`,
          '--delay': `${blade.delay}s`,
        } as CSSProperties
      }
    />
  );
});

const ThinBlade = memo(function ThinBlade({ blade }: { blade: ThinBladeDef }) {
  return (
    <div
      className={`gr-thin-blade gr-thin-blade--${blade.variant}`}
      style={
        {
          left: blade.left,
          bottom: blade.bottom,
          height: `${blade.height}vmin`,
          width: `${blade.width}vmin`,
          opacity: blade.opacity,
          zIndex: blade.zIndex,
          '--rot': `${blade.rotate}deg`,
          '--delay': `${blade.delay}s`,
        } as CSSProperties
      }
    />
  );
});

const ThinGrassField = memo(function ThinGrassField({ blades }: { blades: ThinBladeDef[] }) {
  return (
    <div className="gr-thin-field">
      {blades.map((b, i) => (
        <ThinBlade key={i} blade={b} />
      ))}
    </div>
  );
});

export const GroundLayer = memo(function GroundLayer() {
  const gradId = useId().replace(/:/g, '');
  const { isMobile } = useViewport();
  const { lite } = usePerformanceTier();

  const tufts = isMobile ? GRASS_TUFTS_MOBILE : lite ? GRASS_TUFTS_LITE : GRASS_TUFTS;

  const layers = isMobile
    ? {
        a: THIN_GRASS_CARPET_A_MOBILE,
        b: THIN_GRASS_CARPET_B_MOBILE,
        c: THIN_GRASS_CARPET_C_MOBILE,
        mid: THIN_GRASS_MID_MOBILE,
        center: THIN_GRASS_CENTER_MOBILE,
        rose: THIN_GRASS_ROSE_BASE_MOBILE,
        front: THIN_GRASS_FRONT_MOBILE,
      }
    : lite
      ? {
          a: THIN_GRASS_CARPET_A_LITE,
          b: THIN_GRASS_CARPET_B_LITE,
          c: THIN_GRASS_CARPET_C_LITE,
          mid: THIN_GRASS_MID_LITE,
          center: THIN_GRASS_CENTER_LITE,
          rose: THIN_GRASS_ROSE_BASE_LITE,
          front: THIN_GRASS_FRONT_LITE,
        }
      : {
          a: THIN_GRASS_CARPET_A,
          b: THIN_GRASS_CARPET_B,
          c: THIN_GRASS_CARPET_C,
          mid: THIN_GRASS_MID,
          center: THIN_GRASS_CENTER,
          rose: THIN_GRASS_ROSE_BASE,
          front: THIN_GRASS_FRONT,
        };

  return (
    <div className="gr-meadow" aria-hidden="true">
      <svg
        className="gr-meadow__svg"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gradId}-hill-far`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(18, 28, 14, 0)" />
            <stop offset="100%" stopColor="rgba(12, 18, 10, 0.85)" />
          </linearGradient>
          <linearGradient id={`${gradId}-hill-mid`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(28, 42, 22, 0)" />
            <stop offset="55%" stopColor="rgba(22, 34, 18, 0.55)" />
            <stop offset="100%" stopColor="rgba(14, 22, 12, 0.92)" />
          </linearGradient>
          <linearGradient id={`${gradId}-hill-near`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(38, 58, 30, 0)" />
            <stop offset="40%" stopColor="rgba(32, 48, 26, 0.45)" />
            <stop offset="100%" stopColor="rgba(16, 24, 14, 0.98)" />
          </linearGradient>
        </defs>

        <path
          d="M0,200 L0,110 C180,70 360,95 540,82 C720,68 900,88 1080,78 C1260,68 1440,92 1440,110 L1440,200 Z"
          fill={`url(#${gradId}-hill-far)`}
        />
        <path
          d="M0,200 L0,130 C220,105 420,118 720,108 C980,100 1180,115 1440,125 L1440,200 Z"
          fill={`url(#${gradId}-hill-mid)`}
        />
        <path
          d="M0,200 L0,148 C280,132 520,142 720,136 C920,130 1160,145 1440,138 L1440,200 Z"
          fill={`url(#${gradId}-hill-near)`}
        />
      </svg>

      <div className="gr-meadow__mist" />

      <ThinGrassField blades={layers.a} />
      <ThinGrassField blades={layers.b} />
      <ThinGrassField blades={layers.c} />
      <ThinGrassField blades={layers.mid} />

      {tufts.map((tuft) => (
        <GrassTuft key={tuft.id} tuft={tuft} skipBlur={lite} />
      ))}

      <ThinGrassField blades={layers.center} />
      <ThinGrassField blades={layers.rose} />
      <ThinGrassField blades={layers.front} />
    </div>
  );
});
