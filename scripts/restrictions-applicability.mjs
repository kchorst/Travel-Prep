// Keep the accepted selector values aligned with VisaBrowser's draft reader.
const isPassportCode = (value) => typeof value === 'string' && /^[A-Z][A-Z0-9-]{1,15}$/.test(value);
const modes = new Set(['air', 'land', 'sea']);
const selectors = new Map([
  ['passportCodes', isPassportCode],
  ['arrivalModes', (value) => modes.has(value)],
]);

export function isValidApplicability(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const entries = Object.entries(value);
  return entries.length > 0 && entries.every(([key, allowed]) =>
    selectors.has(key) && Array.isArray(allowed) && allowed.length > 0 &&
    new Set(allowed).size === allowed.length && allowed.every(selectors.get(key)));
}

export function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export function hasValidDates({ checkedAt, effectiveFrom, effectiveUntil, reviewBy }) {
  return [effectiveFrom, effectiveUntil, reviewBy].every(date => date === undefined || isIsoDate(date)) &&
    (effectiveFrom === undefined || effectiveUntil === undefined || effectiveFrom <= effectiveUntil) &&
    (reviewBy === undefined || (isIsoDate(checkedAt) && checkedAt < reviewBy));
}
