import React from "react";
import { Navigate } from "react-router-dom";
import { CharacterDetailCard } from "../../components";
import { useCharacterDetailPage } from "./use-character-detail-page";
import "./character-detail-page.css";

const CharacterDetailPage = () => {
  const { character, onCharacterLike } = useCharacterDetailPage();

  if (!character) {
    // TODO: If no character in state, fetch it from the API
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="character-detail-page">
      <CharacterDetailCard
        id={character.id}
        name={character.name}
        picture={character.picture}
        liked={character.liked}
        description={character.description}
        onLike={onCharacterLike}
      />
    </div>
  );
};

export default CharacterDetailPage;
