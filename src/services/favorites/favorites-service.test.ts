import type { Character, Favorites } from "../../types";
import _storageService from "../storage/storage-service";
import favoritesService from "./favorites-service";

const favoriteCharacterId = "1009610";
const favoriteCharacter: Character = {
  id: favoriteCharacterId,
  name: "Spider-Man (Peter Parker)",
  image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
  liked: true,
  description:
    "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
  comics: []
};

describe("Favorites Service", () => {
  let data: Favorites;

  beforeEach(() => {
    data = {
      ids: [favoriteCharacterId],
      entities: { [favoriteCharacterId]: favoriteCharacter }
    };
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
