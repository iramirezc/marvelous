import React from "react";
import { FilledHeartIcon, EmptyHeartIcon } from "../../icons";
import "./like-button.css";

type Props = {
  liked: boolean;
  size?: number;
  onClick: () => void;
};

export const LikeButton = ({ liked, size = 12, onClick }: Props) => (
  <div className="character-card__like-button">
    <span className="sr-only">{liked ? "Liked" : "Not liked"}</span>
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {liked ? (
        <FilledHeartIcon width={size} height={size} />
      ) : (
        <EmptyHeartIcon width={size} height={size} />
      )}
      <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
    </button>
  </div>
);
