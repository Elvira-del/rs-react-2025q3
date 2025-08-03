import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import SearchField from '../SearchField';

test('renders search input', () => {
  const { getByRole } = render(
    <SearchField searchQuery="" onQueryChange={() => {}} />
  );

  const searchInput = getByRole('searchbox');

  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveRole('searchbox');
});
