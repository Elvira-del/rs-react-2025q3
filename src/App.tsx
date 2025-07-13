import { Component, type JSX, type ReactNode } from 'react';
import SearchForm from './components/search/SearchForm/SearchForm';
import './App.css';

class App extends Component {
  render(): JSX.Element | ReactNode {
    return (
      <>
        <SearchForm />
      </>
    );
  }
}

export default App;
