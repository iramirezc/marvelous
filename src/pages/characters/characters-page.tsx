import React, { useEffect } from "react";
import { CharactersList, SearchBar } from "../../components";
import { useFetchCharacters } from "./hooks/use-fetch-characters";
import { useSearchBar } from "./hooks/use-search-bar";
import "./characters-page.css";
import { useFavoriteCharacters } from "./hooks/use-favorite-characters";

const CharactersPage = () => {
  const { characters, fetchCharacters } = useFetchCharacters();
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearchBar();
  const { isFavorite, toggleLike: toggleLikeCharacter } =
    useFavoriteCharacters();

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

  return (
    <main className="characters-page">
      <SearchBar
        value={searchCriteria}
        results={charactersList.length}
        isSearching={isSearching}
        onChange={onChangeSearchCriteria}
      />
      <CharactersList
        characters={charactersList}
        onCharacterClick={(id) => console.log("Character->click", id)}
        onCharacterLike={toggleLikeCharacter}
      />
    </main>
  );
};

export default CharactersPage;
