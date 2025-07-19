import { Component, type JSX } from 'react';

class SearchBtn extends Component {
  render(): JSX.Element {
    return (
      <button
        className="rounded-xl border border-indigo-500 bg-indigo-500 px-5 py-2 font-semibold text-white shadow transition hover:bg-indigo-600 hover:shadow-md focus:ring-2 focus:ring-indigo-300 focus:outline-none active:shadow-none"
        type="submit"
      >
        Search
      </button>
    );
  }
}

export default SearchBtn;
