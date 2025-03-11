import Head from 'next/head';
import Layout from '../components/Layout/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - AI Content Summariser</title>
        <meta name="description" content="Learn about the AI Content Summariser tool" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          About AI Content Summariser
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is AI Content Summariser?</h2>
            <p className="mb-4">
              AI Content Summariser is an intelligent tool that automatically generates concise summaries
              of articles, documents, and web content using advanced natural language processing.
            </p>
            <p>
              This tool helps you quickly extract key information from lengthy texts, saving you time
              while preserving the essential meaning of the original content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4">
              AI Content Summariser uses state-of-the-art transformer-based models to analyze text and
              identify the most important information. The process works in three steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Input Processing:</strong> Your text or URL is processed and prepared for analysis
              </li>
              <li>
                <strong>Content Analysis:</strong> AI models identify key concepts, facts, and relationships
              </li>
              <li>
                <strong>Summary Generation:</strong> A coherent, concise summary is created based on the most important information
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Summarize any text content or web page</li>
              <li>Adjust summary length to your preferences</li>
              <li>Fine-tune generation parameters for different styles</li>
              <li>Copy summaries to clipboard with one click</li>
              <li>Automatic caching of results for faster access</li>
              <li>Clean, responsive interface that works on all devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technology</h2>
            <p className="mb-4">
              This project is built with modern web technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Frontend:</strong> Next.js, React, TypeScript, and Tailwind CSS</li>
              <li><strong>Backend:</strong> FastAPI, Python, and Hugging Face Transformers</li>
              <li><strong>Deployment:</strong> Vercel (frontend) and Hugging Face Spaces (backend)</li>
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}
