import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDetailPage, CharactersPage, PageLayout } from "../pages";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PageLayout />}>
      <Route index element={<CharactersPage />} />
      <Route path="character/:id" element={<CharacterDetailPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
