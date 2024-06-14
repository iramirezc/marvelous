import { A_MINUTE, getNow, isExpired } from "../../utils/time-utils";
import _storageService from "../storage/storage-service";

const DATA_KEY = "characters";
const LAST_FETCH_KEY = `${DATA_KEY}_lastFetch`;

const save = <T>(data: T) => {
  _storageService.save(DATA_KEY, data);
  _storageService.save(LAST_FETCH_KEY, getNow());
};

const get = <T>() => {
  const lastFetch = _storageService.get<number>(LAST_FETCH_KEY);

  if (lastFetch === null) {
    return null;
  }

  if (isExpired(lastFetch, A_MINUTE)) {
    clear();

    return null;
  }

  return _storageService.get<T>(DATA_KEY);
};

const clear = () => {
  _storageService.remove(DATA_KEY);
  _storageService.remove(LAST_FETCH_KEY);
};

const charactersCache = { save, get, clear };

export default charactersCache;
