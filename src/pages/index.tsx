import { useState, useEffect } from 'react';
import Head from 'next/head';
import SummaryForm from '../components/SummaryForm';
import SummaryResult from '../components/SummaryResult';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import SummariserStatus from '../components/SummariserStatus';
import Layout from '../components/Layout/Layout';
import { getSummaryFromCache, saveSummaryToCache } from '../utils/cache';

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

interface StatusData {
  model_loading: {
    is_loading: boolean;
    step: string;
    progress: number;
  };
  current_job: {
    in_progress: boolean;
    input_word_count?: number;
    stage?: string;
    progress?: number;
    time_remaining?: number;
  };
  device: string;
}

export default function Home() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusData>({
    model_loading: { is_loading: false, step: '', progress: 0 },
    current_job: { in_progress: false },
    device: 'cpu'
  });

  // Status polling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      // Start polling when processing begins
      interval = setInterval(async () => {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/status`;
          const response = await fetch(apiUrl);

          if (response.ok) {
            const data = await response.json();
            setStatus(data);

            // If job is complete, stop polling
            if (data.current_job && !data.current_job.in_progress &&
                data.current_job.stage === 'Complete') {
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error('Error fetching status:', error);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleSummarise = async (data: {
    type: 'text' | 'url';
    content: string;
    options: SummaryOptions;
  }) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      // Check cache first
      const cachedSummary = getSummaryFromCache(data.content, data.options);
      if (cachedSummary) {
        setSummary(cachedSummary);
        setLoading(false);
        return;
      }

      // If not in cache, fetch from API
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/${
        data.type === 'url' ? 'summarise-url' : 'summarise'
      }`;

      const requestBody = {
        [data.type === 'url' ? 'url' : 'text']: data.content,
        max_length: data.options.maxLength,
        min_length: data.options.minLength,
        do_sample: data.options.doSample,
        temperature: data.options.temperature
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate summary');
      }

      const responseData = await response.json();

      // Format the summary data
      const summaryData: SummaryData = {
        summary: responseData.summary,
        original_text_length: data.content.length,
        summary_length: responseData.summary.length,
        source_type: data.type,
        source_url: data.type === 'url' ? data.content : undefined,
        metadata: responseData.metadata
      };

      // Cache the result
      saveSummaryToCache(data.content, data.options, summaryData);

      setSummary(summaryData);
      setLoading(false);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while generating the summary');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>AI Content Summariser</title>
        <meta name="description" content="Summarise any text content with AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Content Summariser
        </h1>

        <SummariserStatus status={status} />

        <SummaryForm onSubmit={handleSummarise} />

        {loading && !summary && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        {summary && <SummaryResult summary={summary} />}
      </main>
    </Layout>
  );
}
