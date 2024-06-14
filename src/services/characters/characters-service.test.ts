import characterData from "../../mocks/miles-morales-data.json";
import milesMoralesCharacter from "../../mocks/miles-morales-character.json";
import apiService from "../api/api-service";
import charactersService from "./characters-service";
import charactersCache from "./characters-cache";

jest.mock("../api/api-service");

const mockGetCharacters = jest.mocked(apiService.getCharacters);

const setupApiService = <T>(response: T[] = []) => {
  mockGetCharacters.mockResolvedValueOnce(response);
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
      setupApiService([characterData]);

      const characters = await charactersService.fetchCharacters();

      expect(characters).toEqual([milesMoralesCharacter]);
    });

    test("does not call apiService.getCharacters() if data is cached", async () => {
      charactersCache.save([characterData]);

      await charactersService.fetchCharacters();

      expect(apiService.getCharacters).not.toHaveBeenCalled();
    });

    test("returns characters from cache", async () => {
      charactersCache.save([characterData]);

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
      setupApiService([characterData]);

      const characters =
        await charactersService.fetchCharactersByName("spider");

      expect(characters).toEqual([milesMoralesCharacter]);
    });
  });
});
