import React, { useEffect } from "react";

import { Header, Loader, SearchBar, CharactersList } from "./components";
import { setCharacters, setLoading, setSearchCriteria } from "./store/actions";
import { useAppState, useAppDispatch } from "./store/hooks";
import mockCharacters from "./components/characters-list/mocks/characters.json";

const App = () => {
  const { loading, characters, filters } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(
        setCharacters(
          mockCharacters.map((character) => ({ ...character, comics: [] }))
        )
      );
    }, 1000);
  }, []);

  const handleOnSearchChange = (value: string) => {
    dispatch(setSearchCriteria(value));
  };

  const favoritesCount = characters.list.filter(({ liked }) => liked).length;

  const filteredCharacters = characters.list.filter(({ name }) =>
    name.toLowerCase().includes(filters.searchCriteria.toLowerCase())
  );

  return (
    <>
      <Header
        favoritesCount={favoritesCount}
        onLogoClick={() => console.log("Logo clicked")}
        onFavoritesClick={() => console.log("Favorites clicked")}
      />
      <Loader isLoading={loading} />
      <SearchBar
        value={filters.searchCriteria}
        results={filteredCharacters.length}
        onChange={handleOnSearchChange}
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
