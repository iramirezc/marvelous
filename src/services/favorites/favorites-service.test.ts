import type { Favorites } from "../../types";
import mockFavorites from "../../mocks/favorites.json";
import _storageService from "../storage/storage-service";
import favoritesService from "./favorites-service";

describe("Favorites Service", () => {
  let data: Favorites;

  beforeEach(() => {
    data = mockFavorites;
  });

  afterEach(() => {
    _storageService.clear();
  });

  describe("favoritesService.save()", () => {
    test("saves data to storage", () => {
      favoritesService.save(data);

      // assert is stored in the storage service
      expect(_storageService.get("favorites")).toEqual(data);
    });
  });

  describe("favoritesService.get()", () => {
    beforeEach(() => {
      favoritesService.save(data);
    });

    test("returns saved data from storage", () => {
      const savedData = favoritesService.get();

      expect(savedData).toEqual(data);
    });
  });

  describe("favoritesService.clear()", () => {
    beforeEach(() => {
      favoritesService.save(data);
    });

    test("clears saved data from storage", () => {
      favoritesService.clear();

      // assert is removed from the storage service
      expect(_storageService.get<Favorites>("favorites")).toBeNull();
    });
  });
});
