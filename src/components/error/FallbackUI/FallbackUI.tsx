import { Component, type JSX } from 'react';

class FallbackUI extends Component {
  handlePageReload = () => {
    document.location.reload();
  };

  render(): JSX.Element {
    return (
      <div className="mx-auto mt-12 flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center shadow">
        <span
          className="mb-[-1rem] animate-bounce text-[3rem]"
          aria-label="Rick"
          role="img"
        >
          🧑‍🔬
        </span>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          className="mx-auto mb-2 animate-pulse"
          aria-hidden="true"
        >
          <ellipse cx="60" cy="60" rx="54" ry="24" fill="#a5f3fc" />
          <ellipse cx="60" cy="60" rx="48" ry="20" fill="#4ade80" />
          <ellipse cx="60" cy="60" rx="37" ry="12" fill="#22d3ee" />
          <ellipse
            cx="60"
            cy="60"
            rx="33"
            ry="9"
            fill="#fbbf24"
            opacity="0.6"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="22"
            ry="5"
            fill="#fbbf24"
            opacity="0.3"
          />
        </svg>
        <div className="text-2xl font-semibold text-indigo-600">
          Wubba Lubba Dub Dub!
        </div>
        <div className="text-base text-gray-700">
          Something broke in the multiverse.
          <br />
          Try again, or just blame Jerry.
        </div>
        <button
          className="mt-2 rounded-xl border border-red-200 bg-white/90 px-4 py-2 font-medium text-red-500 shadow-sm transition hover:border-red-300 hover:bg-red-100 focus:ring-2 focus:ring-red-200 focus:outline-none active:bg-red-200"
          type="button"
          onClick={this.handlePageReload}
        >
          Try again
        </button>
      </div>
    );
  }
}

export default FallbackUI;
