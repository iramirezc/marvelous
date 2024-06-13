import { setCharacters as setCharactersAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

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
