import React, { useState, useEffect } from "react";

import { Header, Loader, SearchBar, CharactersList } from "./components";
import characters from "./components/characters-list/mocks/characters.json";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Header
        favoritesCount={0}
        onLogoClick={() => console.log("Logo clicked")}
        onFavoritesClick={() => console.log("Favorites clicked")}
      />
      <Loader isLoading={isLoading} />
      <SearchBar value={searchValue} results={0} onChange={setSearchValue} />
      <CharactersList
        characters={characters}
        onCharacterClick={(id) => console.log("Character", id)}
        onCharacterLike={(id) => console.log("Character like", id)}
      />
    </>
  );
};

export default App;
