import charactersService from "../../../services/characters";
import { useCharactersState, useAppLoadingState } from "../../../store/hooks";

export const useFetchCharacters = () => {
  const { loading, setLoading } = useAppLoadingState();
  const { characters, setCharacters } = useCharactersState();

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
