import { useEffect, useState } from "react";
import { setSearchCriteria as setSearchCriteriaAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";
import charactersService from "../services/characters";
import { Character } from "../types";
import { useLoading } from "./use-loading";

const DEBOUNCE_DELAY = 300;

export const useSearch = () => {
  const {
    search: { searchCriteria }
  } = useAppState();
  const dispatch = useAppDispatch();
  const { loading, setLoading } = useLoading();
  const [results, setResults] = useState<Character[]>([]);

  const setSearchCriteria = (
    ...args: Parameters<typeof setSearchCriteriaAction>
  ) => {
    dispatch(setSearchCriteriaAction(...args));
    setResults([]);
  };

  const searchCharactersByName = async (name: string) => {
    if (!name || loading) {
      return;
    }

    setLoading(true);

    try {
      const characters = await charactersService.fetchCharactersByName(name);
      setResults(characters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      searchCharactersByName(searchCriteria);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [searchCriteria]);

  return {
    results,
    searchCriteria,
    setSearchCriteria
  };
};
