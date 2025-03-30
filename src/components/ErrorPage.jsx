import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-lg w-full bg-zinc-900 rounded-lg border border-[#00F0FF]/20 p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#00F0FF]">Something went wrong</h1>
        <p className="mb-6">Sorry for the inconvenience. We encountered an unexpected error.</p>
        
        {error && (
          <div className="bg-black/40 p-4 rounded-md mb-6 overflow-auto max-h-40">
            <pre className="text-sm text-red-400">{error.toString()}</pre>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] rounded-md transition-colors"
          >
            Try again
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;