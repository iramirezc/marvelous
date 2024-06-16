import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { useFavoritesState } from "../../store/hooks";
import "./page-layout.css";

const PageLayout = () => {
  const navigate = useNavigate();
  const { getFavoritesCount } = useFavoritesState();

  return (
    <div className="page-layout">
      <Header
        favoritesCount={getFavoritesCount()}
        onLogoClick={() => navigate("/")}
        onFavoritesClick={() => navigate("/", { state: { favorites: true } })}
      />
      <Outlet />
    </div>
  );
};

export default PageLayout;
