import type { Favorites } from "../../types";
import storageService from "../storage/storage-service";

const FAVORITES_KEY = "favorites";

const save = (data: Favorites) => {
  storageService.save(FAVORITES_KEY, data);
};

const get = () => {
  return storageService.get<Favorites>(FAVORITES_KEY);
};

const clear = () => {
  storageService.remove(FAVORITES_KEY);
};

const favoritesService = { save, get, clear };

export default favoritesService;
