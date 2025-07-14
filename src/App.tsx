import { Component, type JSX, type ReactNode } from 'react';
import SearchForm from './components/search/SearchForm/SearchForm';
import ResultsList from './components/results/ResultsList/ResultsList';
import './App.css';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type AppState = {
  serverUrl: string;
  serverData: {
    info: Record<string, unknown>;
    results: Character[];
  };
  query: string;
  renderData: Character[];
};

class App extends Component<AppState> {
  state = {
    serverUrl: 'https://rickandmortyapi.com/api',
    serverData: {
      info: {},
      results: [],
    },
    query: '',
    renderData: [],
  };

  componentDidMount(): void {
    fetch(`${this.state.serverUrl}/character`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ serverData: data, renderData: data.results });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  componentDidUpdate(prevProps, prevState): void {
    if (prevState.query !== this.state.query) {
      const filteredData = this.state.query
        ? this.state.serverData.results.filter((item: Character) =>
            item.name.toLowerCase().includes(this.state.query.toLowerCase())
          )
        : this.state.serverData.results;
      this.setState({ renderData: filteredData });
    }
  }

  handleQuery = (query: string): void => {
    this.setState({ query });
  };

  render(): JSX.Element | ReactNode {
    return (
      <>
        <SearchForm onQuerySubmit={this.handleQuery} />
        <ResultsList data={this.state.renderData} />
      </>
    );
  }
}

export default App;
