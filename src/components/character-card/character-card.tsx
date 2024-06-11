import React from "react";
import { LikeButton } from "./components/like-button";
import "./character-card.css";

type Props = {
  id: string;
  name: string;
  image: string;
  liked: boolean;
  onClick: (id: string) => void;
  onLike: (id: string) => void;
};

const CharacterCard = ({ id, name, image, liked, onClick, onLike }: Props) => (
  <article className="character-card" onClick={() => onClick(id)}>
    <img src={image} alt={name} />
    <div className="character-card__info">
      <h2>{name}</h2>
      <LikeButton liked={liked} onClick={() => onLike(id)} />
      <span className="character-card__corner" />
    </div>
  </article>
);

export default CharacterCard;
