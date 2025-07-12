import { Component, type JSX } from 'react';

class SearchBtn extends Component {
  render(): JSX.Element {
    return (
      <button
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition hover:bg-gray-50 active:shadow-none"
        type="submit"
      >
        Search
      </button>
    );
  }
}

export default SearchBtn;
