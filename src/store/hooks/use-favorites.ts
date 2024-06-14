import { setFavorites as setFavoritesAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useFavorites = () => {
  const {
    characters: { favorites }
  } = useAppState();
  const dispatch = useAppDispatch();

  const setFavorites = (...args: Parameters<typeof setFavoritesAction>) => {
    dispatch(setFavoritesAction(...args));
  };

  const isFavorite = (characterId: string) => {
    return favorites.ids.some((id) => id === characterId);
  };

  const getFavoriteById = (characterId: string) => {
    return favorites.entities[characterId] ?? null;
  };

  const getFavoritesCount = () => {
    return favorites.ids.length;
  };

  const getFavoritesIds = () => {
    return favorites.ids;
  };

  return {
    favorites,
    isFavorite,
    setFavorites,
    getFavoritesIds,
    getFavoriteById,
    getFavoritesCount
  };
};
