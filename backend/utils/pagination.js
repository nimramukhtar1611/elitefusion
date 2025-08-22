// utils/pagination.js
function toInt(v, fallback) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Reads page/limit from req.query and returns page, limit, skip.
 * Clamps limit to a sensible max (default 50) to protect DB.
 */
function paginateParams({ page, limit, maxLimit = 50 }) {
  const p = toInt(page, 1);
  const l = Math.min(toInt(limit, 24), maxLimit);
  return { page: p, limit: l, skip: (p - 1) * l };
}

module.exports = { paginateParams };
