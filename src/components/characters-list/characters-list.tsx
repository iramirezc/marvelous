import React, { ComponentProps } from "react";
import CharacterCard from "../character-card/character-card";
import "./characters-list.css";

type Props = {
  characters: Omit<
    ComponentProps<typeof CharacterCard>,
    "onClick" | "onLike"
  >[];
  onCharacterClick: (id: string) => void;
  onCharacterLike: (id: string) => void;
};

const CharactersList = ({
  characters,
  onCharacterClick,
  onCharacterLike
}: Props) => (
  <div className="characters-list">
    {characters.map((character) => (
      <CharacterCard
        key={character.id}
        id={character.id}
        name={character.name}
        thumbnail={character.thumbnail}
        liked={character.liked}
        onClick={onCharacterClick}
        onLike={onCharacterLike}
      />
    ))}
  </div>
);

export default CharactersList;
