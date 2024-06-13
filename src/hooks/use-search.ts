import { useEffect, useState } from "react";
import { setSearchCriteria as setSearchCriteriaAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";
import charactersService from "../services/characters";
import type { Character } from "../types";
import { useLoading } from "./use-loading";

const DEBOUNCE_DELAY = 900;

export const useSearch = () => {
  const {
    search: { searchCriteria }
  } = useAppState();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  // This state is used to hide the results when the user is still typing
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Character[]>([]);

  const onChangeSearchCriteria = (newSearchCriteria: string) => {
    dispatch(setSearchCriteriaAction(newSearchCriteria));
    setIsSearching(true);
    setResults([]);
  };

  const searchCharactersByName = async (name: string) => {
    setLoading(true);

    try {
      const characters = await charactersService.fetchCharactersByName(name);
      setResults(characters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // If the search criteria is empty, don't search
    if (!searchCriteria) {
      setIsSearching(false);
      return;
    }

    // Debounce the search to avoid making too many requests
    const id = setTimeout(() => {
      searchCharactersByName(searchCriteria);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [searchCriteria]);

  return {
    results,
    isSearching,
    searchCriteria,
    onChangeSearchCriteria
  };
};
