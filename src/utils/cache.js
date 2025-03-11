export function getSummaryFromCache(text, options) {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached);
      // Check if cache is still valid (less than 24 hours old)
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      }
    } catch (e) {
      console.error('Cache parsing error:', e);
    }
  }

  return null;
}

export function saveSummaryToCache(text, options, data) {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;
  localStorage.setItem(cacheKey, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
