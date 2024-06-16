import fetchMock from "fetch-mock";
import characterData from "../../mocks/miles-morales-data.json";
import comicsData from "../../mocks/comics-data.json";
import apiService from "./api-service";

jest.mock("../../utils/time-utils", () => ({
  getTimestamp: () => "1"
}));

const apiEndpoints = {
  getCharacters:
    "https://api.example.com/v1/public/characters?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&limit=50",
  getCharactersByName:
    "https://api.example.com/v1/public/characters?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&nameStartsWith=spider&limit=50",
  getComicsByCharacterId:
    "https://api.example.com/v1/public/characters/1009610/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&limit=20"
};

describe("API Service", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("apiService.getCharacters()", () => {
    type TestCharacterDataType = {
      id: number;
      name: string;
    };

    test("fetches characters successfully", async () => {
      fetchMock.get(apiEndpoints.getCharacters, {
        data: {
          results: [characterData]
        }
      });

      const response =
        await apiService.getCharacters<TestCharacterDataType[]>();

      expect(response).toHaveLength(1);
      expect(response[0].id).toBe(1016181);
      expect(response[0].name).toBe("Spider-Man (Miles Morales)");
      expect(fetchMock.done()).toBe(true);
    });

    test("fetches characters by name", async () => {
      fetchMock.get(apiEndpoints.getCharactersByName, {
        data: {
          results: [characterData]
        }
      });

      const response = await apiService.getCharacters<TestCharacterDataType[]>({
        nameStartsWith: "spider"
      });

      expect(response).toHaveLength(1);
      expect(response[0].id).toBe(1016181);
      expect(response[0].name).toBe("Spider-Man (Miles Morales)");
      expect(fetchMock.done()).toBe(true);
    });
  });

  describe("apiService.getComicsByCharacterId()", () => {
    type TestComicDataType = {
      id: number;
      title: string;
    };

    test("fetches comics successfully", async () => {
      fetchMock.get(apiEndpoints.getComicsByCharacterId, {
        data: {
          results: comicsData
        }
      });

      const response = await apiService.getComicsByCharacterId<
        TestComicDataType[]
      >({ characterId: "1009610" });

      expect(response).toHaveLength(20);
      expect(response[0].id).toBe(109637);
      expect(response[0].title).toBe("The Amazing Spider-Man (2022) #50");
      expect(fetchMock.done()).toBe(true);
    });
  });
});
