import { memo } from 'react';

interface FallingPetalProps {
  paused: boolean;
}

export const FallingPetal = memo(function FallingPetal({ paused }: FallingPetalProps) {
  if (paused) return null;

  return (
    <div aria-hidden="true">
      <div className="cin-falling-petal" style={{ left: '44%', top: '32%' }} />
      <div className="cin-falling-petal cin-falling-petal--2" style={{ top: '28%' }} />
    </div>
  );
});
