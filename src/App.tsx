import React from "react";

import Header from "./components/header";
import Loader from "./components/loader/loader";

const App = () => (
  <>
    <Header favoritesCount={0} />
    <Loader isLoading={true} />
  </>
);

export default App;
