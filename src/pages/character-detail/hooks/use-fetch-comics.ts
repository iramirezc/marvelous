import { useState } from "react";
import type { Comic } from "../../../types";
import charactersService from "../../../services/characters";
import { useAppLoadingState } from "../../../store/hooks";

export const useFetchComics = () => {
  const { loading, setLoading } = useAppLoadingState();
  const [comics, setComics] = useState<Comic[]>([]);

  const fetchComics = async (characterId: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response =
        await charactersService.fetchComicsByCharacterId(characterId);
      setComics(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    comics,
    loading,
    fetchComics
  };
};
