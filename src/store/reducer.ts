import type { AppState } from "./state";
import type { Action } from "./actions";

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    /* Loading */
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };

    /* Characters */
    case "SET_CHARACTERS":
      return {
        ...state,
        characters: {
          list: action.payload
        }
      };

    /* Searching */
    case "SET_SEARCH_CRITERIA":
      return {
        ...state,
        search: {
          ...state.search,
          searchCriteria: action.payload
        }
      };

    case "SET_IS_SEARCHING":
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: action.payload
        }
      };

    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload
        }
      };

    /* Filters */
    case "SET_ONLY_FAVORITES_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          onlyFavorites: action.payload
        }
      };

    /* Favorites */
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
