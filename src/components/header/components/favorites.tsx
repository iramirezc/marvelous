import React from "react";
import FilledHeartIcon from "../../icons/filled-heart-icon";
import "./favorites.css";

type FavoritesProps = {
  count: number;
};

const Favorites = ({ count = 0 }: FavoritesProps) => (
  <div className="my-favorites">
    <FilledHeartIcon />
    <span className="my-favorites--count">{count}</span>
  </div>
);

export default Favorites;
