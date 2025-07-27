import { useEffect, useState, type FC } from 'react';
import { useFilter } from './hooks/useFilter';
import { SearchForm } from './components/search/SearchForm/SearchForm';
import { ResultsList } from './components/results/ResultsList/ResultsList';
import { ErrorTriggerBtn } from './components/error/ErrorTriggerBtn/ErrorTriggerBtn';
import { Loader } from './components/loader/Loader';
import { Pagination } from './components/pagination/Pagination';
import './App.css';

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

const App: FC = () => {
  const [query, setQuery] = useState('');
  const [serverData, setServerData] = useState<ServerData>({
    info: {},
    results: [],
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [throwError, setThrowError] = useState(false);
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

  const handleTriggerError = (): void => {
    setThrowError(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  if (throwError) {
    throw new Error('Simulated error for testing ErrorBoundary');
  }
  return (
    <>
      <ErrorTriggerBtn onTrigger={handleTriggerError} />
      <SearchForm onQuerySubmit={handleQuery} />
      {isLoading ? <Loader /> : <ResultsList data={renderData} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default App;
