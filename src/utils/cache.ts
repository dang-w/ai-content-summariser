interface CacheOptions {
  maxLength: number;
  minLength: number;
  doSample: boolean;
  temperature: number;
}

interface CacheData {
  timestamp: number;
  data: any;
}

export function getSummaryFromCache(text: string, options: CacheOptions): any {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const { timestamp, data } = JSON.parse(cached) as CacheData;
        // Check if cache is still valid (less than 24 hours old)
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          return data;
        }
      } catch (e) {
        console.error('Cache parsing error:', e);
      }
    }
  }

  return null;
}

export function saveSummaryToCache(text: string, options: CacheOptions, data: any): void {
  const cacheKey = `summary-${hashString(text)}-${JSON.stringify(options)}`;

  if (typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
  }
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
