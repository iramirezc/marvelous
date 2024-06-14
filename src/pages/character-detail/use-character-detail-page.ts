import { useLocation } from "react-router-dom";
import type { Character } from "../../types";
import { useFavoriteCharacters } from "../shared/hooks";

export const useCharacterDetailPage = () => {
  const location = useLocation();
  const { toggleLike } = useFavoriteCharacters();

  const character = location.state?.character as Character | undefined;

  const onCharacterLike = () => {
    if (!character) {
      return;
    }

    toggleLike(character);
    // optimistic update
    character.liked = !character.liked;
  };

  return {
    character,
    onCharacterLike
  };
};
