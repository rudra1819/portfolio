// Client for the Rails portfolio API (see api/ in this repo).
//
// VITE_API_URL points at the deployed Rails app, e.g.
//   VITE_API_URL=https://bharat-portfolio-api.onrender.com
//
// When it is unset the site still renders: every consumer falls back to the
// bundled snapshot in src/data/, so a missing or sleeping API degrades to the
// old static behaviour rather than an empty page.

const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

export const isApiConfigured = API_BASE.length > 0;

export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}

/**
 * GET a JSON endpoint on the portfolio API.
 *
 * @param {string} path      path beginning with a slash, e.g. '/api/v1/projects'
 * @param {object} [options]
 * @param {AbortSignal} [options.signal]  caller's cancellation signal
 * @param {number} [options.timeout=8000] abort after this many ms
 * @returns {Promise<{data: unknown, syncedAt: string|null, stale: boolean}>}
 */
export async function fetchJson(path, { signal, timeout = 8000 } = {}) {
  if (!isApiConfigured) {
    throw new ApiError('VITE_API_URL is not set');
  }

  // Combine the caller's signal with our own timeout so a hung request cannot
  // leave a section spinning forever.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new ApiError('Request timed out')), timeout);
  const onAbort = () => controller.abort(signal?.reason);
  signal?.addEventListener('abort', onAbort, { once: true });

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new ApiError(`API responded ${response.status}`, { status: response.status });
    }

    return {
      data: await response.json(),
      syncedAt: response.headers.get('X-Synced-At'),
      stale: response.headers.get('X-Stale') === 'true',
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'Network request failed', { cause: error });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
