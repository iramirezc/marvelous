import React from "react";
import { CharactersList, SearchBar } from "../../components";

import "./characters-page.css";
import { useCharactersPage } from "./hooks/use-characters-page";

const CharactersPage = () => {
  const {
    isSearching,
    searchCriteria,
    charactersList,
    toggleLike,
    showCharacterDetails,
    onChangeSearchCriteria
  } = useCharactersPage();

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
        onCharacterClick={showCharacterDetails}
        onCharacterLike={toggleLike}
      />
    </main>
  );
};

export default CharactersPage;
