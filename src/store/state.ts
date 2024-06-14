import type { Character, Favorites } from "../types";

export type AppState = {
  loading: boolean;
  characters: {
    list: Character[];
    favorites: Favorites;
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
    list: [],
    favorites: { ids: [], entities: {} }
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
