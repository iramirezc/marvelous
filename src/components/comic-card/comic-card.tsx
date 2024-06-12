import React from "react";
import "./comic-card.css";

type Props = {
  title: string;
  image: string;
  year: string;
};

const ComicCard = ({ title, image, year }: Props) => (
  <article className="comic-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <time>{year}</time>
  </article>
);

export default ComicCard;
