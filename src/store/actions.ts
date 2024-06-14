import type { Character, Favorites } from "../types";

// TODO: Create action creators for better type checking
export type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export const setLoading = (loading: boolean) => ({
  type: "SET_LOADING",
  payload: loading
});

export const setCharacters = (characters: Character[]) => ({
  type: "SET_CHARACTERS",
  payload: characters
});

export const setFavorites = (favorites: Favorites) => ({
  type: "SET_FAVORITES",
  payload: favorites
});

export const setSearchCriteria = (searchCriteria: string) => ({
  type: "SET_SEARCH_CRITERIA",
  payload: searchCriteria
});

export const setIsSearching = (isSearching: boolean) => ({
  type: "SET_IS_SEARCHING",
  payload: isSearching
});

export const setSearchResults = (results: Character[]) => ({
  type: "SET_SEARCH_RESULTS",
  payload: results
});

export const setFilter = (filter: string, value: boolean) => ({
  type: "SET_FILTER",
  payload: { filter, value }
});
