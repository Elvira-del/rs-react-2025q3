import { type ChangeEvent, type FC, type FormEvent } from 'react';
import { SearchField } from '../SearchField/SearchField';
import { SearchBtn } from '../SearchBtn/SearchBtn';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

type SearchFormProps = {
  onQuerySubmit: (query: string) => void;
};

export const SearchForm: FC<SearchFormProps> = ({ onQuerySubmit }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchQuery', '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    setSearchTerm(trimmedTerm);
    onQuerySubmit(trimmedTerm);
  };

  return (
    <search>
      <form
        className="mx-auto flex w-full max-w-md items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 shadow-sm md:gap-4"
        action="#"
        onSubmit={handleSearchSubmit}
      >
        <SearchField
          searchQuery={searchTerm}
          onQueryChange={handleSearchChange}
        />
        <SearchBtn />
      </form>
    </search>
  );
};
