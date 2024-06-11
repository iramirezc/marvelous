import React from "react";
import { FilledHeartIcon, EmptyHeartIcon } from "../icons";
import "./like-button.css";

type Props = {
  liked: boolean;
  size?: number;
  onClick: () => void;
};

const LikeButton = ({ liked, size = 12, onClick }: Props) => (
  <div className="like-button">
    <span className="sr-only">{liked ? "Liked" : "Not liked"}</span>
    <button
      className="like-button__btn"
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

export default LikeButton;
