import { Component, type ChangeEvent, type JSX, type ReactNode } from 'react';

class SearchField extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  render(): JSX.Element | ReactNode {
    console.log('Search query:', this.state.searchQuery); // Debugging line
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
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Enter your query..."
        />
      </label>
    );
  }
}

export default SearchField;
