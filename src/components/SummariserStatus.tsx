import React from 'react';

interface StatusProps {
  status: {
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
  };
}

const SummariserStatus: React.FC<StatusProps> = ({ status }) => {
  const { model_loading, current_job, device } = status;

  // If nothing is happening, don't show the status component
  if (!model_loading.is_loading && !current_job.in_progress) {
    return null;
  }

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Status</h3>

      {model_loading.is_loading && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 mb-1">Loading AI Model</h4>
          <p className="text-sm text-gray-600 mb-2">{model_loading.step}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${model_loading.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{model_loading.progress}% complete</p>
        </div>
      )}

      {current_job.in_progress && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-1">Summarizing Your Text</h4>

          <div className="flex flex-wrap gap-2 my-2">
            {current_job.input_word_count && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                Input: {current_job.input_word_count} words
              </span>
            )}

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
              Processing on: {device === 'cuda' ? 'GPU (faster)' : 'CPU'}
            </span>

            {current_job.time_remaining !== undefined && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                ~{current_job.time_remaining} seconds remaining
              </span>
            )}
          </div>

          <div className="relative mt-4 mb-2">
            <div className="flex justify-between mb-1">
              <div className={`flex flex-col items-center ${current_job.stage?.includes('Tokenizing') ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                <div className={`w-4 h-4 rounded-full mb-1 ${current_job.stage?.includes('Tokenizing') ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-xs">Tokenizing</span>
              </div>

              <div className={`flex flex-col items-center ${current_job.stage?.includes('Generating') ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                <div className={`w-4 h-4 rounded-full mb-1 ${current_job.stage?.includes('Generating') ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-xs">Generating</span>
              </div>

              <div className={`flex flex-col items-center ${current_job.stage?.includes('Post-processing') ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                <div className={`w-4 h-4 rounded-full mb-1 ${current_job.stage?.includes('Post-processing') ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-xs">Refining</span>
              </div>

              <div className={`flex flex-col items-center ${current_job.stage?.includes('Complete') ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                <div className={`w-4 h-4 rounded-full mb-1 ${current_job.stage?.includes('Complete') ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs">Complete</span>
              </div>
            </div>

            {/* Progress bar connecting the dots */}
            <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${current_job.progress || 0}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600 mt-2 italic">{current_job.stage}</p>
        </div>
      )}
    </div>
  );
};

export default SummariserStatus;
