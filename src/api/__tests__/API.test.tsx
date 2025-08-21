import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createRoutesStub } from 'react-router';
import App from '../../App';
import { HomePage } from '../../app/home/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const Wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('API tests', () => {
  test('renders data on successful API call', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () =>
            Promise.resolve({
              results: [
                {
                  id: 1,
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  image:
                    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
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
    const character = await findByRole('heading', { name: /rick sanchez/i });
    expect(character).toBeInTheDocument();
  });

  test('shows error UI on network failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const message = await findByText(/error|failed|try again/i);
    expect(message).toBeInTheDocument();
  });
});
