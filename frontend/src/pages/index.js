import { useState } from 'react';
import Head from 'next/head';
import SummaryForm from '../components/SummaryForm';
import SummaryResult from '../components/SummaryResult';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import Layout from '../components/Layout/Layout';

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarise = async (data) => {
    setLoading(true);
    setError(null);

    try {
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
      setSummary(responseData);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while generating the summary');
    } finally {
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

        <SummaryForm onSubmit={handleSummarise} />

        {loading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        {summary && !loading && <SummaryResult summary={summary} />}
      </main>
    </Layout>
  );
}
