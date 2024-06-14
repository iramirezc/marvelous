import { useEffect } from "react";
import { useFavoriteCharacters } from "./hooks/use-favorite-characters";
import { useFetchCharacters } from "./hooks/use-fetch-characters";
import { useSearchBar } from "./hooks/use-search-bar";
import { Character } from "../../types";

export const useCharactersPage = () => {
  const { characters: initialCharacters, fetchCharacters } =
    useFetchCharacters();
  const { showFavorites, getFavoriteCharacters, isFavorite, toggleLike } =
    useFavoriteCharacters();
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearchBar();

  const showCharacterDetails = (id: string) => {
    console.log("Character->click", id);
  };

  const selectCharactersList = () => {
    if (searchCriteria) {
      return results;
    }

    if (showFavorites) {
      return getFavoriteCharacters();
    }

    return initialCharacters;
  };

  const decorateCharacters = (characters: Character[]) => {
    return characters.map((character) => ({
      ...character,
      liked: isFavorite(character.id)
    }));
  };

  const getCharactersList = () => {
    return decorateCharacters(selectCharactersList());
  };

  const onCharacterLike = (characterId: string) => {
    const character = getCharactersList().find(
      (character) => character.id === characterId
    );

    if (!character) {
      return;
    }

    toggleLike(character);
  };

  // Fetch characters on first load
  useEffect(() => {
    fetchCharacters();
    //  eslint-disable-next-line
  }, []);

  return {
    isSearching,
    showFavorites,
    searchCriteria,
    onCharacterLike,
    getCharactersList,
    showCharacterDetails,
    onChangeSearchCriteria
  };
};
