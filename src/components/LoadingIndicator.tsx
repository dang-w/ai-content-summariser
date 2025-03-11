const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg">Generating summary...</p>
    </div>
  );
};

export default LoadingIndicator;
