import { useEffect } from "react";
import { useFavoriteCharacters } from "./use-favorite-characters";
import { useFetchCharacters } from "./use-fetch-characters";
import { useSearchBar } from "./use-search-bar";

export const useCharactersPage = () => {
  const { characters, fetchCharacters } = useFetchCharacters();
  const { isFavorite, toggleLike } = useFavoriteCharacters();
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearchBar();

  const showCharacterDetails = (id: string) => {
    console.log("Character->click", id);
  };

  useEffect(() => {
    fetchCharacters();
    //  eslint-disable-next-line
  }, []);

  const charactersList = (searchCriteria ? results : characters).map(
    (character) => ({
      ...character,
      liked: isFavorite(character.id)
    })
  );

  return {
    isSearching,
    searchCriteria,
    charactersList,
    toggleLike,
    showCharacterDetails,
    onChangeSearchCriteria
  };
};
