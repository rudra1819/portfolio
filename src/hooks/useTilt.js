import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Pointer-driven 3D tilt for a card.
 *
 * Writes CSS custom properties on the element instead of setting `transform`
 * directly, so the stylesheet keeps control of how the numbers are used and can
 * compose them with its own transforms:
 *
 *   --tilt-x / --tilt-y   rotation in degrees
 *   --glare-x / --glare-y pointer position as a percentage, for a specular highlight
 *   --tilt-active         1 while hovered, 0 otherwise
 *
 * Updates are batched into a single rAF so a fast pointer cannot queue more
 * style writes than the browser can paint.
 *
 * @param {object} [options]
 * @param {number} [options.max=9]   maximum rotation in degrees
 * @param {boolean} [options.glare=true] track pointer position for a highlight
 * @returns {{ref: React.RefObject, handlers: object}} spread `handlers` onto the element
 */
export function useTilt({ max = 9, glare = true } = {}) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const pendingRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const flush = useCallback(() => {
    frameRef.current = null;
    const element = ref.current;
    const pending = pendingRef.current;
    if (!element || !pending) return;

    element.style.setProperty('--tilt-x', `${pending.tiltX.toFixed(2)}deg`);
    element.style.setProperty('--tilt-y', `${pending.tiltY.toFixed(2)}deg`);

    if (glare) {
      element.style.setProperty('--glare-x', `${pending.glareX.toFixed(1)}%`);
      element.style.setProperty('--glare-y', `${pending.glareY.toFixed(1)}%`);
    }
  }, [glare]);

  const onPointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion) return;
      // Coarse pointers have no hover state, and tilting under a fingertip that
      // is mid-scroll just looks like a glitch.
      if (event.pointerType === 'touch') return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      // -0.5 .. 0.5 relative to the card's centre.
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      pendingRef.current = {
        // Pointing right tips the right edge away, so rotateY follows px, while
        // rotateX is inverted: pointer down should tip the top toward the viewer.
        tiltY: px * max * 2,
        tiltX: -py * max * 2,
        glareX: (px + 0.5) * 100,
        glareY: (py + 0.5) * 100,
      };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(flush);
      }
    },
    [flush, max, prefersReducedMotion]
  );

  const onPointerEnter = useCallback(
    (event) => {
      if (prefersReducedMotion || event.pointerType === 'touch') return;
      ref.current?.style.setProperty('--tilt-active', '1');
    },
    [prefersReducedMotion]
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    // Reset to flat and let the CSS transition ease it back, rather than
    // snapping, which reads as the card breaking.
    element.style.setProperty('--tilt-active', '0');
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return {
    ref,
    handlers: prefersReducedMotion ? {} : { onPointerMove, onPointerEnter, onPointerLeave },
  };
}
