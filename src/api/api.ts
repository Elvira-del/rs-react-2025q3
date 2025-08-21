const BASE_URL = 'https://rickandmortyapi.com/api/';

export const fetchCharacters = async (page: number) => {
  const url = new URL(`${BASE_URL}character/`);
  url.searchParams.append('page', page.toString());

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const fetchCharacter = async (id: string | null) => {
  const url = new URL(`${BASE_URL}character/${id}`);
  url.searchParams.append('id', id || '');

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
