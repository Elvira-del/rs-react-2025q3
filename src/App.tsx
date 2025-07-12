import { Component, type ReactNode } from 'react';
import SearchField from './components/search/SearchField/SearchField';
import './App.css';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchField />
      </>
    );
  }
}

export default App;
