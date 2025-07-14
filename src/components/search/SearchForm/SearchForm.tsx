import {
  Component,
  type ChangeEvent,
  type FormEvent,
  type JSX,
  type ReactNode,
} from 'react';
import SearchField from '../SearchField/SearchField';
import SearchBtn from '../SearchBtn/SearchBtn';

type SearchFormProps = {
  onQuerySubmit: (query: string) => void;
};

type SearchFormState = {
  searchQuery: string;
};

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
    };
  }

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem('searchQuery', this.state.searchQuery);
    this.props.onQuerySubmit(this.state.searchQuery);
  };

  render(): JSX.Element | ReactNode {
    return (
      <search>
        <form
          className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 shadow-sm md:gap-4"
          action="#"
          onSubmit={this.handleSearchSubmit}
        >
          <SearchField
            searchQuery={this.state.searchQuery}
            onQueryChange={this.handleSearchChange}
          />
          <SearchBtn />
        </form>
      </search>
    );
  }
}

export default SearchForm;
