import charactersCache from "./characters-cache";
import cacheService from "../cache/cache-service";
import { isExpired, getNow } from "../../utils/time-utils";

jest.mock("../../utils/time-utils");

describe("Characters Cache", () => {
  beforeEach(() => {
    jest.mocked(getNow).mockReturnValue(1);
  });

  afterEach(() => {
    cacheService.clear();
  });

  describe("charactersCache.save()", () => {
    test("saves data and last fetch time", () => {
      const data = { foo: "bar" };

      charactersCache.save(data);

      expect(cacheService.get("characters")).toEqual(data);
      expect(cacheService.get("characters_lastFetch")).toBe(1);
    });
  });

  describe("charactersCache.get()", () => {
    test("returns null if cache is empty", () => {
      const cache = charactersCache.get();

      expect(cache).toBeNull();
    });

    test("returns null if cache is expired", () => {
      jest.mocked(isExpired).mockReturnValueOnce(true);

      charactersCache.save({ foo: "bar" });

      const cache = charactersCache.get();

      expect(cache).toBeNull();
    });

    test("removes cache if expired", () => {
      jest.mocked(isExpired).mockReturnValueOnce(true);

      charactersCache.save({ foo: "bar" });

      charactersCache.get();

      expect(cacheService.get("characters")).toBeNull();
      expect(cacheService.get("characters_lastFetch")).toBeNull();
    });

    test("returns cached data if cache is not expired", () => {
      const data = { foo: "bar" };

      charactersCache.save(data);

      const cache = charactersCache.get();

      expect(cache).toEqual(data);
    });
  });
});
