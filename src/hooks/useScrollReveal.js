import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const hasObserver = () => typeof IntersectionObserver !== 'undefined';

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Returns a ref to attach and a boolean. It unobserves after the first hit, so
 * scrolling back up does not replay the animation - re-triggering on every pass
 * makes a long page feel restless.
 *
 * @param {object} [options]
 * @param {number} [options.threshold=0.15] fraction visible before revealing
 * @param {string} [options.rootMargin='0px 0px -10% 0px'] fires slightly early
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !hasObserver()) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasIntersected(true);
        observer.unobserve(entry.target);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, rootMargin]);

  // Derived rather than stored. Reduced motion and a missing IntersectionObserver
  // both mean "show it immediately" - content must never stay hidden because an
  // animation could not run.
  const isRevealed = prefersReducedMotion || !hasObserver() || hasIntersected;

  return [ref, isRevealed];
}
