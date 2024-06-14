import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Loader } from "../../components";
import { useFavoritesState, useAppLoadingState } from "../../store/hooks";
import "./page-layout.css";

const PageLayout = () => {
  const navigate = useNavigate();
  const { loading } = useAppLoadingState();
  const { getFavoritesCount } = useFavoritesState();

  return (
    <div className="page-layout">
      <Header
        favoritesCount={getFavoritesCount()}
        onLogoClick={() => navigate("/")}
        onFavoritesClick={() => navigate("/", { state: { favorites: true } })}
      />
      <Loader isLoading={loading} />
      <Outlet />
    </div>
  );
};

export default PageLayout;
