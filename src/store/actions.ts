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

export const setSearchCriteria = (searchCriteria: string) => ({
  type: "SET_SEARCH_CRITERIA",
  payload: searchCriteria
});

export const setOnlyFavoritesFilter = (onlyFavorites: boolean) => ({
  type: "SET_ONLY_FAVORITES_FILTER",
  payload: onlyFavorites
});

export const toggleLikeCharacter = (id: string) => ({
  type: "TOGGLE_LIKE_CHARACTER",
  payload: id
});
