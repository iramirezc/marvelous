import React, { useEffect } from "react";
import { CharactersList, SearchBar } from "../../components";
import {
  useCharacters,
  useFavorites,
  useFetchCharacters,
  useFilters,
  useSearch
} from "../../hooks";
import "./characters-page.css";

const CharactersPage = () => {
  const { characters } = useCharacters();
  const { searchCriteria, setSearchCriteria } = useSearch();
  const { favorites, toggleLikeCharacter } = useFavorites();
  const { filters, filterCharacters } = useFilters();
  const { fetchCharacters } = useFetchCharacters();

  useEffect(() => {
    fetchCharacters();
    //  eslint-disable-next-line
  }, []);

  const filteredCharacters = filters.onlyFavorites
    ? filterCharacters(favorites, searchCriteria)
    : filterCharacters(characters, searchCriteria);

  return (
    <main className="characters-page">
      <SearchBar
        value={searchCriteria}
        results={filteredCharacters.length}
        onChange={setSearchCriteria}
      />
      <CharactersList
        characters={filteredCharacters}
        onCharacterClick={(id) => console.log("Character", id)}
        onCharacterLike={toggleLikeCharacter}
      />
    </main>
  );
};

export default CharactersPage;
