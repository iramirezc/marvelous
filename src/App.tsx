import React, { useEffect } from "react";

import { Header, Loader, SearchBar, CharactersList } from "./components";
import {
  useCharacters,
  useFavorites,
  useFetchCharacters,
  useFilters,
  useLoading,
  useSearch
} from "./hooks";

const App = () => {
  const { loading } = useLoading();
  const { characters } = useCharacters();
  const { searchCriteria, setSearchCriteria } = useSearch();
  const { favorites } = useFavorites();
  const { fetchCharacters } = useFetchCharacters();
  const { filters, filterCharacters, showOnlyFavorites } = useFilters();

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCharacters = filters.onlyFavorites
    ? filterCharacters(favorites, searchCriteria)
    : filterCharacters(characters.list, searchCriteria);

  return (
    <>
      <Header
        favoritesCount={favorites.length}
        onLogoClick={() => showOnlyFavorites(false)}
        onFavoritesClick={() => showOnlyFavorites(true)}
      />
      <Loader isLoading={loading} />
      <SearchBar
        value={searchCriteria}
        results={filteredCharacters.length}
        onChange={setSearchCriteria}
      />
      <CharactersList
        characters={filteredCharacters}
        onCharacterClick={(id) => console.log("Character", id)}
        onCharacterLike={(id) => console.log("Character like", id)}
      />
    </>
  );
};

export default App;
