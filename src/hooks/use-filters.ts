import { setOnlyFavoritesFilter as setOnlyFavoritesFilterAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";
import type { Character } from "../types";

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
