import {
  setSearchCriteria as setSearchCriteriaAction,
  setIsSearching as setIsSearchingAction,
  setSearchResults as setSearchResultsAction
} from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useSearch = () => {
  const {
    search: { searchCriteria, isSearching, results }
  } = useAppState();
  const dispatch = useAppDispatch();

  const setSearchCriteria = (
    ...args: Parameters<typeof setSearchCriteriaAction>
  ) => {
    dispatch(setSearchCriteriaAction(...args));
  };

  const setIsSearching = (...args: Parameters<typeof setIsSearchingAction>) => {
    dispatch(setIsSearchingAction(...args));
  };

  const setSearchResults = (
    ...args: Parameters<typeof setSearchResultsAction>
  ) => {
    dispatch(setSearchResultsAction(...args));
  };

  return {
    searchCriteria,
    isSearching,
    results,
    setSearchCriteria,
    setIsSearching,
    setSearchResults
  };
};
