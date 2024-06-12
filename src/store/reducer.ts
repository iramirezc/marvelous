import { Action, AppState } from "./types";

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return {
        ...state,
        characters: {
          list: action.payload
        }
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };

    case "SET_SEARCH_CRITERIA":
      return {
        ...state,
        filters: {
          searchCriteria: action.payload
        }
      };

    default:
      return state;
  }
};
