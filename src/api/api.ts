export const fetchCharacters = async (page: number) => {
  const url = new URL('https://rickandmortyapi.com/api/character/');
  url.searchParams.append('page', page.toString());

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
