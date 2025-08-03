import { useEffect, useState, type FC } from 'react';
import { Outlet } from 'react-router';
import { Pagination } from '../../components/pagination/Pagination';
import { SearchForm } from '../../components/search/SearchForm/SearchForm';
import { useFilter } from '../../hooks/useFilter';
import { Loader } from '../../components/loader/Loader';
import { ResultsList } from '../../components/results/ResultsList/ResultsList';

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

export const HomePage: FC = () => {
  const [query, setQuery] = useState('');
  const [serverData, setServerData] = useState<ServerData>({
    info: {},
    results: [],
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const renderData = useFilter(serverData, query);

  const serverUrl = 'https://rickandmortyapi.com/api';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${serverUrl}/character?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setServerData(data);
        setTotalPages(data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleQuery = (query: string): void => {
    setQuery(query);
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
      {isLoading ? <Loader /> : <ResultsList data={renderData} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={isLoading ? () => {} : handlePageChange}
      />

      <Outlet />
    </>
  );
};
