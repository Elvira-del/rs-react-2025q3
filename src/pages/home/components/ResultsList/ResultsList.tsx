import { type FC } from 'react';
import type { Character } from '../../HomePage';
import { ResultsItem } from '../ResultsItem/ResultsItem';

type ResultsListProps = {
  data: Character[];
};

export const ResultsList: FC<ResultsListProps> = ({ data }) => {
  return (
    <ul className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
      {data.map((character) => (
        <ResultsItem key={character.id} character={character} />
      ))}
    </ul>
  );
};
