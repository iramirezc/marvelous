import React from "react";
import LikeButton from "../like-button";
import "./character-detail-card.css";

type Props = {
  id: string;
  name: string;
  picture: string;
  description: string;
  liked: boolean;
  onLike: (id: string) => void;
};

const CharacterDetailCard = ({
  id,
  name,
  picture,
  liked,
  description,
  onLike
}: Props) => (
  <article className="character-detail-card">
    <div className="character-detail-card__inner">
      <img
        className="character-detail-card__picture"
        src={picture}
        alt={name}
      />
      <div className="character-detail-card__info">
        <header className="character-detail-card__info-header">
          <h2>{name}</h2>
          <LikeButton liked={liked} onClick={() => onLike(id)} size={24} />
        </header>
        <p className="character-detail-card__info-description">{description}</p>
      </div>
    </div>
    <span className="character-detail-card__corner" />
  </article>
);

export default CharacterDetailCard;
