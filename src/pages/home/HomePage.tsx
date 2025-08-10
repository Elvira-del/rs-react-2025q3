import { useEffect, useState, type FC } from 'react';
import { Outlet } from 'react-router';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useFilter } from '../../hooks/useFilter';
import { Pagination } from './components/Pagination/Pagination';
import { SearchForm } from './components/SearchForm/SearchForm';
import { Loader } from '../../components/loader/Loader';
import { ResultsList } from './components/ResultsList/ResultsList';
import { SelectedFlyout } from './components/SelectedFlyout/SelectedFlyout';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type ServerData = {
  info: Record<string, unknown>;
  results: Character[];
};

const fetchCharacters = async (page: number) => {
  const url = new URL('https://rickandmortyapi.com/api/character/');
  url.searchParams.append('page', page.toString());

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const HomePage: FC = () => {
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['characters', currentPage],
    queryFn: () => fetchCharacters(currentPage),
    placeholderData: keepPreviousData,
  });
  const filteredData = useFilter(data, query);

  useEffect(() => {
    if (data?.info?.pages) setTotalPages(data.info.pages);
  }, [data]);

  const handleQuery = (query: string): void => {
    setQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <SearchForm onQuerySubmit={handleQuery} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ResultsList data={filteredData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={isLoading ? () => {} : handlePageChange}
          />
        </>
      )}
      <Outlet />
      <SelectedFlyout />
    </>
  );
};
