import { useMemo } from 'react';

import { useReducedMotion } from './useReducedMotion';
import { useViewport } from './useViewport';

interface NavigatorConnection {
  saveData?: boolean;
}

/** Detecta hardware fraco ou preferências que pedem modo leve. */
export function usePerformanceTier() {
  const { isMobile } = useViewport();
  const reduced = useReducedMotion();

  const lite = useMemo(() => {
    if (reduced || isMobile) return true;

    const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency ?? 8) : 8;
    if (cores <= 4) return true;

    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    if (connection?.saveData) return true;

    return false;
  }, [isMobile, reduced]);

  return { lite, isMobile, reduced };
}
