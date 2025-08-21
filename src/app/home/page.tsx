'use client';

import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useFilter } from '../../hooks/useFilter';
import { Pagination } from './components/Pagination/Pagination';
import { SearchForm } from './components/SearchForm/SearchForm';
import { Loader } from '../../components/loader/Loader';
import { SelectedFlyout } from './components/SelectedFlyout/SelectedFlyout';
import { fetchCharacters } from '../../api/api';
import { CharactersList } from './components/CharactersList/CharactersList';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  image: string;
};

export type ServerData = {
  info: Record<string, unknown>;
  results: Character[];
};

export default function HomePage() {
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
      {isLoading && <Loader />}
      {!isLoading && filteredData.length && (
        <>
          <CharactersList characters={filteredData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={isLoading ? () => {} : handlePageChange}
          />
        </>
      )}

      <SelectedFlyout />
    </>
  );
}
