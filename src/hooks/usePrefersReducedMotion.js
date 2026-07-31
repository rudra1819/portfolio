import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const getInitialValue = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : false;

/**
 * True when the visitor has asked their OS to reduce motion.
 *
 * Every animation in this project checks this. Tilt, parallax and count-up are
 * skipped entirely rather than shortened, because the point of the setting is
 * to avoid vestibular triggers, not to make them faster.
 *
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const mediaQuery = window.matchMedia(QUERY);
    const onChange = (event) => setPrefersReduced(event.matches);

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
