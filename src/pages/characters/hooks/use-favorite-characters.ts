import { useEffect } from "react";
import { useCharacters, useFavorites } from "../../../store/hooks";
import favoritesService from "../../../services/favorites";

export const useFavoriteCharacters = () => {
  const {
    favorites,
    isFavorite,
    setFavorites,
    addToFavorites,
    removeFromFavorites
  } = useFavorites();
  const { getCharacterById } = useCharacters();

  const toggleLike = (characterId: string) => {
    const character = getCharacterById(characterId);

    if (!character) {
      return;
    }

    if (isFavorite(characterId)) {
      favoritesService.save(removeFromFavorites(characterId));
    } else {
      favoritesService.save(addToFavorites(characterId, character));
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
