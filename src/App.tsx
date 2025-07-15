import { Component, type JSX, type ReactNode } from 'react';
import SearchForm from './components/search/SearchForm/SearchForm';
import ResultsList from './components/results/ResultsList/ResultsList';
import ErrorTriggerBtn from './components/error/ErrorTriggerBtn/ErrorTriggerBtn';
import Loader from './components/loader/Loader';
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
  isLoading: boolean;
  throwError: boolean;
};

class App extends Component<unknown, AppState> {
  state = {
    serverUrl: 'https://rickandmortyapi.com/api',
    serverData: {
      info: {},
      results: [],
    },
    query: '',
    renderData: [],
    isLoading: false,
    throwError: false,
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });
    fetch(`${this.state.serverUrl}/character`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          serverData: data,
          renderData: data.results,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
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

  handleTriggerError = (): void => {
    this.setState({ throwError: true });
  };

  render(): JSX.Element | ReactNode {
    if (this.state.throwError) {
      throw new Error('Simulated error for testing ErrorBoundary');
    }
    return (
      <>
        <ErrorTriggerBtn onTrigger={this.handleTriggerError} />
        <SearchForm onQuerySubmit={this.handleQuery} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ResultsList data={this.state.renderData} />
        )}
      </>
    );
  }
}

export default App;
