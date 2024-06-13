import { A_MINUTE, getNow, isExpired } from "../../utils/time-utils";
import * as cacheService from "../cache/cache-service";

const DATA_KEY = "characters";
const LAST_FETCH_KEY = `${DATA_KEY}_lastFetch`;

export const saveCharactersCache = <T>(data: T) => {
  cacheService.save(DATA_KEY, data);
  cacheService.save(LAST_FETCH_KEY, getNow());
};

export const getCharactersCache = <T>() => {
  const lastFetch = cacheService.get<number>(LAST_FETCH_KEY);

  if (lastFetch === null) {
    return null;
  }

  if (isExpired(lastFetch, A_MINUTE)) {
    cacheService.remove(DATA_KEY);
    cacheService.remove(LAST_FETCH_KEY);

    return null;
  }

  return cacheService.get<T>(DATA_KEY);
};
