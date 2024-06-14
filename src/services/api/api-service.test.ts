import fetchMock from "fetch-mock";
import characterData from "../../mocks/miles-morales-data.json";
import apiService from "./api-service";

jest.mock("../../utils/time-utils", () => ({
  getTimestamp: () => "1"
}));

const apiEndpoints = {
  getCharacters:
    "https://api.example.com/v1/public/characters?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&limit=50",
  getCharactersByName:
    "https://api.example.com/v1/public/characters?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&nameStartsWith=spider&limit=50"
};

interface TestDataType {
  id: string;
  name: string;
}

describe("API Service", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("apiService.getCharacters()", () => {
    test("fetches characters successfully", async () => {
      fetchMock.get(apiEndpoints.getCharacters, {
        data: {
          results: [characterData]
        }
      });

      const response = await apiService.getCharacters<TestDataType[]>();

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

      const response = await apiService.getCharacters<TestDataType[]>({
        nameStartsWith: "spider"
      });

      expect(response).toHaveLength(1);
      expect(response[0].id).toBe(1016181);
      expect(response[0].name).toBe("Spider-Man (Miles Morales)");
      expect(fetchMock.done()).toBe(true);
    });
  });
});
