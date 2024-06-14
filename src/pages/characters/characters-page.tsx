import React from "react";
import { CharactersList, SearchBar } from "../../components";
import { useCharactersPage } from "./use-characters-page";
import "./characters-page.css";

const CharactersPage = () => {
  const {
    isSearching,
    searchCriteria,
    isFavoritesFilterActive,
    onCharacterLike,
    onCharacterClick,
    getCharactersList,
    onChangeSearchCriteria
  } = useCharactersPage();

  const charactersList = getCharactersList();

  return (
    <main className="characters-page">
      {isFavoritesFilterActive ? (
        <h2 className="favorites-header">Favorites</h2>
      ) : null}
      <SearchBar
        value={searchCriteria}
        results={charactersList.length}
        isSearching={isSearching}
        onChange={onChangeSearchCriteria}
      />
      <CharactersList
        characters={charactersList}
        onCharacterClick={onCharacterClick}
        onCharacterLike={onCharacterLike}
      />
    </main>
  );
};

export default CharactersPage;
