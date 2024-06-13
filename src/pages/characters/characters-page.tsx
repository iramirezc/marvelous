import React, { useEffect } from "react";
import { CharactersList, SearchBar } from "../../components";
import { useFetchCharacters } from "./hooks/use-fetch-characters";
import { useSearchBar } from "./hooks/use-search-bar";
import "./characters-page.css";

const CharactersPage = () => {
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearchBar();
  const { characters: firstLoad, fetchCharacters } = useFetchCharacters();

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
