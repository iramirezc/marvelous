import { toggleLikeCharacter as toggleLikeCharacterAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";

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
