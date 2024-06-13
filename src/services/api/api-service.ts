import { getPublicApiEndpoint, getApiParams } from "../../utils/api-utils";

const CHARACTERS_LIMIT = 50;

const getCharacters = async <T>() => {
  const response = await fetch(
    `${getPublicApiEndpoint("characters")}?${new URLSearchParams(getApiParams({ limit: CHARACTERS_LIMIT }))}`
  );

  const data = await response.json();

  return data.data.results as T;
};

const apiService = { getCharacters };

export default apiService;
