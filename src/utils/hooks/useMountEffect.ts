import { EffectCallback, useEffect } from "react";

const useMountEffect = (effect: EffectCallback): void => useEffect(effect, []);

export default useMountEffect;
