import { setCharacters as setCharactersAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";

export const useCharacters = () => {
  const {
    characters: { list: characters }
  } = useAppState();
  const dispatch = useAppDispatch();

  const setCharacters = (...args: Parameters<typeof setCharactersAction>) => {
    dispatch(setCharactersAction(...args));
  };

  return {
    characters,
    setCharacters
  };
};
