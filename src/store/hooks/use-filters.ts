import type { Character } from "../../types";
import { setOnlyFavoritesFilter as setOnlyFavoritesFilterAction } from "../actions";
import { useAppState } from "./use-app-state";
import { useAppDispatch } from "./use-app-dispatch";

const filterCharacters = (characters: Character[], searchCriteria: string) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(searchCriteria.toLowerCase())
  );

export const useFilters = () => {
  const { filters } = useAppState();
  const dispatch = useAppDispatch();

  const showOnlyFavorites = (
    ...args: Parameters<typeof setOnlyFavoritesFilterAction>
  ) => {
    dispatch(setOnlyFavoritesFilterAction(...args));
  };

  return {
    filters,
    showOnlyFavorites,
    filterCharacters
  };
};
