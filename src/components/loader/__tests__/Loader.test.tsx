import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader tests', () => {
  test('renders loading indicator (spinner, skeleton, etc.)', () => {
    const { getByText } = render(<Loader />);

    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  test('has appropriate ARIA labels for screen readers, if your loading indicator has aria-label', () => {
    const { getByRole } = render(<Loader />);

    expect(getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });
});
