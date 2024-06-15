import React from "react";
import { Navigate } from "react-router-dom";
import { CharacterDetailCard, ComicsList } from "../../components";
import { useCharacterDetailPage } from "./use-character-detail-page";
import "./character-detail-page.css";

const CharacterDetailPage = () => {
  const { character, onCharacterLike } = useCharacterDetailPage();

  if (!character) {
    // TODO: If there is no character, should I fetch it from the API?
    return <Navigate to="/" replace={true} />;
  }

  return (
    <main className="character-detail-page">
      <CharacterDetailCard
        id={character.id}
        name={character.name}
        picture={character.picture}
        liked={character.liked}
        description={character.description}
        onLike={onCharacterLike}
      />
      <ComicsList comics={character.comics} />
    </main>
  );
};

export default CharacterDetailPage;
