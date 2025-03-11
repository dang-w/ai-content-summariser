import React from 'react';

const EnvironmentIndicator: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const isProduction = process.env.NODE_ENV === 'production';

  // Only show in development or if explicitly enabled
  if (isProduction && !process.env.NEXT_PUBLIC_SHOW_ENV_INDICATOR) {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-70 hover:opacity-100">
      {process.env.NODE_ENV}: {apiUrl}
    </div>
  );
};

export default EnvironmentIndicator;
