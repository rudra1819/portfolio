import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchJson, isApiConfigured } from '../lib/api';

const initialState = () => ({
  // With no API configured there is nothing to wait for, so skip the skeleton
  // and render the bundled data immediately.
  status: isApiConfigured ? 'loading' : 'fallback',
  payload: null,
  error: null,
  syncedAt: null,
  stale: false,
});

/**
 * Fetches a section's data from the Rails API, falling back to bundled static
 * data when the API is unreachable, unconfigured, or has never been synced.
 *
 * The fallback is what keeps a portfolio safe to deploy: a free-tier API that
 * is asleep, rate limited, or simply down should never show a visitor an empty
 * projects grid.
 *
 * @param {string} path        API path, e.g. '/api/v1/projects'
 * @param {object} options
 * @param {*} options.fallback value used when the request cannot be satisfied
 * @param {(payload: unknown) => *} [options.select] picks the value out of the response body
 * @returns {{data: *, status: 'loading'|'live'|'fallback', error: Error|null,
 *            isLive: boolean, syncedAt: string|null, stale: boolean, refresh: () => void}}
 */
export function useLiveData(path, { fallback, select = (payload) => payload }) {
  const [state, setState] = useState(initialState);
  const [reloadToken, setReloadToken] = useState(0);

  // Held in refs so a new inline fallback or select function on re-render does
  // not re-trigger the request; only `path` and an explicit refresh should.
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;
  const selectRef = useRef(select);
  selectRef.current = select;

  const refresh = useCallback(() => {
    if (!isApiConfigured) return;
    // Setting state from an event handler rather than inside the effect keeps
    // this out of the cascading-render pattern React 19 warns about.
    setState(initialState);
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    if (!isApiConfigured) return undefined;

    const controller = new AbortController();
    let active = true;

    fetchJson(path, { signal: controller.signal })
      .then(({ data, syncedAt, stale }) => {
        if (!active) return;
        setState({ status: 'live', payload: data, error: null, syncedAt, stale });
      })
      .catch((error) => {
        if (!active || controller.signal.aborted) return;
        // Deliberately not surfaced as a hard failure - log it for whoever is
        // debugging and show the bundled snapshot to the visitor.
        console.warn(`[portfolio] falling back to bundled data for ${path}:`, error.message);
        setState({ status: 'fallback', payload: null, error, syncedAt: null, stale: false });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [path, reloadToken]);

  // Derived rather than stored, so the fallback and the selector are applied
  // consistently on every render without an extra state write.
  const data = state.payload === null ? fallbackRef.current : selectRef.current(state.payload);

  return {
    data,
    status: state.status,
    error: state.error,
    isLive: state.status === 'live',
    syncedAt: state.syncedAt,
    stale: state.stale,
    refresh,
  };
}
