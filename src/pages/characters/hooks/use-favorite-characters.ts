import { useEffect } from "react";
import { useFavorites } from "../../../store/hooks";
import favoritesService from "../../../services/favorites";

export const useFavoriteCharacters = () => {
  const { favorites, isFavorite, setFavorites } = useFavorites();

  const updateFavorites = (newFavorites: string[]) => {
    favoritesService.save(newFavorites);
    setFavorites(newFavorites);
  };

  const toggleLike = (characterId: string) => {
    if (isFavorite(characterId)) {
      updateFavorites(favorites.filter((id) => id !== characterId));
    } else {
      updateFavorites([...favorites, characterId]);
    }
  };

  useEffect(() => {
    const savedFavorites = favoritesService.get();

    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
    // eslint-disable-next-line
  }, []);

  return {
    favorites,
    isFavorite,
    toggleLike
  };
};
