import { memo, useEffect, useRef } from 'react';
import bgMusicUrl from '../music/Anime Sunset Wallpaper Live [Full Song] - Alifacer (youtube).mp3';

const VOLUME = 0.22;

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
        audio.muted = false;
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

    document.addEventListener('pointerdown', onInteract, { capture: true });
    document.addEventListener('keydown', onInteract);
    document.addEventListener('touchstart', onInteract, { passive: true, capture: true });
    document.addEventListener('click', onInteract, { capture: true });

    return () => {
      document.removeEventListener('pointerdown', onInteract, { capture: true });
      document.removeEventListener('keydown', onInteract);
      document.removeEventListener('touchstart', onInteract, { capture: true });
      document.removeEventListener('click', onInteract, { capture: true });
      audio.pause();
    };
  }, [enabled]);

  return (
    <audio
      ref={audioRef}
      src={bgMusicUrl}
      loop
      preload="auto"
      playsInline
      className="sr-only"
      aria-hidden="true"
    />
  );
});
