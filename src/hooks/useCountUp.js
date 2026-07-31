import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Ease-out cubic: fast start, settled finish. Counters that ease in feel sluggish.
const easeOut = (t) => 1 - (1 - t) ** 3;

/**
 * Animates a number from 0 up to `target` once `active` becomes true.
 *
 * Driven by requestAnimationFrame rather than setInterval so it stays in step
 * with the display's refresh rate and pauses in background tabs.
 *
 * @param {number} target      final value
 * @param {object} [options]
 * @param {boolean} [options.active=true] start the animation (pair with useScrollReveal)
 * @param {number} [options.duration=1400] milliseconds
 * @returns {number} the current value, already rounded
 */
export function useCountUp(target, { active = true, duration = 1400 } = {}) {
  const numericTarget = Number.isFinite(Number(target)) ? Number(target) : 0;
  const prefersReducedMotion = usePrefersReducedMotion();
  // Only the rAF callback writes this, never the effect body.
  const [animatedValue, setAnimatedValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !active || numericTarget === 0) return undefined;

    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setAnimatedValue(Math.round(easeOut(progress) * numericTarget));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [numericTarget, active, duration, prefersReducedMotion]);

  // Reduced motion jumps straight to the answer: the number is the information,
  // the animation is decoration.
  if (prefersReducedMotion) return numericTarget;
  if (!active) return 0;

  return animatedValue;
}
