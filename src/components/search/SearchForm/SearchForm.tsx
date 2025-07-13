import { Component, type JSX, type ReactNode } from 'react';
import SearchField from '../SearchField/SearchField';
import SearchBtn from '../SearchBtn/SearchBtn';

class SearchForm extends Component {
  render(): JSX.Element | ReactNode {
    return (
      <form className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 shadow-sm md:gap-4">
        <SearchField />
        <SearchBtn />
      </form>
    );
  }
}

export default SearchForm;
