import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Loader } from "../../components";
import { useFavorites, useLoading } from "../../store/hooks";
import "./page-layout.css";

const PageLayout = () => {
  const navigate = useNavigate();
  const { loading } = useLoading();
  const { getFavoritesCount } = useFavorites();

  return (
    <div className="page-layout">
      <Header
        favoritesCount={getFavoritesCount()}
        onLogoClick={() => navigate("/")}
        onFavoritesClick={() => navigate("/", { state: { favorites: true } })}
      />
      <div className="loader-container">
        <Loader isLoading={loading} />
      </div>
      <Outlet />
    </div>
  );
};

export default PageLayout;
