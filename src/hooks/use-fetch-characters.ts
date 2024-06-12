import { useCharacters } from "./use-characters";
import { useLoading } from "./use-loading";

import mockCharacters from "../components/characters-list/mocks/characters.json";

export const useFetchCharacters = () => {
  const { setLoading } = useLoading();
  const { setCharacters } = useCharacters();

  const fetchCharacters = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCharacters(
        mockCharacters.map((character) => ({ ...character, comics: [] }))
      );
    }, 1000);
  };

  return {
    fetchCharacters
  };
};
