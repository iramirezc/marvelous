import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Character } from "../../types";
import { useFavoriteCharacters } from "../shared/hooks";
import { useFetchComics } from "./hooks";

export const useCharacterDetailPage = () => {
  const location = useLocation();
  const { toggleLike, isFavorite } = useFavoriteCharacters();
  const { comics, loading, fetchComics } = useFetchComics();

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
      description: character.description || "No description available.",
      comics
    };
  };

  useEffect(() => {
    if (character) {
      fetchComics(character.id);
    }
    // eslint-disable-next-line
  }, []);

  return {
    loading,
    character: character ? decorateCharacter(character) : undefined,
    onCharacterLike
  };
};
