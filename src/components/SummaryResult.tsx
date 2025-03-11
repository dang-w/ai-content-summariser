import { useState } from 'react';

interface SummaryData {
  summary: string;
  original_text_length: number;
  summary_length: number;
  source_type?: 'text' | 'url';
  source_url?: string;
}

interface SummaryResultProps {
  summary: SummaryData;
}

const SummaryResult = ({ summary }: SummaryResultProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="text-sm text-gray-500">
          Reduced from {summary.original_text_length} to {summary.summary_length} characters
          ({Math.round((summary.summary_length / summary.original_text_length) * 100)}%)
        </div>
      </div>

      {summary.source_type === 'url' && summary.source_url && (
        <div className="mb-4 text-sm">
          <span className="font-medium">Source: </span>
          <a
            href={summary.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {summary.source_url}
          </a>
        </div>
      )}

      <div className="bg-white p-4 rounded border mb-4">
        <p>{summary.summary}</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
};

export default SummaryResult;
