import { type FC } from 'react';
import type { Character } from '../../../App';

type ResultsListProps = {
  data: Character[];
};

export const ResultsList: FC<ResultsListProps> = ({ data }) => {
  return (
    <ul className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
      {data.map(({ id, name, status, species, image }) => (
        <li
          key={id}
          className="flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
        >
          <div className="flex flex-1 flex-col items-center gap-1 md:items-start">
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-indigo-500">Status:</span>{' '}
              {status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-indigo-500">Species:</span>{' '}
              {species}
            </p>
          </div>

          <img
            src={image}
            alt={name}
            className="h-24 w-24 rounded-xl border border-gray-200 object-cover"
          />
        </li>
      ))}
    </ul>
  );
};
