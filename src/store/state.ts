import { Character } from "../types";

export type AppState = {
  loading: boolean;
  characters: {
    list: Character[];
  };
  filters: {
    searchCriteria: string;
    onlyFavorites: boolean;
  };
};

export const initialState: AppState = {
  loading: false,
  characters: {
    list: []
  },
  filters: {
    searchCriteria: "",
    onlyFavorites: false
  }
};
