import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../../../app/store';
import type { Character } from '../../HomePage';

type ResultsListProps = {
  data: Character[];
};

export const ResultsList: FC<ResultsListProps> = ({ data }) => {
  const selectedItems = useStore((state) => state.selectedItems);
  const onSelectItem = useStore((state) => state.addNewSelectedItems);
  const navigate = useNavigate();

  const handleSelectItem = (character: Character, checked: boolean) => {
    if (checked) {
      onSelectItem(character);
    }
  };

  console.log('Selected items:', selectedItems);

  return (
    <ul className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
      {data.map((character) => (
        <li
          key={character.id}
          className="flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
          onClick={() => navigate(`/${character.id}`)}
        >
          <input
            type="checkbox"
            checked={selectedItems.some((item) => item.id === character.id)}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleSelectItem(character, e.target.checked)}
            className="mr-4 h-5 w-5 shrink-0 accent-indigo-500"
            aria-label={`Select ${character.name}`}
          />
          <div className="flex flex-1 flex-col items-center gap-1 md:items-start">
            <h2 className="text-lg font-semibold text-gray-900">
              {character.name}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-indigo-500">Status:</span>{' '}
              {character.status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-indigo-500">Species:</span>{' '}
              {character.species}
            </p>
          </div>

          <img
            src={character.image}
            alt={character.name}
            className="h-24 w-24 rounded-xl border border-gray-200 object-cover"
          />
        </li>
      ))}
    </ul>
  );
};
