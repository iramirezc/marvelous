import { useLocation } from "react-router-dom";
import type { Character } from "../../types";
import { useFavoriteCharacters } from "../shared/hooks";

export const useCharacterDetailPage = () => {
  const location = useLocation();
  const { toggleLike, isFavorite } = useFavoriteCharacters();

  const character = location.state?.character as Character | undefined;

  const onCharacterLike = () => {
    if (!character) {
      return;
    }

    toggleLike(character);
  };

  const decorateCharacter = (character: Character) => {
    return {
      ...character,
      liked: isFavorite(character.id),
      description: character.description || "No description available."
    };
  };

  return {
    character: character ? decorateCharacter(character) : undefined,
    onCharacterLike
  };
};
