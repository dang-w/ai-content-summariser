interface SummaryOptions {
  maxLength: number;
  minLength: number;
  doSample: boolean;
  temperature: number;
}

interface SummaryData {
  summary: string;
  original_text_length: number;
  summary_length: number;
  source_type?: 'text' | 'url';
  source_url?: string;
  metadata?: {
    input_word_count: number;
    output_word_count: number;
    compression_ratio: number;
    model_used: string;
    processing_device: string;
  };
}

// Generate a cache key based on content and options
const getCacheKey = (content: string, options: SummaryOptions): string => {
  const contentHash = btoa(content.substring(0, 100)).replace(/[^a-zA-Z0-9]/g, '');
  return `summary_${contentHash}_${options.maxLength}_${options.minLength}_${options.doSample}_${options.temperature}`;
};

// Save summary to localStorage cache
export const saveSummaryToCache = (
  content: string,
  options: SummaryOptions,
  summary: SummaryData
): void => {
  try {
    const key = getCacheKey(content, options);
    localStorage.setItem(key, JSON.stringify({
      summary,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Get summary from localStorage cache (if exists and not expired)
export const getSummaryFromCache = (
  content: string,
  options: SummaryOptions
): SummaryData | null => {
  try {
    const key = getCacheKey(content, options);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const { summary, timestamp } = JSON.parse(cached);

    // Cache expires after 24 hours
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }

    return summary;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
};
