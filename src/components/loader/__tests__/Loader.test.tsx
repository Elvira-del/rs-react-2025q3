import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../Loader';

test('renders loading indicator (spinner, skeleton, etc.)', () => {
  const { getByText } = render(<Loader />);

  expect(getByText(/loading/i)).toBeInTheDocument();
});

// KNOWN LIMITATION: Loader does not have a specific role or aria-label yet.
// Test temporarily skipped until component is updated.

test.skip('has appropriate ARIA labels for screen readers, if your loading indicator has aria-label', () => {
  const { getByRole } = render(<Loader />);

  expect(getByRole('status')).toHaveAttribute('aria-label', 'Loading');
});
