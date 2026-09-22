import { memo } from 'react';

interface ForegroundFrameProps {
  paused: boolean;
}

/** Sem folhas grandes — apenas cena limpa */
export const ForegroundFrame = memo(function ForegroundFrame({ paused }: ForegroundFrameProps) {
  return <div className={`cin-foreground${paused ? ' gr-paused' : ''}`} aria-hidden="true" />;
});
