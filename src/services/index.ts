const BASE_URL = "https://www.breakingbadapi.com/api";

export const getCharacterList = (): Promise<Response> => {
  return fetch(`${BASE_URL}/characters`);
};

export const getUniqueCharacter = (char_id: string): Promise<Response> => {
  return fetch(`${BASE_URL}/characters/${char_id}`);
};

export const getRandomQuote = (formattedName: string): Promise<Response> => {
  return fetch(`${BASE_URL}/quote/random?author=${formattedName}`);
};
