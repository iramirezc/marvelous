import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoriteCharacters } from "../shared/hooks";
import { useFetchCharacters, useSearchBar } from "./hooks";
import { Character } from "../../types";

export const useCharactersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    loading,
    characters: initialCharacters,
    fetchCharacters
  } = useFetchCharacters();
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

  const getCharacterFromList = (characterId: string) => {
    return getCharactersList().find(
      (character) => character.id === characterId
    );
  };

  const onCharacterLike = (characterId: string) => {
    const character = getCharacterFromList(characterId);

    if (!character) {
      return;
    }

    toggleLike(character);
  };

  const onCharacterClick = (characterId: string) => {
    const character = getCharacterFromList(characterId);

    if (!character) {
      // TODO: Handle this corner case by showing a 404 page?
      return;
    }

    navigate(`/character/${character.id}`, { state: { character } });
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
    loading,
    isSearching,
    searchCriteria,
    isFavoritesFilterActive,
    onCharacterLike,
    onCharacterClick,
    getCharactersList,
    onChangeSearchCriteria
  };
};
