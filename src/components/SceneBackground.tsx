import { memo } from 'react';

const BG_IMAGE = '/images/sunset-bg.jpg';

export const SceneBackground = memo(function SceneBackground() {
  return (
    <div className="scene-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <img
        className="scene-bg__image"
        src={BG_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
      />

      <div className="scene-bg__depth absolute inset-0" />

      <div className="scene-bg__horizon absolute inset-0" />

      <div className="scene-bg__ambient absolute inset-0" />
    </div>
  );
});
