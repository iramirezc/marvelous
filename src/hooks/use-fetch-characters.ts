import charactersService from "../services/characters";
import { useCharacters } from "./use-characters";
import { useLoading } from "./use-loading";

export const useFetchCharacters = () => {
  const { setLoading } = useLoading();
  const { setCharacters } = useCharacters();

  const fetchCharacters = async () => {
    setLoading(true);

    try {
      const characters = await charactersService.fetchCharacters();
      setCharacters(characters);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCharacters
  };
};
