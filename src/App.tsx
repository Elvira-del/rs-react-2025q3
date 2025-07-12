import { Component, type JSX, type ReactNode } from 'react';
import SearchField from './components/search/SearchField/SearchField';
import SearchBtn from './components/search/SearchBtn/SearchBtn';
import './App.css';

class App extends Component {
  render(): JSX.Element | ReactNode {
    return (
      <>
        <SearchField />
        <SearchBtn />
      </>
    );
  }
}

export default App;
