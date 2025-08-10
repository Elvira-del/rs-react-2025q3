import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createRoutesStub } from 'react-router';
import App from '../../App';
import { HomePage } from '../../pages/home/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, PropsWithChildren, ReactNode } from 'react';

afterEach(() => {
  vi.unstubAllGlobals();
});

const Stub = createRoutesStub([
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: HomePage,
        children: [{ index: true }],
      },
    ],
  },
]);

const queryClient = new QueryClient();
const Wrapper: FC<PropsWithChildren<ReactNode>> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('API tests', () => {
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

    const { findByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );
    const character = await findByText('Rick Sanchez');
    expect(character).toBeInTheDocument();
  });

  test('shows error UI on network failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error')))
    );
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        expect.any(Error)
      );
    });

    errorSpy.mockRestore();
  });
});
