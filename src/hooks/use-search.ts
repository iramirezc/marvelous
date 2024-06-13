import {
  setSearchCriteria as setSearchCriteriaAction,
  setIsSearching as setIsSearchingAction,
  setSearchResults as setSearchResultsAction
} from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";

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
