const RELATIVE = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const UNITS = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['week', 7 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
];

/**
 * "3 days ago", "last month", "just now".
 *
 * @param {string|Date|null|undefined} value ISO timestamp or Date
 * @returns {string|null} null when the value is missing or unparseable
 */
export function timeAgo(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const elapsed = date.getTime() - Date.now();
  const magnitude = Math.abs(elapsed);

  for (const [unit, ms] of UNITS) {
    if (magnitude >= ms) {
      return RELATIVE.format(Math.round(elapsed / ms), unit);
    }
  }

  return 'just now';
}

/** "Nov 2025" - used for repo creation dates. */
export function monthYear(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** 1200 -> "1.2k" so large counts do not break card layouts. */
export function compactNumber(value) {
  const number = Number(value ?? 0);
  if (!Number.isFinite(number)) return '0';

  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(number);
}
