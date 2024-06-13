import React, { useEffect } from "react";
import { CharactersList, SearchBar } from "../../components";
import { useFetchCharacters } from "./hooks/use-fetch-characters";
import { useSearchBar } from "./hooks/use-search-bar";
import "./characters-page.css";

const CharactersPage = () => {
  const { isSearching, results, searchCriteria, onChangeSearchCriteria } =
    useSearchBar();
  const { characters, fetchCharacters } = useFetchCharacters();

  useEffect(() => {
    fetchCharacters();
    //  eslint-disable-next-line
  }, []);

  const charactersList = searchCriteria ? results : characters;

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
        onCharacterLike={(id) => console.log("Character->like", id)}
      />
    </main>
  );
};

export default CharactersPage;
