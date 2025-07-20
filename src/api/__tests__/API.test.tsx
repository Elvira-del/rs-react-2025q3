import { render, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import App from '../../App';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('renders data on successful API call', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1,
                name: 'Rick Sanchez',
                status: 'Alive',
                species: 'Human',
                image: '',
              },
            ],
          }),
      })
    )
  );

  const { findByText } = render(<App />);
  const character = await findByText('Rick Sanchez');
  expect(character).toBeInTheDocument();
});

test('shows error UI on network failure', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('Network error')))
  );
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  await waitFor(() => {
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching data:',
      expect.any(Error)
    );
  });

  errorSpy.mockRestore();
});
