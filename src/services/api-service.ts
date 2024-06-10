import { getPublicApiEndpoint, getApiParams } from "../utils/api-utils";

const FETCH_CHARACTERS_LIMIT = 50;

export const fetchCharacters = async () => {
  const response = await fetch(
    `${getPublicApiEndpoint("characters")}?${new URLSearchParams(getApiParams({ limit: FETCH_CHARACTERS_LIMIT }))}`
  );

  const data = await response.json();

  return data.data.results;
};
