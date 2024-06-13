import { toggleLikeCharacter as toggleLikeCharacterAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useFavorites = () => {
  const { characters } = useAppState();
  const dispatch = useAppDispatch();

  const favorites = characters.list.filter(({ liked }) => liked);

  const toggleLikeCharacter = (
    ...args: Parameters<typeof toggleLikeCharacterAction>
  ) => {
    dispatch(toggleLikeCharacterAction(...args));
  };

  return {
    favorites,
    toggleLikeCharacter
  };
};
