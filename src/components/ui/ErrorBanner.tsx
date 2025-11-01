import React from "react";

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorBanner: React.FC<Props> = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="bg-red-900/60 border border-red-800 text-red-100 rounded-lg p-4 flex items-center justify-between">
      <div className="text-sm">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1 bg-red-700/80 hover:bg-red-700 rounded text-sm"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
