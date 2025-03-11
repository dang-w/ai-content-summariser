const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center my-8 p-6 bg-gray-50 rounded-lg border">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Connecting to AI service...</p>
      <p className="text-sm text-gray-500 mt-2">
        This may take a moment while we initialize the summarization service.
      </p>
    </div>
  );
};

export default LoadingIndicator;
