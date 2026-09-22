import { memo, useEffect, useRef } from 'react';
import bgMusicUrl from '../music/Anime Sunset Wallpaper Live [Full Song] - Alifacer (youtube).mp3';

const VOLUME = 0.16;

interface AmbientMusicProps {
  enabled: boolean;
}

export const AmbientMusic = memo(function AmbientMusic({ enabled }: AmbientMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;

    const tryPlay = async () => {
      if (startedRef.current) return;
      try {
        await audio.play();
        startedRef.current = true;
      } catch {
        /* aguarda interacao — politica de autoplay do navegador */
      }
    };

    void tryPlay();

    const onInteract = () => {
      void tryPlay();
    };

    window.addEventListener('pointerdown', onInteract);
    window.addEventListener('keydown', onInteract);
    window.addEventListener('touchstart', onInteract, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
      window.removeEventListener('touchstart', onInteract);
      audio.pause();
    };
  }, [enabled]);

  return (
    <audio ref={audioRef} src={bgMusicUrl} loop preload="auto" className="sr-only" aria-hidden="true" />
  );
});
