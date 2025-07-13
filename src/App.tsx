import { Component, type JSX, type ReactNode } from 'react';
import SearchForm from './components/search/SearchForm/SearchForm';
import ResultsList from './components/results/ResultsList/ResultsList';
import './App.css';

class App extends Component {
  state = {
    serverUrl: 'https://rickandmortyapi.com/api',
    serverData: {},
  };

  componentDidMount(): void {
    fetch(`${this.state.serverUrl}/character`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        this.setState({ serverData: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render(): JSX.Element | ReactNode {
    return (
      <>
        <SearchForm />
        <ResultsList data={this.state.serverData} />
      </>
    );
  }
}

export default App;
