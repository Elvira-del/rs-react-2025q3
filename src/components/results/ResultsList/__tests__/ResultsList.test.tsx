import { beforeEach, expect, test, vi } from 'vitest';
import ResultsList from '../ResultsList';
import { render } from '@testing-library/react';

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

test('renders correct number of items when data is provided', () => {
  const { getAllByRole } = render(<ResultsList data={mockCharacters} />);

  const listItems = getAllByRole('listitem');

  expect(listItems).toHaveLength(mockCharacters.length);
});

test('displays `no results` message when data array is empty', () => {
  const { getByText } = render(<ResultsList data={[]} />);

  expect(getByText('No results found')).toBeInTheDocument();
});
