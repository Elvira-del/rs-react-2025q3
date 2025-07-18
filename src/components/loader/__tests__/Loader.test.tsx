import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../Loader';

test('renders loading indicator (spinner, skeleton, etc.)', () => {
  const { getByText } = render(<Loader />);

  expect(getByText(/loading/i)).toBeInTheDocument();
});
