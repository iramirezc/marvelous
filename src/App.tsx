import React from "react";

import Header from "./components/header";
import Loader from "./components/loader/loader";

const App = () => (
  <>
    <Header
      favoritesCount={0}
      onLogoClick={() => console.log("Logo clicked")}
      onFavoritesClick={() => console.log("Favorites clicked")}
    />
    <Loader isLoading={true} />
  </>
);

export default App;
