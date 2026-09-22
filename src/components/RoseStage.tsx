import { memo } from 'react';
import { ROSE_SCALE_DESKTOP, ROSE_SCALE_MOBILE } from './rose/roseConfig';
import { RisingLights } from './RisingLights';
import { YellowRoseComplete } from './rose/YellowRoseComplete';

interface RoseStageProps {
  isMobile: boolean;
  isLandscape: boolean;
  isPortraitMobile: boolean;
  reduced: boolean;
}

export const RoseStage = memo(function RoseStage({
  isMobile,
  isLandscape,
  isPortraitMobile,
  reduced,
}: RoseStageProps) {
  const scale = isMobile
    ? isLandscape
      ? ROSE_SCALE_MOBILE * 1.08
      : ROSE_SCALE_MOBILE * 0.92
    : ROSE_SCALE_DESKTOP;

  const wrapClass = [
    reduced ? 'rose-hero-wrap' : 'rose-hero-wrap rose-hero-wrap--sway',
    isPortraitMobile ? 'rose-hero-wrap--portrait' : '',
    isMobile && isLandscape ? 'rose-hero-wrap--landscape-mobile' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const width = isMobile
    ? isLandscape
      ? 'min(72vh, 820px)'
      : 'min(92vw, 680px)'
    : 'min(88vw, 720px)';

  const height = isMobile
    ? isLandscape
      ? 'min(88vh, 680px)'
      : 'min(52vh, 520px)'
    : 'min(76vh, 700px)';

  return (
    <div className={wrapClass} style={{ width, height }}>
      <div
        className="relative h-full w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '50% 92%',
        }}
      >
        <YellowRoseComplete />
        <RisingLights />
      </div>
    </div>
  );
});
