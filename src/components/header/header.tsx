import React from "react";
import Favorites from "./components/favorites";
import Logo from "./components/logo.svg";
import "./header.css";

type Props = {
  favoritesCount: number;
};

const Header = ({ favoritesCount }: Props) => (
  <header className="marvelous-header">
    <img className="marvelous-logo" src={Logo} alt="Marvelous logo" />
    <Favorites count={favoritesCount} />
  </header>
);

export default Header;
