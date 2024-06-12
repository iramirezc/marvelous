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
          ...state.filters,
          searchCriteria: action.payload
        }
      };

    case "SET_ONLY_FAVORITES_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          onlyFavorites: action.payload
        }
      };

    case "TOGGLE_LIKE_CHARACTER":
      return {
        ...state,
        characters: {
          list: state.characters.list.map((character) => {
            if (character.id === action.payload) {
              return {
                ...character,
                liked: !character.liked
              };
            }

            return character;
          })
        }
      };

    default:
      return state;
  }
};
