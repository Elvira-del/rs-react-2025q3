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
