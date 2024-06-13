import { getCharactersCache, saveCharactersCache } from "./characters-cache";
import { isExpired, getNow } from "../../utils/time-utils";
import * as cacheService from "../cache/cache-service";

jest.mock("../../utils/time-utils");

describe("Characters Cache", () => {
  beforeEach(() => {
    jest.mocked(getNow).mockReturnValue(1);
  });

  afterEach(() => {
    cacheService.clear();
  });

  describe("saveCharactersCache()", () => {
    test("saves data and last fetch time", () => {
      const data = { foo: "bar" };

      saveCharactersCache(data);

      expect(cacheService.get("characters")).toEqual(data);
      expect(cacheService.get("characters_lastFetch")).toBe(1);
    });
  });

  describe("getCharactersCache()", () => {
    test("returns null if cache is empty", () => {
      const cache = getCharactersCache();

      expect(cache).toBeNull();
    });

    test("returns null if cache is expired", () => {
      jest.mocked(isExpired).mockReturnValueOnce(true);

      saveCharactersCache({ foo: "bar" });

      const cache = getCharactersCache();

      expect(cache).toBeNull();
    });

    test("removes cache if expired", () => {
      jest.mocked(isExpired).mockReturnValueOnce(true);

      saveCharactersCache({ foo: "bar" });

      getCharactersCache();

      expect(cacheService.get("characters")).toBeNull();
      expect(cacheService.get("characters_lastFetch")).toBeNull();
    });

    test("returns cached data if cache is not expired", () => {
      const data = { foo: "bar" };

      saveCharactersCache(data);

      const cache = getCharactersCache();

      expect(cache).toEqual(data);
    });
  });
});
