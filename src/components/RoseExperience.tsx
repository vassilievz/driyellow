import { useEffect, useState } from 'react';
import { AmbientMusic } from './AmbientMusic';
import { AmbientParticles } from './AmbientParticles';
import { DedicationText } from './DedicationText';
import { FallingPetal } from './FallingPetal';
import { ForegroundFrame } from './ForegroundFrame';
import { GardenScene } from './GardenScene';
import { OrientationHint } from './OrientationHint';
import { RoseStage } from './RoseStage';
import { SceneBackground } from './SceneBackground';
import { WindTrails } from './WindTrails';
import { usePerformanceTier } from '../hooks/usePerformanceTier';
import { useViewport } from '../hooks/useViewport';

export function RoseExperience() {
  const { isMobile, isLandscape, isPortraitMobile } = useViewport();
  const { lite, reduced } = usePerformanceTier();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const paused = !loaded || reduced;

  return (
    <div
      className={`garden-root${paused ? ' gr-not-loaded' : ''}${lite ? ' garden-root--perf-lite' : ''}`}
    >
      <SceneBackground />
      <WindTrails isMobile={isMobile} lite={lite} reduced={reduced} paused={paused} />

      <div className="cin-stage garden-stage">
        <div className="cin-mist" aria-hidden="true" />
        <GardenScene paused={paused} />
        <RoseStage
          isMobile={isMobile}
          isLandscape={isLandscape}
          isPortraitMobile={isPortraitMobile}
          reduced={reduced}
        />
      </div>

      <AmbientParticles paused={paused} />
      <FallingPetal paused={paused} />
      <ForegroundFrame paused={paused} />

      <div className="cin-grade" aria-hidden="true">
        <div className="cin-grade__warmth" />
      </div>

      <DedicationText />
      <OrientationHint visible={isPortraitMobile} />
      <AmbientMusic enabled={loaded} />
    </div>
  );
}
