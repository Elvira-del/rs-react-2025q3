import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import SearchBtn from '../SearchBtn';

test('renders search button', () => {
  const { getByRole } = render(<SearchBtn />);

  const searchButton = getByRole('button', { name: 'Search' });

  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeEnabled();
});
