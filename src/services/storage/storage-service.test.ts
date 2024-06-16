import storageService from "./storage-service";

describe("Storage Service", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("storageService.save()", () => {
    test("saves data", () => {
      storageService.save("foo", "bar");

      expect(localStorage.getItem("foo")).toBe('"bar"');
    });
  });

  describe("storageService.get()", () => {
    test("returns null if key does not exist", () => {
      expect(storageService.get("foo")).toBeNull();
    });

    test("returns data if key exists", () => {
      localStorage.setItem("foo", '"bar"');

      const data = storageService.get("foo");

      expect(data).toBe("bar");
    });
  });

  describe("storageService.remove()", () => {
    test("removes data", () => {
      localStorage.setItem("foo", '"bar"');

      expect(storageService.get("foo")).toBe("bar");

      storageService.remove("foo");

      expect(storageService.get("foo")).toBeNull();
    });
  });

  describe("storageService.clear()", () => {
    test("clears all data", () => {
      localStorage.setItem("foo", '"bar"');
      localStorage.setItem("baz", '"qux"');

      expect(storageService.get("foo")).toBe("bar");
      expect(storageService.get("baz")).toBe("qux");

      storageService.clear();

      expect(storageService.get("foo")).toBeNull();
      expect(storageService.get("baz")).toBeNull();
    });
  });
});
