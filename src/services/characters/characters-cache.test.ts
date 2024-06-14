import { isExpired, getNow } from "../../utils/time-utils";
import _storageService from "../storage/storage-service";
import charactersCache from "./characters-cache";

jest.mock("../../utils/time-utils");

describe("Characters Cache", () => {
  beforeEach(() => {
    jest.mocked(getNow).mockReturnValue(1);
  });

  afterEach(() => {
    _storageService.clear();
  });

  describe("charactersCache.save()", () => {
    test("saves data and last fetch time", () => {
      const data = { foo: "bar" };

      charactersCache.save(data);

      expect(_storageService.get("characters")).toEqual(data);
      expect(_storageService.get("characters_lastFetch")).toBe(1);
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

      expect(_storageService.get("characters")).toBeNull();
      expect(_storageService.get("characters_lastFetch")).toBeNull();
    });

    // * Regression test for a bug that was removing all cache
    test("Regression: removes ONLY 'characters*' cache if expired", () => {
      jest.mocked(isExpired).mockReturnValueOnce(true);

      // store some other key different than 'characters'
      _storageService.save("other", { foo: "bar" });
      // store regular 'characters' cache
      charactersCache.save({ baz: "qux" });

      // as 'characters' cache is expired, it should be removed
      charactersCache.get();

      // assert that 'characters*' cache was removed
      expect(_storageService.get("characters")).toBeNull();
      // assert that 'other' cache was not removed
      expect(_storageService.get("other")).toEqual({ foo: "bar" });
    });

    test("returns cached data if cache is not expired", () => {
      const data = { foo: "bar" };

      charactersCache.save(data);

      const cache = charactersCache.get();

      expect(cache).toEqual(data);
    });
  });

  describe("charactersCache.clear()", () => {
    test("removes cache", () => {
      charactersCache.save({ foo: "bar" });

      charactersCache.clear();

      expect(_storageService.get("characters")).toBeNull();
      expect(_storageService.get("characters_lastFetch")).toBeNull();
    });
  });
});
