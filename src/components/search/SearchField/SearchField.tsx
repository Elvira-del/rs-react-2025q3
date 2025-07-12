import { Component, type ChangeEvent, type ReactNode } from 'react';

class SearchField extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  render(): ReactNode {
    console.log('Search query:', this.state.searchQuery); // Debugging line
    return (
      <label
        className="flex flex-col items-start gap-2 md:flex-row md:items-center"
        htmlFor="search"
      >
        Search
        <input
          className="w-full rounded-md border border-gray-300 p-2"
          type="text"
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
