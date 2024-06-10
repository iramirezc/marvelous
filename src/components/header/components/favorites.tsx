import React from "react";
import FilledHeartIcon from "../../icons/filled-heart-icon";
import "./favorites.css";

type FavoritesProps = {
  count: number;
  onClick: () => void;
};

const Favorites = ({ count = 0, onClick }: FavoritesProps) => (
  <div className="my-favorites" onClick={onClick}>
    <FilledHeartIcon />
    <span className="my-favorites--count" aria-hidden="true">
      {count}
    </span>
    <span className="sr-only">My favorites {count}</span>
  </div>
);

export default Favorites;
