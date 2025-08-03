import { useMemo } from 'react';
import type { Character, ServerData } from '../App';

export function useFilter(data: ServerData, query: string): Character[] {
  const filteredData = useMemo(() => {
    const characters = data.results;

    return characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  return filteredData;
}
