import { getPublicApiEndpoint, getApiParams } from "./api-utils";

jest.mock("./time-utils", () => ({
  getTimestamp: () => "1"
}));

describe("API Utils", () => {
  describe("getPublicApiEndpoint()", () => {
    test("returns the correct API endpoint", () => {
      const endpoint = getPublicApiEndpoint("characters");

      expect(endpoint).toBe("https://api.example.com/v1/public/characters");
    });
  });

  describe("getApiParams()", () => {
    test("returns an object with default parameters", () => {
      const params = getApiParams();

      expect(params).toEqual({
        ts: "1",
        apikey: "1234",
        hash: "ffd275c5130566a2916217b101f26150"
      });
    });

    test("returns default parameters with extra parameters when provided", () => {
      const extraParams = { limit: 50 };

      const params = getApiParams(extraParams);

      expect(params).toEqual({
        ts: expect.any(String),
        apikey: expect.any(String),
        hash: expect.any(String),
        limit: 50
      });
    });
  });
});
