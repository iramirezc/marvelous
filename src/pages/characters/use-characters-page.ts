import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoriteCharacters } from "./hooks/use-favorite-characters";
import { useFetchCharacters } from "./hooks/use-fetch-characters";
import { useSearchBar } from "./hooks/use-search-bar";
import { Character } from "../../types";

export const useCharactersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { characters: initialCharacters, fetchCharacters } =
    useFetchCharacters();
  const {
    isFavoritesFilterActive,
    isFavorite,
    toggleLike,
    showFavorites,
    getFavoriteCharacters
  } = useFavoriteCharacters();
  const {
    results,
    isSearching,
    searchCriteria,
    clearSearch,
    onChangeSearchCriteria
  } = useSearchBar();

  const onCharacterClick = (id: string) => {
    navigate(`/character/${id}`);
  };

  const selectCharactersList = () => {
    if (searchCriteria) {
      return results;
    }

    if (isFavoritesFilterActive) {
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

  // Clear search and navigate to favorites
  useEffect(() => {
    clearSearch();
    showFavorites(Boolean(location.state?.favorites));
    // eslint-disable-next-line
  }, [location.state]);

  return {
    isSearching,
    searchCriteria,
    isFavoritesFilterActive,
    onCharacterLike,
    onCharacterClick,
    getCharactersList,
    onChangeSearchCriteria
  };
};
