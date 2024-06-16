import { useEffect } from "react";
import type { Character } from "../../../types";
import { useFavoritesState, useFiltersState } from "../../../store/hooks";
import favoritesService from "../../../services/favorites";

export const useFavoriteCharacters = () => {
  const {
    filters: { showFavorites: isFavoritesFilterActive },
    setFilter
  } = useFiltersState();
  const {
    isFavorite,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    getFavoriteCharacters
  } = useFavoritesState();

  const toggleLike = (character: Character) => {
    if (isFavorite(character.id)) {
      favoritesService.save(removeFromFavorites(character.id));
    } else {
      favoritesService.save(addToFavorites(character.id, character));
    }
  };

  const showFavorites = (value: boolean) => {
    setFilter("showFavorites", value);
  };

  // Retrieve favorites from storage on first load
  useEffect(() => {
    const savedFavorites = favoritesService.get();

    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
    // eslint-disable-next-line
  }, []);

  return {
    isFavoritesFilterActive,
    isFavorite,
    toggleLike,
    showFavorites,
    getFavoriteCharacters
  };
};
