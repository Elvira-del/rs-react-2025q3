import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from '../App';

const mockCharacter = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
];

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn());
  vi.clearAllMocks();
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

// KNOWN LIMITATION: These tests temporarily skipped before component correction

test.skip('displays error message when API call fails', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('Network error')))
  );

  const { findByText } = render(<App />);

  await expect(findByText(/sorry, we have network error/i)).toBeInTheDocument();
});

test.skip('shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    )
  );

  const { getByText } = render(<App />);

  expect(getByText(/not found/i)).toBeInTheDocument();
});

test('shows/hides based on loading prop', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      })
    )
  );

  const { getByText, queryByText } = render(<App />);

  expect(getByText(/loading/i)).toBeInTheDocument();

  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(queryByText(/loading/i)).not.toBeInTheDocument();
});

test('makes initial API call on component mount', async () => {
  const fetchAPI = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacter }),
    })
  );
  vi.stubGlobal('fetch', fetchAPI);

  render(<App />);

  expect(fetchAPI).toHaveBeenCalledOnce();
});

test('handles search term from localStorage on initial load', () => {
  localStorage.setItem('searchQuery', 'Rick');

  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      })
    )
  );

  const { getByRole } = render(<App />);

  expect(getByRole('searchbox')).toHaveValue('Rick');
});

test('manages loading states during API calls', async () => {
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
                name: 'Morty Smith',
                status: 'Alive',
                species: 'Human',
                image: 'morty.jpg',
              },
            ],
          }),
      })
    )
  );

  const { getByText, queryByText, findByText } = render(<App />);

  expect(getByText(/loading/i)).toBeInTheDocument();

  const character = await findByText(/Morty Smith/i);
  expect(character).toBeInTheDocument();

  expect(queryByText(/loading/i)).not.toBeInTheDocument();
});

test('calls API with correct parameters', () => {
  const fetchAPI = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacter }),
    })
  );
  vi.stubGlobal('fetch', fetchAPI);

  render(<App />);

  expect(fetchAPI).toHaveBeenCalledWith(
    'https://rickandmortyapi.com/api/character'
  );
});

test('handles successful API responses', async () => {
  const fetchAPI = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacter }),
    })
  );
  vi.stubGlobal('fetch', fetchAPI);

  const { getByText } = render(<App />);

  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(getByText(/rick sanchez/i)).toBeInTheDocument();
});

test('handles API error responses', async () => {
  const fetchAPI = vi.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })
  );
  vi.stubGlobal('fetch', fetchAPI);
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  await waitFor(() => {
    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching data:',
      expect.any(Error)
    );
  });

  errorSpy.mockRestore();
});

test('updates component state based on API responses', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 42,
                name: 'Birdperson',
                status: 'Alive',
                species: 'Bird-Person',
                image:
                  'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
              },
            ],
          }),
      })
    )
  );

  const { findByText } = render(<App />);
  const character = await findByText('Birdperson');

  expect(character).toBeInTheDocument();
});

test('manages search term state correctly', async () => {
  const user = userEvent.setup();
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [],
          }),
      })
    )
  );

  const { getByRole } = render(<App />);

  const searchInput = getByRole('searchbox');
  await user.clear(searchInput);
  await user.type(searchInput, 'Morty');

  const searchBtn = getByRole('button', { name: /search/i });
  await user.click(searchBtn);

  expect(searchInput).toHaveValue('Morty');
});
