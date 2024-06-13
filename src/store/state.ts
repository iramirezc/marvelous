import type { Character } from "../types";

export type AppState = {
  loading: boolean;
  characters: {
    list: Character[];
  };
  filters: {
    onlyFavorites: boolean;
  };
  search: {
    searchCriteria: string;
    isSearching: boolean;
    results: Character[];
  };
};

export type PreloadedState = Partial<AppState>;

export const initialState: AppState = {
  loading: false,
  characters: {
    list: []
  },
  filters: {
    onlyFavorites: false
  },
  search: {
    searchCriteria: "",
    isSearching: false,
    results: []
  }
};
