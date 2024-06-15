import comicsData from "../../mocks/comics-data.json";
import characterData from "../../mocks/miles-morales-data.json";
import milesMoralesCharacter from "../../mocks/miles-morales-character.json";
import apiService from "../api/api-service";
import charactersService from "./characters-service";
import charactersCache from "./characters-cache";

jest.mock("../api/api-service");

const mockApiService = {
  getCharacters: jest.mocked(apiService.getCharacters),
  getComicsByCharacterId: jest.mocked(apiService.getComicsByCharacterId)
};

const setupCharactersApiService = <T>(response: T[] = []) => {
  mockApiService.getCharacters.mockResolvedValueOnce(response);
};

const setupComicsApiService = <T>(response: T[] = []) => {
  mockApiService.getComicsByCharacterId.mockResolvedValueOnce(response);
};

describe("Characters Service", () => {
  afterEach(() => {
    charactersCache.clear();
  });

  describe("fetchCharacters()", () => {
    test("calls apiService.getCharacters()", async () => {
      setupCharactersApiService([]);

      await charactersService.fetchCharacters();

      expect(apiService.getCharacters).toHaveBeenCalledTimes(1);
    });

    test("returns characters from apiService", async () => {
      setupCharactersApiService([characterData]);

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
      mockApiService.getCharacters.mockRejectedValueOnce(
        new Error("Test Api Error")
      );

      await expect(charactersService.fetchCharacters()).rejects.toThrow(
        "Test Api Error"
      );
    });
  });

  describe("fetchCharactersByName()", () => {
    test("calls apiService.getCharacters() with nameStartsWith", async () => {
      setupCharactersApiService([]);

      await charactersService.fetchCharactersByName("spider");

      expect(apiService.getCharacters).toHaveBeenCalledTimes(1);
      expect(apiService.getCharacters).toHaveBeenCalledWith({
        nameStartsWith: "spider"
      });
    });

    test("returns characters by name from apiService", async () => {
      setupCharactersApiService([characterData]);

      const characters =
        await charactersService.fetchCharactersByName("spider");

      expect(characters).toEqual([milesMoralesCharacter]);
    });
  });

  describe("fetchComicsByCharacterId()", () => {
    test("calls apiService.getComicsByCharacterId()", async () => {
      setupComicsApiService([]);

      await charactersService.fetchComicsByCharacterId("1009610");

      expect(apiService.getComicsByCharacterId).toHaveBeenCalledTimes(1);
      expect(apiService.getComicsByCharacterId).toHaveBeenCalledWith({
        characterId: "1009610"
      });
    });

    test("returns comics from apiService", async () => {
      setupComicsApiService(comicsData);

      const comics =
        await charactersService.fetchComicsByCharacterId("1009610");

      expect(comics).toHaveLength(20);
      expect(comics[0]).toEqual({
        id: "109637",
        title: "The Amazing Spider-Man (2022) #50",
        cover:
          "http://i.annihil.us/u/prod/marvel/i/mg/f/03/663e5c5906239/portrait_xlarge.jpg",
        year: "2024"
      });
    });
  });
});
