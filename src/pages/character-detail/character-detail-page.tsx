import React from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import type { Character } from "../../types";
import { CharacterDetailCard } from "../../components";
import "./character-detail-page.css";

const CharacterDetailPage = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  const character = location.state?.character as Character | undefined;

  if (!params.id || !character) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="character-detail-page">
      <CharacterDetailCard
        id={character.id}
        name={character.name}
        image={character.image}
        liked={character.liked}
        description={character.description}
        onLike={() => console.log("Like", character.id)}
      />
    </div>
  );
};

export default CharacterDetailPage;
