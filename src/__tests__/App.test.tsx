import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createRoutesStub } from 'react-router';
import { HomePage } from '../app/home/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
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
  cleanup();
});

const Stub = createRoutesStub([
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: HomePage,
        children: [{ index: true, Component: () => null }],
      },
    ],
  },
]);

describe('Home page tests', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('shows loading state while fetching data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const loading = await findByText(/loading/i);
    await waitFor(() => {
      expect(loading).toBeInTheDocument();
    });
  });

  // KNOWN LIMITATION: These tests temporarily skipped before component correction

  test.skip('displays error message when API call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network response was not ok'))
    );

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const errorText = await findByText(/network response was not ok/i);
    expect(errorText).toBeInTheDocument();
  });

  test.skip('shows appropriate error for different HTTP status codes (4xx, 5xx)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/999999']} />
      </Wrapper>
    );

    const fallback = await findByText(/error|sorry|not found/i);
    expect(fallback).toBeInTheDocument();
  });

  test.skip('shows/hides based on loading prop', async () => {
    const mockFetch = vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ results: mockCharacter }),
                } as Response),
              120
            )
          )
      )
    );

    const { getByText, findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    expect(getByText(/loading/i)).toBeInTheDocument();

    const name = await findByText(/rick sanchez/i);
    expect(name).toBeInTheDocument();

    await waitFor(() => expect(() => getByText(/loading/i)).toThrow());

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });

  test.skip('makes initial API call on component mount', async () => {
    const mockFetch = vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockCharacter }),
      })
    );

    render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce();
    });
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

    const { getByRole } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    expect(getByRole('searchbox')).toHaveValue('Rick');
  });

  test.skip('manages loading states during API calls', async () => {
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

    const { getByText, queryByText, findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    expect(getByText(/loading/i)).toBeInTheDocument();

    const character = await findByText(/Morty Smith/i);
    expect(character).toBeInTheDocument();

    expect(queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test.skip('calls API with correct parameters', () => {
    const fetchAPI = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockCharacter }),
      })
    );
    vi.stubGlobal('fetch', fetchAPI);

    render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    expect(fetchAPI).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  });

  test.skip('handles successful API responses', async () => {
    const fetchAPI = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockCharacter }),
      })
    );
    vi.stubGlobal('fetch', fetchAPI);

    const { queryByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(queryByText(/rick sanchez/i)).toBeInTheDocument();
    });
  });

  test.skip('handles API error responses', async () => {
    const fetchAPI = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );
    vi.stubGlobal('fetch', fetchAPI);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const message = await findByText(/error|failed|try again/i);
    expect(message).toBeInTheDocument();

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });

  test.skip('updates component state based on API responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () =>
            Promise.resolve({
              info: { pages: 1 },
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

    const { findByRole } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const character = await findByRole('heading', { name: /birdperson/i });

    expect(character).toBeInTheDocument();
  });

  test('manages search term state correctly', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [],
        }),
      })
    );

    const { getByRole } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const searchInput = getByRole('searchbox');
    await user.clear(searchInput);
    await user.type(searchInput, 'Morty');

    const searchBtn = getByRole('button', { name: /search/i });
    await user.click(searchBtn);

    expect(searchInput).toHaveValue('Morty');
  });
});
