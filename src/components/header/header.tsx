import React from "react";
import Favorites from "./components/favorites";
import Logo from "./components/logo.svg";
import "./header.css";

type Props = {
  favoritesCount: number;
  onLogoClick: () => void;
  onFavoritesClick: () => void;
};

const Header = ({ favoritesCount, onLogoClick, onFavoritesClick }: Props) => (
  <header className="marveloux-header">
    <img
      className="marveloux-logo"
      src={Logo}
      alt="Marvel logo"
      onClick={onLogoClick}
    />
    <Favorites count={favoritesCount} onClick={onFavoritesClick} />
  </header>
);

export default Header;
