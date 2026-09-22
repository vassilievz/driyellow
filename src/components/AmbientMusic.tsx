import { memo, useCallback, useEffect, useRef, useState } from 'react';
import bgMusicUrl from '../music/Anime Sunset Wallpaper Live [Full Song] - Alifacer (youtube).mp3';

const VOLUME = 0.22;

interface AmbientMusicProps {
  enabled: boolean;
}

export const AmbientMusic = memo(function AmbientMusic({ enabled }: AmbientMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return false;

    try {
      audio.muted = false;
      await audio.play();
      startedRef.current = true;
      setIsPlaying(true);
      setShowPlayer(false);
      return true;
    } catch {
      setShowPlayer(true);
      return false;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME;

    const onPlaying = () => {
      setIsPlaying(true);
      setShowPlayer(false);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);

    void tryPlay();

    return () => {
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.pause();
    };
  }, [enabled, tryPlay]);

  const handlePlayClick = () => {
    void tryPlay();
  };

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void tryPlay();
    } else {
      audio.pause();
      startedRef.current = false;
      setIsPlaying(false);
      setShowPlayer(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={bgMusicUrl}
        loop
        preload="auto"
        playsInline
        className="sr-only"
        aria-hidden="true"
      />

      {enabled && showPlayer && !isPlaying ? (
        <div className="yr-music-player" role="region" aria-label="Reprodutor de musica ambiente">
          <div className="yr-music-player__glow" aria-hidden="true" />
          <div className="yr-music-player__disc" aria-hidden="true">
            <span className="yr-music-player__disc-ring" />
            <span className="yr-music-player__disc-core" />
          </div>

          <div className="yr-music-player__body">
            <p className="yr-music-player__title">Sunset Ambience</p>
            <p className="yr-music-player__hint">Toque para iniciar a trilha</p>

            <button
              type="button"
              className="yr-music-player__play"
              onClick={handlePlayClick}
              aria-label="Reproduzir musica"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M8 5.14v13.72L19 12 8 5.14z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="yr-music-player__bars" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
        </div>
      ) : null}

      {enabled && isPlaying ? (
        <button
          type="button"
          className="yr-music-chip"
          onClick={handleToggle}
          aria-label="Pausar musica"
          title="Pausar musica"
        >
          <span className="yr-music-chip__bars" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      ) : null}
    </>
  );
});
