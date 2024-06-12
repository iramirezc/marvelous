import React from "react";
import "./comic-card.css";

type Props = {
  image: string;
  title: string;
  year: string;
};

const ComicCard = ({ image, title, year }: Props) => (
  <article className="comic-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <time>{year}</time>
  </article>
);

export default ComicCard;
