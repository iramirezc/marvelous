import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Loader } from "../../components";
import { useFavorites, useFilters, useLoading } from "../../store/hooks";
import "./page-layout.css";

const PageLayout = () => {
  const { loading } = useLoading();
  const { getFavoritesCount } = useFavorites();
  const { showOnlyFavorites } = useFilters();

  return (
    <div className="page-layout">
      <Header
        favoritesCount={getFavoritesCount()}
        onLogoClick={() => showOnlyFavorites(false)}
        onFavoritesClick={() => showOnlyFavorites(true)}
      />
      <div className="loader-container">
        <Loader isLoading={loading} />
      </div>
      <Outlet />
    </div>
  );
};

export default PageLayout;
