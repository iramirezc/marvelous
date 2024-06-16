import React from "react";
import "./comic-card.css";

type Props = {
  title: string;
  cover: string;
  year: string;
};

const ComicCard = ({ title, cover, year }: Props) => (
  <article className="comic-card">
    <img src={cover} alt={title} />
    <h3>{title}</h3>
    <time>{year}</time>
  </article>
);

export default ComicCard;
