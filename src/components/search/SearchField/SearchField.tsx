import { Component, type ChangeEvent, type JSX, type ReactNode } from 'react';

type SearchFieldProps = {
  searchQuery: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

class SearchField extends Component<SearchFieldProps> {
  render(): JSX.Element | ReactNode {
    return (
      <label
        className="flex w-full flex-col gap-1 md:flex-row md:items-center md:gap-2"
        htmlFor="search"
      >
        <span className="font-medium text-gray-800 md:w-20">Search</span>
        <input
          className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-gray-900 transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
          type="search"
          id="search"
          name="search"
          value={this.props.searchQuery}
          onChange={this.props.onQueryChange}
          placeholder="Enter your query..."
        />
      </label>
    );
  }
}

export default SearchField;
