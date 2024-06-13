import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharactersPage, PageLayout } from "../pages";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PageLayout />}>
      <Route index element={<CharactersPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
