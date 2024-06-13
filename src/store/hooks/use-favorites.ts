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

  const isFavorite = (id: string) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  return {
    favorites,
    isFavorite,
    setFavorites
  };
};
