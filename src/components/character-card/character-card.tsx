import React from "react";

import LikeButton from "../like-button";
import "./character-card.css";

type Props = {
  id: string;
  name: string;
  thumbnail: string;
  liked: boolean;
  onClick: (id: string) => void;
  onLike: (id: string) => void;
};

const CharacterCard = ({
  id,
  name,
  thumbnail,
  liked,
  onClick,
  onLike
}: Props) => (
  <article className="character-card" onClick={() => onClick(id)}>
    <img src={thumbnail} alt={name} />
    <div className="character-card__info">
      <h2>{name}</h2>
      <LikeButton liked={liked} onClick={() => onLike(id)} />
    </div>
    <span className="character-card__corner" />
  </article>
);

export default CharacterCard;
