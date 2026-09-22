import { memo, type CSSProperties } from 'react';

const PARTICLES = [
  { left: '42%', bottom: '48%', size: 3, op: 0.28, delay: 0, drift: '1.5vmin' },
  { left: '54%', bottom: '52%', size: 2, op: 0.22, delay: 2.5, drift: '-1vmin' },
  { left: '48%', bottom: '44%', size: 2.5, op: 0.25, delay: 5, drift: '2vmin' },
  { left: '38%', bottom: '50%', size: 1.8, op: 0.18, delay: 7, drift: '-1.5vmin' },
  { left: '58%', bottom: '46%', size: 2.2, op: 0.2, delay: 3.5, drift: '1vmin' },
  { left: '45%', bottom: '56%', size: 1.5, op: 0.15, delay: 9, drift: '0.5vmin' },
];

interface AmbientParticlesProps {
  paused: boolean;
}

export const AmbientParticles = memo(function AmbientParticles({ paused }: AmbientParticlesProps) {
  return (
    <div className={`cin-particles${paused ? ' gr-paused' : ''}`} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="cin-particle"
          style={
            {
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--p-op': p.op,
              '--p-drift': p.drift,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});
