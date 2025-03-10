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

  const handleSummarise = async (text, options) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/Summarise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          max_length: options.maxLength,
          min_length: options.minLength,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data);
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