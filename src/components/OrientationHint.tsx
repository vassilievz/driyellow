import { memo } from 'react';

interface OrientationHintProps {
  visible: boolean;
}

export const OrientationHint = memo(function OrientationHint({ visible }: OrientationHintProps) {
  if (!visible) return null;

  return (
    <div className="yr-orient-hint" role="status" aria-live="polite">
      <div className="yr-orient-hint__icon" aria-hidden="true">
        <span className="yr-orient-hint__phone" />
        <span className="yr-orient-hint__arrow">↻</span>
      </div>
      <p className="yr-orient-hint__title">Gira tu celular</p>
      <p className="yr-orient-hint__sub">
        La experiencia se disfruta mejor con la pantalla en horizontal
      </p>
    </div>
  );
});
