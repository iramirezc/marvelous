import storageService from "../storage/storage-service";

const FAVORITES_KEY = "favorites";

const save = <T>(data: T) => {
  storageService.save(FAVORITES_KEY, data);
};

const get = <T>() => {
  return storageService.get<T>(FAVORITES_KEY);
};

const clear = () => {
  storageService.remove(FAVORITES_KEY);
};

const favoritesService = { save, get, clear };

export default favoritesService;
