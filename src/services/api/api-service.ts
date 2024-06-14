import { getPublicApiEndpoint, getApiParams } from "../../utils/api-utils";

const CHARACTERS_LIMIT = 50;
const COMICS_LIMIT = 20;

const getCharacters = async <T>(params?: { nameStartsWith: string }) => {
  const endpoint = getPublicApiEndpoint("characters");
  const allParams = new URLSearchParams(
    getApiParams({ ...params, limit: CHARACTERS_LIMIT })
  );

  const response = await fetch(new URL(`${endpoint}?${allParams}`));

  const data = await response.json();

  return data.data.results as T;
};

const getComicsByCharacterId = async <T>(params: { characterId: string }) => {
  const endpoint = getPublicApiEndpoint(
    `characters/${params.characterId}/comics`
  );
  const allParams = new URLSearchParams(getApiParams({ limit: COMICS_LIMIT }));

  const response = await fetch(new URL(`${endpoint}?${allParams}`));

  const data = await response.json();

  return data.data.results as T;
};

const apiService = { getCharacters, getComicsByCharacterId };

export default apiService;
