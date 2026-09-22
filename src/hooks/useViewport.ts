import { useEffect, useState } from 'react';

export interface ViewportState {
  isMobile: boolean;
  isLandscape: boolean;
  isPortraitMobile: boolean;
}

function readViewport(): ViewportState {
  if (typeof window === 'undefined') {
    return { isMobile: true, isLandscape: false, isPortraitMobile: true };
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;
  const isLandscape = w >= h;
  return {
    isMobile,
    isLandscape,
    isPortraitMobile: isMobile && !isLandscape,
  };
}

export function useViewport(): ViewportState {
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const update = () => setViewport(readViewport());
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return viewport;
}
