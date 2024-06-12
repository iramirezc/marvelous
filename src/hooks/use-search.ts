import { setSearchCriteria as setSearchCriteriaAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";

export const useSearch = () => {
  const {
    filters: { searchCriteria }
  } = useAppState();
  const dispatch = useAppDispatch();

  const setSearchCriteria = (
    ...args: Parameters<typeof setSearchCriteriaAction>
  ) => {
    dispatch(setSearchCriteriaAction(...args));
  };

  return {
    searchCriteria,
    setSearchCriteria
  };
};
