'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="bg-[#13131f] rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-zinc-400 text-sm mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}