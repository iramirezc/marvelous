import type { Character, Favorites } from "../types";

export type AppState = {
  loading: boolean;
  characters: {
    list: Character[];
    favorites: Favorites;
  };
  filters: {
    showFavorites: boolean;
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
    showFavorites: false
  },
  search: {
    searchCriteria: "",
    isSearching: false,
    results: []
  }
};
