import type { Character } from "../types";

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

export const setFavorites = (favorites: Character[]) => ({
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

export const setOnlyFavoritesFilter = (onlyFavorites: boolean) => ({
  type: "SET_ONLY_FAVORITES_FILTER",
  payload: onlyFavorites
});
