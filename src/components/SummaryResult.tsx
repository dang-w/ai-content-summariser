import { useState } from 'react';

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

  // Format the model name for display
  const formatModelName = (modelName: string) => {
    if (!modelName) return 'Unknown';

    // Extract just the model name without the organization
    const parts = modelName.split('/');
    const name = parts.length > 1 ? parts[1] : parts[0];

    // Convert to title case and replace hyphens with spaces
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="text-sm text-gray-500">
          {summary.metadata ? (
            <>
              Reduced from {summary.metadata.input_word_count} to {summary.metadata.output_word_count} words
              ({summary.metadata.compression_ratio}%)
            </>
          ) : (
            <>
              Reduced from {summary.original_text_length} to {summary.summary_length} characters
              ({Math.round((summary.summary_length / summary.original_text_length) * 100)}%)
            </>
          )}
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
        <p className="leading-relaxed">{summary.summary}</p>
      </div>

      {summary.metadata && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <h3 className="font-medium mb-1">Processing Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-600">Model: </span>
              <span>{summary.metadata.model_used ? formatModelName(summary.metadata.model_used) : 'T5 Large'}</span>
            </div>
            <div>
              <span className="text-gray-600">Processed on: </span>
              <span>{summary.metadata.processing_device === 'cuda' ? 'GPU' : 'CPU'}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
};

export default SummaryResult;
