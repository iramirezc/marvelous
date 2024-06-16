import type { Character, Favorites } from "../../types";
import { setFavorites as setFavoritesAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useFavoritesState = () => {
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

  const getFavoriteCharacters = () => {
    return getFavoritesIds().map(getFavoriteById);
  };

  const addToFavorites = (characterId: string, character: Character) => {
    const newFavorites = {
      ids: [...favorites.ids, characterId],
      entities: {
        ...favorites.entities,
        [characterId]: {
          ...character,
          liked: true
        }
      }
    };

    setFavorites(newFavorites);

    return newFavorites;
  };

  const removeFromFavorites = (characterId: string) => {
    const newFavorites = {
      ids: favorites.ids.filter((id) => id !== characterId),
      entities: {
        ...Object.keys(favorites.entities).reduce(
          (newEntities, id) => {
            if (id !== characterId) {
              newEntities[id] = favorites.entities[id];
            }

            return newEntities;
          },
          {} as Favorites["entities"]
        )
      }
    };

    setFavorites(newFavorites);

    return newFavorites;
  };

  return {
    favorites,
    isFavorite,
    setFavorites,
    addToFavorites,
    getFavoritesIds,
    getFavoriteById,
    getFavoritesCount,
    removeFromFavorites,
    getFavoriteCharacters
  };
};
