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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
      {pages.map((page) => (
        <button
          key={page}
          className={`rounded-xl border px-3 py-1 ${
            page === currentPage
              ? 'border-indigo-500 bg-indigo-500 text-white shadow'
              : 'border-indigo-200 bg-white/90 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50'
          } font-medium transition`}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
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
