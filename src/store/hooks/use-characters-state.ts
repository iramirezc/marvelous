import { setCharacters as setCharactersAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useCharactersState = () => {
  const {
    characters: { list: characters }
  } = useAppState();
  const dispatch = useAppDispatch();

  const setCharacters = (...args: Parameters<typeof setCharactersAction>) => {
    dispatch(setCharactersAction(...args));
  };

  const getCharacterById = (characterId: string) => {
    return characters.find((character) => character.id === characterId) ?? null;
  };

  return {
    characters,
    setCharacters,
    getCharacterById
  };
};
