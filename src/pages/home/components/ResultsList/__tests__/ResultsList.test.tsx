import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ResultsList } from '../ResultsList';
import { createRoutesStub } from 'react-router';
import { ResultsItem } from '../../ResultsItem/ResultsItem';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 3,
    name: 'Birdperson',
    status: 'Dead',
    species: 'Bird-Person',
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const Wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Results list tests', () => {
  test('renders correct number of items when data is provided', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsList data={mockCharacters} />,
      },
    ]);

    const { getAllByRole } = render(<Stub />);

    const listItems = getAllByRole('listitem');

    expect(listItems).toHaveLength(mockCharacters.length);
  });

  test.skip('displays `no results` message when data array is empty', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsList data={[]} />,
      },
    ]);
    const { getByText } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    expect(getByText(/no results found/i)).toBeInTheDocument();
  });

  test('correctly displays item names and descriptions', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsList data={mockCharacters} />,
      },
    ]);

    const { getAllByRole } = render(<Stub />);

    const listItems = getAllByRole('listitem');

    const names = listItems.map(
      (item) => item.querySelector('h2')?.textContent
    );
    const statuses = listItems.map(
      (item) => item.querySelector('p')?.textContent
    );

    expect(names).toEqual(mockCharacters.map((char) => char.name));
    expect(statuses).toEqual(
      mockCharacters.map((char) => `Status: ${char.status}`)
    );
  });

  test('handles missing or undefined data gracefully', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsList data={[]} />,
      },
    ]);

    const { getByRole } = render(
      <Wrapper>
        <Stub />
      </Wrapper>
    );

    const list = getByRole('list');
    const listItem = list.querySelectorAll('li');

    expect(listItem).toHaveLength(0);
  });

  test('displays item name and description correctly', () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <ResultsItem character={mockCharacter} />,
      },
    ]);
    const { getByTestId } = render(<Stub />);

    const name = getByTestId('character-name');
    const status = getByTestId('character-status');
    const species = getByTestId('character-species');

    expect(name).toHaveTextContent(mockCharacter.name);
    expect(status).toHaveTextContent(mockCharacter.status);
    expect(species).toHaveTextContent(mockCharacter.species);
  });
});
