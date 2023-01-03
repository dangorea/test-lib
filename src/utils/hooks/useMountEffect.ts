import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (effect: EffectCallback): void => useEffect(effect, []);

export default useMountEffect;
