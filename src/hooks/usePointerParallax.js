import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Tracks the pointer across a container and exposes its position as CSS
 * variables, for parallax layers that move at different rates.
 *
 * Sets on the container element:
 *   --px / --py   -1 .. 1, relative to the container's centre
 *
 * Layers then scale that themselves, e.g.
 *   transform: translate3d(calc(var(--px) * 26px), calc(var(--py) * 20px), 60px);
 *
 * The value is eased toward the pointer rather than snapped to it, so the scene
 * drifts instead of twitching. The loop stops once it is close enough to rest.
 *
 * @param {object} [options]
 * @param {number} [options.ease=0.09] 0..1; lower is smoother and slower
 * @returns {{ref: React.RefObject, handlers: object}}
 */
export function usePointerParallax({ ease = 0.09 } = {}) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  // The loop is self-scheduling, so it lives in a ref rather than a useCallback
  // that would have to reference its own identity.
  const tickRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const tick = () => {
      const element = ref.current;
      if (!element) {
        frameRef.current = null;
        return;
      }

      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      element.style.setProperty('--px', current.current.x.toFixed(4));
      element.style.setProperty('--py', current.current.y.toFixed(4));

      const settled =
        Math.abs(target.current.x - current.current.x) < 0.001 &&
        Math.abs(target.current.y - current.current.y) < 0.001;

      // Idling in a rAF loop forever would keep waking the compositor for nothing.
      frameRef.current = settled ? null : requestAnimationFrame(tick);
    };

    tickRef.current = tick;

    return () => {
      tickRef.current = null;
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [ease]);

  const schedule = useCallback(() => {
    if (frameRef.current === null && tickRef.current) {
      frameRef.current = requestAnimationFrame(tickRef.current);
    }
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion || event.pointerType === 'touch') return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      target.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      schedule();
    },
    [prefersReducedMotion, schedule]
  );

  const onPointerLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
    schedule();
  }, [schedule]);

  return {
    ref,
    handlers: prefersReducedMotion ? {} : { onPointerMove, onPointerLeave },
  };
}
