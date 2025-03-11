const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SummaryOptions {
  maxLength: number;
  minLength: number;
  doSample: boolean;
  temperature: number;
}

export interface SummaryResponse {
  summary: string;
  metadata: {
    input_word_count: number;
    output_word_count: number;
    compression_ratio: number;
    model_used: string;
    processing_device: string;
  };
}

export async function summarizeText(text: string, options: SummaryOptions): Promise<SummaryResponse> {
  console.log(`Using API URL: ${API_URL}`);

  const response = await fetch(`${API_URL}/api/summarise`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      max_length: options.maxLength,
      min_length: options.minLength,
      do_sample: options.doSample,
      temperature: options.temperature
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }

  return await response.json();
}

export async function summarizeUrl(url: string, options: SummaryOptions): Promise<SummaryResponse> {
  console.log(`Using API URL: ${API_URL}`);

  const response = await fetch(`${API_URL}/api/summarise-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      max_length: options.maxLength,
      min_length: options.minLength,
      do_sample: options.doSample,
      temperature: options.temperature
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }

  return await response.json();
}

export async function getApiStatus(): Promise<any> {
  const response = await fetch(`${API_URL}/api/status`);

  if (!response.ok) {
    throw new Error(`Status API error: ${response.status}`);
  }

  return await response.json();
}
