import type { FC } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-10 mb-6 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        className="rounded-xl border border-indigo-200 bg-white/90 px-3 py-1 font-medium text-indigo-400 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      <span
        className="rounded-xl border border-indigo-200 bg-white/80 px-4 py-1 text-base font-semibold tracking-wide text-indigo-500 shadow-sm select-none"
        aria-label={`Page ${currentPage} of ${totalPages}`}
        aria-live="polite"
      >
        {currentPage}
        <span className="font-normal text-gray-400"> of </span>
        {totalPages}
      </span>
      <button
        className="rounded-xl border border-indigo-200 bg-white/90 px-3 py-1 font-medium text-indigo-400 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};
