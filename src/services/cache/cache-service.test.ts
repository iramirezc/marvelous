import cacheService from "./cache-service";

describe("Cache Service", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("cacheService.save()", () => {
    test("saves data", () => {
      cacheService.save("foo", "bar");

      expect(localStorage.getItem("foo")).toBe('"bar"');
    });
  });

  describe("cacheService.get()", () => {
    test("returns null if key does not exist", () => {
      expect(cacheService.get("foo")).toBeNull();
    });

    test("returns data if key exists", () => {
      localStorage.setItem("foo", '"bar"');

      const data = cacheService.get("foo");

      expect(data).toBe("bar");
    });
  });

  describe("cacheService.remove()", () => {
    test("removes data", () => {
      localStorage.setItem("foo", '"bar"');

      expect(cacheService.get("foo")).toBe("bar");

      cacheService.remove("foo");

      expect(cacheService.get("foo")).toBeNull();
    });
  });

  describe("cacheService.clear()", () => {
    test("clears all data", () => {
      localStorage.setItem("foo", '"bar"');
      localStorage.setItem("baz", '"qux"');

      expect(cacheService.get("foo")).toBe("bar");
      expect(cacheService.get("baz")).toBe("qux");

      cacheService.clear();

      expect(cacheService.get("foo")).toBeNull();
      expect(cacheService.get("baz")).toBeNull();
    });
  });
});
