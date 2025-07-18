import { render } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from '../App';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('shows loading state while fetching data', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => new Promise(() => {}))
  );

  const { getByText } = render(<App />);

  expect(getByText(/loading/i)).toBeInTheDocument();
});
