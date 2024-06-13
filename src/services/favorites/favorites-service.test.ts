import storageService from "../storage/storage-service";
import favoritesService from "./favorites-service";

describe("Favorites Service", () => {
  afterEach(() => {
    storageService.clear();
  });

  describe("favoritesService.save()", () => {
    test("saves data to storage", () => {
      const data = [{ id: "1" }];

      favoritesService.save(data);

      const savedData = storageService.get("favorites");
      expect(savedData).toEqual(data);
    });
  });

  describe("favoritesService.get()", () => {
    test("returns saved data from storage", () => {
      const data = [{ id: "1" }];
      storageService.save("favorites", data);

      const savedData = favoritesService.get();

      expect(savedData).toEqual(data);
    });
  });

  describe("favoritesService.clear()", () => {
    test("clears saved data from storage", () => {
      const data = [{ id: "1" }];
      storageService.save("favorites", data);

      favoritesService.clear();

      const clearedData = storageService.get("favorites");
      expect(clearedData).toBeNull();
    });
  });
});
