import React, { ComponentProps } from "react";
import ComicCard from "../comic-card";
import "./comics-list.css";

type Comic = ComponentProps<typeof ComicCard> & { id: string };

type Props = {
  comics: Comic[];
};

const ComicsList = ({ comics }: Props) => (
  <div className="comics-list">
    <h2>Comics</h2>
    <ul tabIndex={0}>
      {comics.map((comic) => (
        <li key={comic.id}>
          <ComicCard
            key={comic.id}
            title={comic.title}
            cover={comic.cover}
            year={comic.year}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ComicsList;
