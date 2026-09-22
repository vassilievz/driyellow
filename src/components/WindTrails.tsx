import { memo, useId, useMemo, type CSSProperties } from 'react';

import {

  pathsForTrail,

  WIND_TRAILS_DESKTOP,

  WIND_TRAILS_MOBILE,

  WIND_TRAILS_REDUCED,

  type WindTrailConfig,

} from './wind/windTrailShapes';



interface WindTrailsProps {
  isMobile: boolean;
  lite: boolean;
  reduced: boolean;
  paused: boolean;
}



function WindTrailItem({
  trail,
  fillUrl,
  reduced,
  morphEnabled,
  segments,
}: {
  trail: WindTrailConfig;
  fillUrl: string;
  reduced: boolean;
  morphEnabled: boolean;
  segments: number;
}) {
  const [pathA, pathB, pathC] = useMemo(
    () => pathsForTrail(trail, segments),
    [trail, segments],
  );

  const morphDur = reduced ? trail.morphDuration * 2 : trail.morphDuration;



  const style = {

    '--wt-life': `${trail.duration}s`,

    '--wt-delay': `${trail.delay}s`,

    '--wt-op': trail.opacity,

    '--wt-blur': `${trail.blur}px`,

  } as CSSProperties;



  return (

    <g

      className={`wind-trail-item wind-trail-item--${trail.direction}${reduced ? ' wind-trail-item--reduced' : ''}`}

      style={style}

    >

      <path
        className="wind-trail-item__shape"
        fill={fillUrl}
        d={pathA}
      >
        {morphEnabled ? (
          <animate
            attributeName="d"
            dur={`${morphDur}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.33;0.66;1"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
            values={`${pathA};${pathB};${pathC};${pathA}`}
          />
        ) : null}
      </path>

    </g>

  );

}



export const WindTrails = memo(function WindTrails({
  isMobile,
  lite,
  reduced,
  paused,
}: WindTrailsProps) {

  const gradId = useId().replace(/:/g, '');



  const trails = reduced || lite
    ? WIND_TRAILS_REDUCED
    : isMobile
      ? WIND_TRAILS_MOBILE
      : WIND_TRAILS_DESKTOP;

  const morphEnabled = !lite && !isMobile && !reduced;
  const segments = lite ? 20 : isMobile ? 24 : 28;



  const fillUrl = `url(#${gradId}-wind-fill)`;



  return (

    <div

      className={`wind-trails${paused ? ' wind-trails--paused' : ''}`}

      aria-hidden="true"

    >

      <svg

        className="wind-trails__svg"

        viewBox="0 0 1440 810"

        preserveAspectRatio="xMidYMid slice"

      >

        <defs>

          <linearGradient id={`${gradId}-wind-fill`} x1="0%" y1="0%" x2="100%" y2="0%">

            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />

            <stop offset="12%" stopColor="rgba(255, 250, 240, 0.35)" />

            <stop offset="38%" stopColor="rgba(255, 245, 225, 0.95)" />

            <stop offset="62%" stopColor="rgba(255, 238, 210, 0.85)" />

            <stop offset="88%" stopColor="rgba(255, 248, 235, 0.3)" />

            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />

          </linearGradient>

        </defs>

        <g>
          {trails.map((trail) => (
            <WindTrailItem
              key={trail.id}
              trail={trail}
              fillUrl={fillUrl}
              reduced={reduced}
              morphEnabled={morphEnabled}
              segments={segments}
            />
          ))}
        </g>

      </svg>

    </div>

  );

});

