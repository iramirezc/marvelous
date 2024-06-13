import apiService from "../api/api-service";
import charactersService from "./characters-service";
import charactersCache from "./characters-cache";
import milesMoralesData from "../../mocks/miles-morales.json";
import { Character } from "../../types";

jest.mock("../api/api-service");

const mockGetCharacters = jest.mocked(apiService.getCharacters);

const setupApiService = <T>(response: T[] = []) => {
  mockGetCharacters.mockResolvedValueOnce(response);
};

const milesMoralesCharacter: Character = {
  id: "1016181",
  name: "Spider-Man (Miles Morales)",
  description:
    "Teenager Miles Morales grew up in Brooklyn, New York. Recently, Miles took on the controversial and pressured role of Spider-Man shortly after the death of the original. Morales made his debut against The Kangaroo, much to the surprise and disapproval of many present at the confrontation.",
  image: "http://i.annihil.us/u/prod/marvel/i/mg/f/50/537bcfa1eed73.jpg",
  liked: false,
  comics: []
};

describe("Characters Service", () => {
  afterEach(() => {
    charactersCache.clear();
  });

  describe("charactersService.fetchCharacters()", () => {
    test("calls apiService.getCharacters()", async () => {
      setupApiService([]);

      await charactersService.fetchCharacters();

      expect(apiService.getCharacters).toHaveBeenCalledTimes(1);
    });

    test("returns characters from apiService", async () => {
      setupApiService([milesMoralesData]);

      const characters = await charactersService.fetchCharacters();

      expect(characters).toEqual([milesMoralesCharacter]);
    });

    test("does not call apiService.getCharacters() if data is cached", async () => {
      charactersCache.save([milesMoralesData]);

      await charactersService.fetchCharacters();

      expect(apiService.getCharacters).not.toHaveBeenCalled();
    });

    test("returns characters from cache", async () => {
      charactersCache.save([milesMoralesData]);

      const characters = await charactersService.fetchCharacters();

      expect(characters).toEqual([milesMoralesCharacter]);
    });

    test("throws error if apiService throws error", async () => {
      mockGetCharacters.mockRejectedValueOnce(new Error("Test Api Error"));

      await expect(charactersService.fetchCharacters()).rejects.toThrow(
        "Test Api Error"
      );
    });
  });

  describe("charactersService.fetchCharactersByName()", () => {
    test("calls apiService.getCharacters() with nameStartsWith", async () => {
      setupApiService([]);

      await charactersService.fetchCharactersByName("spider");

      expect(apiService.getCharacters).toHaveBeenCalledTimes(1);
      expect(apiService.getCharacters).toHaveBeenCalledWith({
        nameStartsWith: "spider"
      });
    });

    test("returns characters by name from apiService", async () => {
      setupApiService([milesMoralesData]);

      const characters =
        await charactersService.fetchCharactersByName("spider");

      expect(characters).toEqual([milesMoralesCharacter]);
    });
  });
});
