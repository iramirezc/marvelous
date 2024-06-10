import fetchMock from "fetch-mock";
import { fetchCharacters } from "./api-service";
import milesMorales from "../mocks/miles-morales.json";

jest.mock("../utils/time-utils", () => ({
  getTimestamp: () => "1"
}));

const apiEndpoints = {
  getCharacters:
    "https://api.example.com/v1/public/characters?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150&limit=50"
};

describe("API Service", () => {
  beforeEach(() => {
    fetchMock.get(apiEndpoints.getCharacters, {
      data: {
        results: [milesMorales]
      }
    });
  });

  describe("fetchCharacters()", () => {
    test("fetches characters successfully", async () => {
      const response = await fetchCharacters();

      expect(response).toHaveLength(1);
      expect(response[0].id).toBe(1016181);
      expect(response[0].name).toBe("Spider-Man (Miles Morales)");
      expect(fetchMock.done()).toBe(true);
    });
  });
});
