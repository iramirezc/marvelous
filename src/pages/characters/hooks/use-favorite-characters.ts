import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Character } from "../../../types";
import { useFavorites, useFilters } from "../../../store/hooks";
import favoritesService from "../../../services/favorites";

export const useFavoriteCharacters = () => {
  const location = useLocation();
  const {
    filters: { showFavorites },
    setFilter
  } = useFilters();
  const {
    isFavorite,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    getFavoriteCharacters
  } = useFavorites();

  const toggleLike = (character: Character) => {
    if (isFavorite(character.id)) {
      favoritesService.save(removeFromFavorites(character.id));
    } else {
      favoritesService.save(addToFavorites(character.id, character));
    }
  };

  // Retrieve favorites from storage on first load
  useEffect(() => {
    const savedFavorites = favoritesService.get();

    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
    // eslint-disable-next-line
  }, []);

  // Toggle filter to show only favorites
  useEffect(() => {
    setFilter("showFavorites", Boolean(location.state?.favorites));
    // eslint-disable-next-line
  }, [location.state]);

  return {
    showFavorites,
    toggleLike,
    isFavorite,
    getFavoriteCharacters
  };
};
