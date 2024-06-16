import type { Favorites } from "../../types";
import _storageService from "../storage/storage-service";

const FAVORITES_KEY = "favorites";

const save = (data: Favorites) => {
  _storageService.save(FAVORITES_KEY, data);
};

const get = () => {
  return _storageService.get<Favorites>(FAVORITES_KEY);
};

const clear = () => {
  _storageService.remove(FAVORITES_KEY);
};

const favoritesService = { save, get, clear };

export default favoritesService;
