import { useAppState } from "../store/hooks";

export const useFavorites = () => {
  const { characters } = useAppState();

  const favorites = characters.list.filter(({ liked }) => liked);

  return {
    favorites
  };
};
