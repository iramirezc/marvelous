import React, { useEffect } from "react";
import { CharactersList, SearchBar } from "../../components";
import { useCharacters, useFetchCharacters, useSearch } from "../../hooks";
import "./characters-page.css";

const CharactersPage = () => {
  const { characters: firstLoad } = useCharacters();
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearch();
  const { fetchCharacters } = useFetchCharacters();

  useEffect(() => {
    fetchCharacters();
    //  eslint-disable-next-line
  }, []);

  const characters = searchCriteria ? results : firstLoad;

  return (
    <main className="characters-page">
      <SearchBar
        value={searchCriteria}
        results={characters.length}
        isSearching={isSearching}
        onChange={onChangeSearchCriteria}
      />
      <CharactersList
        characters={characters}
        onCharacterClick={(id) => console.log("Character->click", id)}
        onCharacterLike={(id) => console.log("Character->like", id)}
      />
    </main>
  );
};

export default CharactersPage;
