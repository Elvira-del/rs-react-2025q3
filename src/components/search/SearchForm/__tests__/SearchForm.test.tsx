import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import SearchForm from '../SearchForm';

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

test('displays previously saved search term from localStorage on mount', () => {
  localStorage.setItem('searchQuery', 'Morty');

  const { getByDisplayValue, getByRole } = render(
    <SearchForm onQuerySubmit={() => {}} />
  );

  expect(localStorage.getItem('searchQuery')).toBe('Morty');
  expect(getByDisplayValue('Morty')).toBeInTheDocument();
  expect(getByRole('searchbox')).toHaveValue('Morty');
});

test('shows empty input when no saved term exists', () => {
  localStorage.setItem('searchQuery', '');

  const { getByDisplayValue, getByRole } = render(
    <SearchForm onQuerySubmit={() => {}} />
  );

  expect(localStorage.getItem('searchQuery')).toBe('');
  expect(getByDisplayValue('')).toBeInTheDocument();
  expect(getByRole('searchbox')).toHaveValue('');
});

test('updates input value when user types', async () => {
  const user = userEvent.setup();

  const { getByDisplayValue, getByRole } = render(
    <SearchForm onQuerySubmit={() => {}} />
  );

  const searchInput = getByRole('searchbox');
  await user.type(searchInput, 'Morty');

  expect(getByDisplayValue('Morty')).toBeInTheDocument();
  expect(getByRole('searchbox')).toHaveValue('Morty');
});

test('saves search term to localStorage when search button is clicked', async () => {
  const user = userEvent.setup();

  const { getByRole } = render(<SearchForm onQuerySubmit={() => {}} />);

  const searchInput = getByRole('searchbox');
  await user.type(searchInput, 'Morty');

  const searchButton = getByRole('button', { name: 'Search' });
  await user.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('Morty');
});

test('trims whitespace from search input before saving', async () => {
  const user = userEvent.setup();
  const handleSearchTermSubmit = vi.fn();

  const { getByRole } = render(
    <SearchForm onQuerySubmit={handleSearchTermSubmit} />
  );

  const searchInput = getByRole('searchbox');
  await user.type(searchInput, '   Jerry   ');

  const searchButton = getByRole('button', { name: 'Search' });
  await user.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('Jerry');
  expect(handleSearchTermSubmit).toHaveBeenCalledWith('Jerry');
});

test('triggers search callback with correct parameters', async () => {
  const user = userEvent.setup();
  const handleSearchTermSubmit = vi.fn();

  const { getByRole } = render(
    <SearchForm onQuerySubmit={handleSearchTermSubmit} />
  );

  const searchInput = getByRole('searchbox');
  await user.type(searchInput, 'Jerry');

  const searchButton = getByRole('button', { name: 'Search' });
  await user.click(searchButton);

  expect(handleSearchTermSubmit).toHaveBeenCalledOnce();
  expect(handleSearchTermSubmit).toHaveBeenCalledWith('Jerry');
});

test('retrieves saved search term on component mount', () => {
  localStorage.setItem('searchQuery', 'Jerry');

  const { getByRole } = render(<SearchForm onQuerySubmit={() => {}} />);

  expect(getByRole('searchbox')).toHaveValue('Jerry');
});

test('overwrites existing localStorage value when new search is performed', async () => {
  const user = userEvent.setup();

  localStorage.setItem('searchQuery', 'Rick');

  const { getByRole } = render(<SearchForm onQuerySubmit={() => {}} />);

  expect(localStorage.getItem('searchQuery')).toBe('Rick');

  const searchInput = getByRole('searchbox');
  await user.clear(searchInput);
  await user.type(searchInput, 'Jerry');

  const searchButton = getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('Jerry');
});
