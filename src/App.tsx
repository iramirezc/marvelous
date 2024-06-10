import React, { useState, useEffect } from "react";

import Header from "./components/header";
import Loader from "./components/loader/loader";
import SearchBar from "./components/search-bar/search-bar";

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
    </>
  );
};

export default App;
