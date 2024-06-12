import React, { useEffect } from "react";

import { Header, Loader, SearchBar, CharactersList } from "./components";
import {
  useCharacters,
  useFavorites,
  useFetchCharacters,
  useLoading,
  useSearch
} from "./hooks";

const App = () => {
  const { loading } = useLoading();
  const { characters } = useCharacters();
  const { searchCriteria, setSearchCriteria } = useSearch();
  const { favorites } = useFavorites();
  const { fetchCharacters } = useFetchCharacters();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.list.filter(({ name }) =>
    name.toLowerCase().includes(searchCriteria.toLowerCase())
  );

  return (
    <>
      <Header
        favoritesCount={favorites.length}
        onLogoClick={() => console.log("Logo clicked")}
        onFavoritesClick={() => console.log("Favorites clicked")}
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
