import { setFilter as setFilterAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useFiltersState = () => {
  const { filters } = useAppState();
  const dispatch = useAppDispatch();

  const setFilter = (...args: Parameters<typeof setFilterAction>) => {
    dispatch(setFilterAction(...args));
  };

  return {
    filters,
    setFilter
  };
};
