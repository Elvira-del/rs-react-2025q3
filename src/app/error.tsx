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
    <div className="m-8 rounded-xl border border-red-200 bg-red-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-red-700">
        Something broke in the multiverse
      </h2>
      <pre className="overflow-auto text-sm text-red-800">{error.message}</pre>
      <button
        className="mt-4 rounded-lg border px-4 py-2"
        onClick={() => reset()}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
