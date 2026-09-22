import { memo } from 'react';

const DEDICATION =
  'Personalmente no puedo regalarte una flor amarilla, pero puedo crearte un jardín a mi manera.';

export const DedicationText = memo(function DedicationText() {
  return (
    <p className="yr-dedication" aria-label={DEDICATION}>
      {DEDICATION}
    </p>
  );
});
