import { AppState } from "./types";

export const initialState: AppState = {
  loading: false,
  characters: {
    list: []
  },
  filters: {
    searchCriteria: ""
  }
};
