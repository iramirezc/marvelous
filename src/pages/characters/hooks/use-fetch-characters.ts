import charactersService from "../../../services/characters";
import { useCharacters, useLoading } from "../../../store/hooks";

export const useFetchCharacters = () => {
  const { loading, setLoading } = useLoading();
  const { characters, setCharacters } = useCharacters();

  const fetchCharacters = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const characters = await charactersService.fetchCharacters();
      setCharacters(characters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    characters,
    fetchCharacters
  };
};
