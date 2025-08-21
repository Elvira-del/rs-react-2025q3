import type { Character } from '../../page';
import { CharacterItem } from '../CharacterItem/CharacterItem';

export const CharactersList = ({ characters }: { characters: Character[] }) => {
  return (
    <div className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character: Character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </div>
  );
};
