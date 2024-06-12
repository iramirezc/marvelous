import React, { useEffect } from "react";

import { Header, Loader, SearchBar, CharactersList } from "./components";
import { useCharacters, useFavorites, useLoading, useSearch } from "./hooks";
import mockCharacters from "./components/characters-list/mocks/characters.json";

const App = () => {
  const { loading, setLoading } = useLoading();
  const { characters, setCharacters } = useCharacters();
  const { searchCriteria, setSearchCriteria } = useSearch();
  const { favorites } = useFavorites();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCharacters(
        mockCharacters.map((character) => ({ ...character, comics: [] }))
      );
    }, 1000);
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
