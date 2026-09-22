import { memo } from 'react';

const LIGHTS = [
  { className: 'rose-light rose-light--1' },
  { className: 'rose-light rose-light--2' },
  { className: 'rose-light rose-light--3' },
  { className: 'rose-light rose-light--4' },
  { className: 'rose-light rose-light--5' },
  { className: 'rose-light rose-light--6' },
  { className: 'rose-light rose-light--7' },
  { className: 'rose-light rose-light--8' },
];

export const RisingLights = memo(function RisingLights() {
  return (
    <div className="rose-lights" aria-hidden="true">
      {LIGHTS.map((light, i) => (
        <div key={i} className={light.className} />
      ))}
    </div>
  );
});
