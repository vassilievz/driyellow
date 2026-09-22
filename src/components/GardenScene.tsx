import { memo } from 'react';
import { GroundLayer } from './garden/GroundLayer';

interface GardenSceneProps {
  paused: boolean;
}

export const GardenScene = memo(function GardenScene({ paused }: GardenSceneProps) {
  return (
    <div className={`gr-decor${paused ? ' gr-paused' : ''}`} aria-hidden="true">
      <GroundLayer />
    </div>
  );
});
